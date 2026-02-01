/*
  script.js (Front-end)
  Objetivo:
  - pegar o código digitado
  - chamar a API (POST /api/validate)
  - mostrar resultado (válido) OU erro (não encontrado / formato inválido)
*/

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) Pegar elementos da tela (por id)
  // =========================
  const form = document.getElementById("validationForm");
  const inputCode = document.getElementById("certificateCode");
  const validateButton = document.getElementById("validateButton");

  const formSection = document.getElementById("formSection");
  const resultSection = document.getElementById("resultSection");
  const errorSection = document.getElementById("errorSection");

  const statusBadge = document.getElementById("statusBadge");

  const participantName = document.getElementById("participantName");
  const trainingTitle = document.getElementById("trainingTitle");
  const workload = document.getElementById("workload");
  const trainingDate = document.getElementById("trainingDate");
  const certificateStatus = document.getElementById("certificateStatus");
  const certificateCodeResult = document.getElementById("certificateCodeResult");

  const newValidationButton = document.getElementById("newValidationButton");
  const tryAgainButton = document.getElementById("tryAgainButton");
  const errorMessage = document.getElementById("errorMessage");

  // =========================
  // 2) Config da API
  // =========================
  const API_URL = "http://localhost:3000/api/validate";

  // Regex do formato esperado (mesmo padrão do backend)
  const regexCodigo = /^CERT-\d{8}-\d{6}-[A-Z0-9]{4}$/;

  // =========================
  // 3) Funções auxiliares (mostrar/esconder seções)
  // =========================
  function showForm() {
    formSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    errorSection.classList.add("hidden");
  }

  function showResult() {
    formSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    errorSection.classList.add("hidden");
  }

  function showError(message) {
    formSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    errorSection.classList.remove("hidden");

    // mensagem personalizada
    errorMessage.textContent = message;
  }

  // Limpa os campos do card de resultado
  function clearResultFields() {
    participantName.textContent = "-";
    trainingTitle.textContent = "-";
    workload.textContent = "-";
    trainingDate.textContent = "-";
    certificateStatus.textContent = "-";
    certificateCodeResult.textContent = "-";
  }

  // Formata data ISO yyyy-mm-dd para dd/mm/aaaa
  function formatDateBR(isoDate) {
    // Ex: "2025-04-01"
    if (!isoDate || typeof isoDate !== "string") return "-";
    const parts = isoDate.split("-");
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  // =========================
  // 4) Função principal: chamar a API
  // =========================
  async function validateCertificate(code) {
    // desabilita botão (evita duplo clique)
    validateButton.disabled = true;
    validateButton.textContent = "Validando...";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });

      const data = await response.json();

      // Se a API respondeu "valid: true"
      if (response.ok && data.valid === true) {
        const cert = data.certificate;

        // Preencher a UI (de acordo com os nomes que vieram do seu banco)
        participantName.textContent = cert.nome_participante || "-";
        trainingTitle.textContent = cert.titulo_treinamento || "-";
        workload.textContent = cert.carga_horaria || "-";
        trainingDate.textContent = formatDateBR(cert.data_capacitacao);
        certificateStatus.textContent = cert.status || "-";
        certificateCodeResult.textContent = cert.codigo_certificado || code;

        // Badge de status (válido)
        statusBadge.textContent = "CERTIFICADO VÁLIDO";
        statusBadge.className =
          "inline-block px-4 py-2 rounded-full font-semibold text-sm md:text-base mb-2 bg-green-100 text-green-800";

        showResult();
        return;
      }

      // Caso não seja ok, mostramos erro
      // Ex: 400 formato inválido, 404 não encontrado
      const msg = data?.message || "Não foi possível validar o certificado.";
      showError(msg);
    } catch (err) {
      console.error(err);
      showError("Erro de conexão com o servidor. Verifique se o back-end está rodando.");
    } finally {
      validateButton.disabled = false;
      validateButton.textContent = "Validar Certificado";
    }
  }

  // =========================
  // 5) Evento do formulário (submit)
  // =========================
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearResultFields();

    const code = String(inputCode.value || "").trim().toUpperCase();

    // validação rápida no front (antes de chamar API)
    if (!regexCodigo.test(code)) {
      showError("Formato de código inválido. Use: CERT-AAAAMMDD-HHMMSS-XXXX");
      return;
    }

    validateCertificate(code);
  });

  // =========================
  // 6) Botões: “Validar outro” e “Tentar novamente”
  // =========================
  newValidationButton.addEventListener("click", () => {
    inputCode.value = "";
    clearResultFields();
    showForm();
    inputCode.focus();
  });

  tryAgainButton.addEventListener("click", () => {
    inputCode.focus();
    showForm();
  });

  // Quando abrir a página, começa mostrando o formulário
  showForm();
});
