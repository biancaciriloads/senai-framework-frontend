// Variáveis de Estado do Jogo
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Elementos do DOM
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attemptsText = document.getElementById('attemptsText');
const restartButton = document.getElementById('restartButton');

// Função para processar o palpite
function handleGuess() {
    const userGuess = Number(guessInput.value);

    // Validação básica
    if (!userGuess || userGuess < 1 || userGuess > 100) {
        message.style.color = 'var(--error-color)';
        message.textContent = 'Por favor, digite um número entre 1 e 100!';
        return;
    }

    attempts++;
    attemptsText.textContent = `Tentativas: ${attempts}`;

    // Lógica do jogo
    if (userGuess === secretNumber) {
        message.style.color = 'var(--success-color)';
        message.textContent = `Parabéns! Você acertou o número ${secretNumber} em ${attempts} tentativas!`;
        endGame();
    } else if (userGuess < secretNumber) {
        message.style.color = 'var(--accent-color)';
        message.textContent = 'O número secreto é MAIOR 📈';
    } else {
        message.style.color = 'var(--accent-color)';
        message.textContent = 'O número secreto é MENOR 📉';
    }

    guessInput.value = '';
    guessInput.focus();
}

// Fim de jogo
function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
    restartButton.style.display = 'block';
}

// Reiniciar o jogo
function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsText.textContent = 'Tentativas: 0';
    message.textContent = '';

    guessInput.disabled = false;
    guessButton.disabled = false;
    restartButton.style.display = 'none';

    guessInput.value = '';
    guessInput.focus();
}

// Event Listeners
guessButton.addEventListener('click', handleGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

restartButton.addEventListener('click', resetGame);
