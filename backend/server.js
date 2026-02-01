const certificadosRoutes = require('./src/routes/certificadosRoutes');

//SERVIDOR PRINCIPAL - EXPRESS
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de certificados
app.use('/api', certificadosRoutes);


//Inicializar o banco
require('./src/config/database');

// Inicializar o model (cria a tabela se não existir)
require('./src/models/certificadoModel');


//Rota teste
app.get('/api/health', (req, res) => {
  res.json({status: 'Ok',
        message: 'API Funcionando',
        timestamp: new Date().toString()
  });
});

//Iniciar o servidor
app.listen(PORT, () => {
    console.log('========================================');
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/api/health`);
    console.log('========================================');
});

module.exports = app;