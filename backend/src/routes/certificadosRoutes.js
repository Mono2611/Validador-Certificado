const express = require('express');
const router = express.Router();

// Importa a função do model
const { buscarPorCodigo } = require('../models/certificadoModel');

// Expressão regular para validar o formato do código
// Formato esperado: CERT-AAAAMMDD-HHMMSS-XXXX
const regexCodigo = /^CERT-\d{8}-\d{6}-[A-Z0-9]{4}$/;

/*
  Rota de validação de certificado
  Endpoint: POST /api/validate
  Body esperado: { "code": "CERT-..." }
*/
router.post('/validate', (req, res) => {

  // Normaliza o código (remove espaços e força maiúsculo)
  const code = String(req.body.code || '')
    .trim()
    .toUpperCase();

  // Verifica se o formato do código é válido
  if (!regexCodigo.test(code)) {
    return res.status(400).json({
      valid: false,
      message: 'Formato de código inválido.'
    });
  }

  // Busca o certificado no banco
  buscarPorCodigo(code, (err, certificado) => {

    // Erro interno no banco
    if (err) {
      console.error(err);
      return res.status(500).json({
        valid: false,
        message: 'Erro interno no servidor.'
      });
    }

    // Código não encontrado
    if (!certificado) {
      return res.status(404).json({
        valid: false,
        message: 'Certificado não encontrado.'
      });
    }

    // Código encontrado com sucesso
    return res.json({
      valid: true,
      certificate: certificado
    });
  });
});

module.exports = router;
