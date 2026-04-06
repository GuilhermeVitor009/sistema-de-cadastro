const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/api/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});