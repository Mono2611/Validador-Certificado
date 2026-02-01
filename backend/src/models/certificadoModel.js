// Importa a conexão com o banco SQLite
const db = require('../config/database');

/*
  Este arquivo é responsável por:
  1) Criar a tabela de certificados (se não existir)
  2) Disponibilizar funções para consultar o banco
*/

// Criação da tabela de certificados
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS certificados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo_certificado TEXT UNIQUE NOT NULL,
      nome_participante TEXT NOT NULL,
      titulo_treinamento TEXT NOT NULL,
      carga_horaria TEXT,
      data_capacitacao TEXT,
      status TEXT DEFAULT 'ativo'
    )
  `, (err) => {
    if (err) {
      console.error('❌ Erro ao criar tabela certificados:', err.message);
    } else {
      console.log('✅ Tabela certificados pronta');
    }
  });
});

/*
  Função para buscar um certificado pelo código
  - codigo: string (ex: CERT-20250906-214447-6DGV)
*/
function buscarPorCodigo(codigo, callback) {
  db.get(
    'SELECT * FROM certificados WHERE codigo_certificado = ?',
    [codigo],
    (err, row) => {
      callback(err, row);
    }
  );
}

// Exporta as funções que outros arquivos vão usar
module.exports = {
  buscarPorCodigo
};
