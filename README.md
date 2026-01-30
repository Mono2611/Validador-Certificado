# Sistema de Validação de Certificados Digitais

Sistema completo para validação de certificados digitais da Fundação Hospital Centenario.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos customizados
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript (Vanilla)** - Lógica de interface

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite** - Banco de dados
- **CORS** - Middleware de segurança

## 📁 Estrutura do Projeto

```
ValidationPage/
├── frontend/                 # Aplicação Frontend
│   ├── public/              # Arquivos públicos
│   │   └── index.html       # Página principal
│   ├── src/
│   │   ├── css/            # Estilos
│   │   │   └── styles.css
│   │   └── js/             # Scripts
│   │       └── script.js
│   └── assets/             # Recursos (imagens, ícones)
│
├── backend/                 # Aplicação Backend
│   ├── src/
│   │   ├── controllers/    # Controladores
│   │   ├── routes/         # Rotas da API
│   │   ├── models/         # Modelos de dados
│   │   └── config/         # Configurações
│   ├── database/           # Banco de dados SQLite
│   └── server.js           # Servidor principal
│
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências do projeto
└── README.md               # Documentação
```

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passo 1: Clonar o repositório
```bash
git clone https://github.com/seu-usuario/ValidationPage.git
cd ValidationPage
```

### Passo 2: Instalar dependências
```bash
npm install
```

### Passo 3: Configurar Tailwind CSS
```bash
npm run build:css
```

### Passo 4: Iniciar o servidor
```bash
npm run dev
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm start` - Inicia o servidor em modo produção
- `npm run build:css` - Compila o Tailwind CSS

## 📝 Formato do Código de Certificado

```
CERT-AAAAMMDD-HHMMSS-XXXX
```

- **CERT**: Prefixo fixo
- **AAAAMMDD**: Data (Ano, Mês, Dia)
- **HHMMSS**: Hora (Hora, Minuto, Segundo)
- **XXXX**: Identificador único (4 caracteres alfanuméricos)

Exemplo: `CERT-20251223-120000-A1B2`

## 🎨 Paleta de Cores

As cores serão definidas de acordo com o status do certificado:
- 🟢 **Verde** - Certificado válido
- 🔴 **Vermelho** - Certificado cancelado ou não encontrado
- 🟡 **Amarelo** - Certificado expirado

## 🔒 Segurança

- Uso exclusivo de `textContent` (nunca `innerHTML`) para prevenir XSS
- Validação de formato no frontend e backend
- Sanitização de dados
- CORS configurado adequadamente
- HTTPS obrigatório em produção

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 📱 Smartphones
- 💻 Tablets
- 🖥️ Desktops

## 🤝 Contribuindo

Este é um projeto da Fundação Hospital Centenario.

## 📄 Licença

MIT License - Fundação Hospital Centenario

## 👥 Autores

Desenvolvido para a Fundação Hospital Centenario

---

**Status do Projeto**: Em desenvolvimento 🚧
