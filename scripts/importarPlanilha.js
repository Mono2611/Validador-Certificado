/*
  Script: importarPlanilha.js
  Objetivo: Ler a planilha Excel e salvar os dados no banco SQLite
*/

const path = require("path");
const XLSX = require("xlsx");

function parseExcelDate(value) {
  // 1) Se já for Date
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  // 2) Se Excel vier como número (serial date)
  if (typeof value === "number") {
    const d = XLSX.SSF.parse_date_code(value);
    if (d) {
      // monta yyyy-mm-dd
      const yyyy = String(d.y).padStart(4, "0");
      const mm = String(d.m).padStart(2, "0");
      const dd = String(d.d).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
  }

  // 3) Se vier como string (ex: "01/04/2025" ou "2025-04-01")
  if (typeof value === "string") {
    const s = value.trim();
    if (!s) return "";

    // dd/mm/aaaa
    const br = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (br) return `${br[3]}-${br[2]}-${br[1]}`;

    // yyyy-mm-dd
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return s;
  }

  return "";
}


// usa a MESMA conexão do backend
const db = require("../backend/src/config/database");

// caminho fixo da planilha dentro do projeto
const caminhoPlanilha = path.resolve(
  __dirname,
  "../data/planilha.xlsx"
);

console.log("📄 Lendo planilha em:", caminhoPlanilha);

// lê o arquivo Excel
const workbook = XLSX.readFile(caminhoPlanilha);
const nomeDaAba = workbook.SheetNames[0];
const sheet = workbook.Sheets[nomeDaAba];

// transforma cada linha da planilha em um objeto JS
const linhas = XLSX.utils.sheet_to_json(sheet, { defval: "" });

console.log("📊 Linhas encontradas na planilha:", linhas.length);

// prepara o INSERT no banco
const inserir = db.prepare(`
  INSERT INTO certificados (
    codigo_certificado,
    nome_participante,
    titulo_treinamento,
    carga_horaria,
    data_capacitacao,
    status
  )
  VALUES (?, ?, ?, ?, ?, 'ativo')
  ON CONFLICT(codigo_certificado) DO UPDATE SET
    nome_participante=excluded.nome_participante,
    titulo_treinamento=excluded.titulo_treinamento,
    carga_horaria=excluded.carga_horaria,
    data_capacitacao=excluded.data_capacitacao,
    status=excluded.status
`);

let inseridos = 0;
let ignorados = 0;

// insere linha por linha
db.serialize(() => {
  linhas.forEach((linha) => {

    const codigo = String(linha["Codigo de Validação do Certificado"] || "")
      .trim()
      .toUpperCase();

    if (!codigo) {
      ignorados++;
      return;
    }

    const nome = String(linha["Nome completo do participante"] || "").trim();
    const titulo = String(linha["Título da Capacitação / Treinamento"] || "").trim();
    const carga = String(linha["Carga Horária"] || "").trim();

    const data = parseExcelDate(linha["Data da Capacitação"]);


    inserir.run([codigo, nome, titulo, carga, data], (err) => {
      if (err) {
        console.log("⚠️ Erro ao inserir:", err.message);
      } else {
        inseridos++;
      }
    });
  });

  inserir.finalize(() => {
    console.log("\n✅ Importação finalizada!");
    console.log("Inseridos:", inseridos);
    console.log("Ignorados (sem código):", ignorados);
    db.close();
  });
});
