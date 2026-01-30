const db = require('../config/database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS certificados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo_certificado TEXT UNIQUE NOT NULL,
      nome TEXT,
      cpf TEXT,
      data_emissao TEXT
    )
  `, (err) => {
    if (err) console.error('❌ Erro ao criar tabela:', err.message);
    else console.log('✅ Tabela certificados pronta');
  });
});
