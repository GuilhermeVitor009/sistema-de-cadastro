Aqui vai um guia em formato de README, direto ao ponto, para você evoluir do HTML + SQLite para um site funcional com Node.js (login, cadastro e página de usuário).

---

# 📘 Projeto Full Stack com Node.js + SQLite

**Sistema simples de compra de curso de robótica presencial**

## 🚀 Visão Geral

Este projeto consiste em:

* Cadastro de usuários
* Login de usuários
* Armazenamento de dados no SQLite
* Página do usuário autenticado
* Simulação de compra de curso

---

## 🧱 Estrutura do Projeto

```
/projeto
│── /public
│   ├── login.html
│   ├── cadastro.html
│   └── dashboard.html
│
│── /db
│   └── database.js
│
│── /routes
│   └── auth.js
│
│── server.js
│── package.json
```

---

## 📦 Instalação

```bash
npm init -y
npm install express sqlite3 body-parser bcrypt express-session
```

---

## 🗄️ Banco de Dados (SQLite)

Crie o arquivo `/db/database.js`:

```js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT
    )
  `);
});

module.exports = db;
```

---

## ⚙️ Servidor Principal

Crie `server.js`:

```js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'segredo',
  resave: false,
  saveUninitialized: true
}));

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
```

---

## 🔐 Rotas de Autenticação

Crie `/routes/auth.js`:

```js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/database');

const router = express.Router();

// Cadastro
router.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  const hash = await bcrypt.hash(senha, 10);

  db.run(
    `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, hash],
    function(err) {
      if (err) {
        return res.send('Erro ao cadastrar usuário');
      }
      res.redirect('/login.html');
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get(
    `SELECT * FROM usuarios WHERE email = ?`,
    [email],
    async (err, user) => {
      if (!user) return res.send('Usuário não encontrado');

      const valid = await bcrypt.compare(senha, user.senha);

      if (!valid) return res.send('Senha incorreta');

      req.session.user = user;
      res.redirect('/dashboard');
    }
  );
});

// Dashboard protegido
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login.html');
  }

  res.send(`
    <h1>Bem-vindo, ${req.session.user.nome}</h1>
    <p>Email: ${req.session.user.email}</p>
    <form action="/comprar" method="POST">
      <button type="submit">Comprar curso de robótica</button>
    </form>
    <a href="/logout">Sair</a>
  `);
});

// Simular compra
router.post('/comprar', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login.html');
  }

  res.send('Curso de robótica comprado com sucesso!');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});

module.exports = router;
```

---

## 🧾 HTML (Formulários)

### 📄 login.html

```html
<form action="/login" method="POST">
  <input type="email" name="email" placeholder="Email" required>
  <input type="password" name="senha" placeholder="Senha" required>
  <button type="submit">Entrar</button>
</form>
```

---

### 📄 cadastro.html

```html
<form action="/cadastro" method="POST">
  <input type="text" name="nome" placeholder="Nome" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="password" name="senha" placeholder="Senha" required>
  <button type="submit">Cadastrar</button>
</form>
```

---

## 🔄 Fluxo Completo

1. Usuário acessa `cadastro.html`
2. Dados são enviados via POST → `/cadastro`
3. Senha é criptografada com bcrypt
4. Dados são salvos no SQLite

---

5. Usuário faz login em `login.html`
6. Backend busca usuário no banco
7. Compara senha
8. Cria sessão (`express-session`)

---

9. Usuário acessa `/dashboard`
10. Sistema verifica se está logado
11. Exibe dados do usuário

---

12. Usuário pode:

* Comprar curso
* Fazer logout

---

## 🧠 Próximos Passos (Melhorias)

* Criar tabela `cursos`
* Criar tabela `compras`
* Relacionar usuário com cursos comprados
* Usar template engine (EJS, Handlebars)
* Criar API REST
* Usar JWT em vez de sessão
* Adicionar validação com Joi ou Zod
* Deploy (Render, Vercel, Railway)

---

## 🧩 Conceitos Importantes

* **CRUD**: Create, Read, Update, Delete
* **Hash de senha**: nunca salvar senha em texto puro
* **Sessão**: mantém usuário logado
* **Middleware**: funções executadas antes das rotas
* **Banco relacional**: estrutura com tabelas

---

## ✅ Resultado Final

Você terá:

* Cadastro funcional ✔️
* Login funcional ✔️
* Banco salvando dados ✔️
* Página protegida ✔️
* Simulação de compra ✔️

---

Se quiser, posso te ajudar no próximo passo:
👉 transformar isso em API REST ou
👉 criar um frontend moderno com React conectado nesse backend.
