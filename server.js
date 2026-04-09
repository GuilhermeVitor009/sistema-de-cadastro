// Este é como um grande armário mágico chamado "express" que ajuda a criar sites na internet
// É como pedir emprestado ferramentas especiais de um amigo para construir sua casa de bonecas
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Aqui estamos criando nossa própria casinha na internet, chamada "app"
// É como montar sua tenda no quintal para brincar
const app = express();
const db = new sqlite3.Database('./database.db',
    (err) => {
        if (err){
            console.error(err.message);
        }
    }
);
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT UNIQUE,
    sexo TEXT,
    idade INTEGER,
    rua TEXT,
    numero TEXT,
    uf TEXT,
    cidade TEXT
)`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
// Esta é a porta da nossa casinha, como o número da sua casa na rua
// Porta 3000 é como dizer "venha brincar na minha casa número 3000"
const port = 3000;

// Esta linha em branco é como uma pausa para respirar antes de começar a brincar


// Esta é uma regra para quando alguém visita nossa casinha na porta principal (a página inicial)
// Quando alguém digita o endereço da nossa casa na internet, mostramos nossa página principal
// É como quando alguém toca a campainha e você abre a porta para receber visitas
app.get('/', (req, res) => {
    // Aqui dizemos "mande o arquivo index.html para quem está visitando"
    // É como dar um presente (o arquivo) para seu amigo que veio brincar
    res.sendFile(__dirname + '/index.html');
});

// Esta é outra regra, mas para quando alguém quer ir para a página de login
// É como ter uma porta secreta que leva para o quarto dos brinquedos
app.get('/api/login', (req, res) => {
    // Mandamos o arquivo de login para quem pediu
    // Como dar o brinquedo certo para cada amigo que pede
    
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/api/cadastro', (req, res) => {
    // Mandamos o arquivo de login para quem pediu
    // Como dar o brinquedo certo para cada amigo que pede  
    res.sendFile(__dirname + '/public/cadastro.html');
});

app.get('/api/usuarios', (req, res) => {
    // Mandamos o arquivo de login para quem pediu
    // Como dar o brinquedo certo para cada amigo que pede
    
    

    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        res.json(rows);
    });

});

app.post('/api/cadastro',(req, res)=>{
    const {nome, senha, cpf, sexo, idade, rua, numero, uf, cidade} = req.body;
    db.serialize(() => {
        

db.run('INSERT INTO usuarios (nome, senha, cpf, sexo, idade, rua, numero, uf, cidade) VALUES(?,?,?,?,?,?,?,?,?)',[nome, senha, cpf, sexo, idade, rua, numero, uf, cidade],function(err){
    if (err) {
        return console.log(err.message);
    }});

console.log("Tabela criada com sucesso!");
console.log(req.body);

})

});

// Esta linha em branco é outra pausa para respirar

// Agora dizemos para nossa casinha começar a funcionar e ficar esperando visitas
// É como abrir a porta da sua casa e gritar "estou em casa, podem vir brincar!"
app.listen(port, () => {
    // Quando a casinha estiver pronta, mostramos uma mensagem no computador
    // É como contar para seus pais que a brincadeira começou
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    body = JSON.stringify({name, password});
    console.log(body);
});