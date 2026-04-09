// Script para formulários de login e cadastro

// Função para mostrar mensagens
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Função para lidar com formulário de login
function handleLogin(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    if (!name || !password) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Simular envio (você pode substituir por fetch real)
    showMessage('Fazendo login...', 'info');

    // Aqui você pode adicionar o fetch para o servidor
    setTimeout(() => {
        showMessage('Login realizado com sucesso!', 'success');
    }, 1000);
}

// Função para lidar com formulário de cadastro
function handleCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;

    if (!nome || !senha || !cpf) {
        showMessage('Por favor, preencha os campos obrigatórios.', 'error');
        return;
    }

    // Validar CPF (simples)
    if (cpf.length != 11) {
        showMessage('CPF deve ter 11 dígitos.', 'error');
        return;
    }

    // Simular envio
    showMessage('Criando conta...', 'info');

    // Aqui você pode adicionar o fetch para o servidor
    fetch('/api/cadastro', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha, cpf })
    });
    setTimeout(() => {
        showMessage('Conta criada com sucesso!', 'success');
    }, 1500);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Verificar se estamos na página de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }
});

