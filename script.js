const playWordButton = document.getElementById('play-word');
const checkWordButton = document.getElementById('check-word');
const userInput = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const incompleteWordElement = document.getElementById('incomplete-word');
const feedbackImage = document.getElementById('feedback-image'); 

const acertoSom = document.getElementById('acerto-som');
const erroSom = document.getElementById('erro-som');

// Lista de palavras
const words = [
    { word: 'Casa', missingSyllable: 'Ca', incomplete: '__sa' },
    { word: 'Cachorro', missingSyllable: 'rro', incomplete: 'Caho__' },
    { word: 'Caderno', missingSyllable: 'Ca', incomplete: '__derno' },
    { word: 'Caminho', missingSyllable: 'Ca', incomplete: '__minho' },
    { word: 'Gato', missingSyllable: 'Ga', incomplete: '__to' },
    { word: 'Guerra', missingSyllable: 'Gue', incomplete: '__rra' },
    { word: 'Guitarra', missingSyllable: 'Gui', incomplete: '__tarra' },
    { word: 'Gelo', missingSyllable: 'Ge', incomplete: '__lo' },
    { word: 'Bola', missingSyllable: 'Bo', incomplete: '__la' },
    { word: 'Boca', missingSyllable: 'ca', incomplete: 'Bo__' },
    { word: 'Bolo', missingSyllable: 'Bo', incomplete: '__lo' },
    { word: 'Bússola', missingSyllable: 'Bú', incomplete: '__ssola' },
    { word: 'Escola', missingSyllable: 'Es', incomplete: '__cola' },
    { word: 'Esporte', missingSyllable: 'Es', incomplete: '__porte' },
    { word: 'Estudo', missingSyllable: 'Es', incomplete: '__tudo' },
    { word: 'Livro', missingSyllable: 'Li', incomplete: '__vro' },
    { word: 'Limão', missingSyllable: 'Li', incomplete: '__mão' },
    { word: 'Lima', missingSyllable: 'Li', incomplete: '__ma' },
    { word: 'Lição', missingSyllable: 'Li', incomplete: '__ção' },
    { word: 'Avião', missingSyllable: 'Avi', incomplete: '__ão' },
    { word: 'Amigo', missingSyllable: 'Ami', incomplete: '__go' },
    { word: 'Amor', missingSyllable: 'Amo', incomplete: '__r' },
    { word: 'Amanhã', missingSyllable: 'Ama', incomplete: '__nhã' },
    { word: 'Sorriso', missingSyllable: 'So', incomplete: '__riso' },
    { word: 'Sombra', missingSyllable: 'Som', incomplete: '__bra' },
    { word: 'Sorrateiro', missingSyllable: 'So', incomplete: '__rateiro' },
    { word: 'Pato', missingSyllable: 'Pa', incomplete: '__to' },
    { word: 'Papel', missingSyllable: 'Pa', incomplete: '__pel' },
    { word: 'Foca', missingSyllable: 'Fo', incomplete: '__ca' },
    { word: 'Fogo', missingSyllable: 'Fo', incomplete: '__go' },
    { word: 'Mestre', missingSyllable: 'Mes', incomplete: '__tre' },
    { word: 'Melancia', missingSyllable: 'Me', incomplete: '__lancia' },
    { word: 'Médico', missingSyllable: 'Me', incomplete: '__dico' },
    { word: 'Computador', missingSyllable: 'Com', incomplete: '__putador' },
    { word: 'Comida', missingSyllable: 'Com', incomplete: '__ida' },
    { word: 'Coração', missingSyllable: 'Co', incomplete: '__ração' },
    { word: 'Comum', missingSyllable: 'Co', incomplete: '__mum' },
    { word: 'Coroa', missingSyllable: 'Co', incomplete: '__roa' },
    { word: 'Janete', missingSyllable: 'Ja', incomplete: '__nete' },
    { word: 'Marcelo', missingSyllable: 'Mar', incomplete: '__celo' },
    { word: 'Carola', missingSyllable: 'Ca', incomplete: '__rola' },
    { word: 'Henrique', missingSyllable: 'Hen', incomplete: '__rique' },
    { word: 'Castelo', missingSyllable: 'Cas', incomplete: '__telo' },
    { word: 'Amarelinha', missingSyllable: 'Ama', incomplete: '__relinha' },
    { word: 'Patinete', missingSyllable: 'Pa', incomplete: '__tinete' },
    { word: 'Bicicleta', missingSyllable: 'cle', incomplete: 'Bici__ta' },
    { word: 'Renato', missingSyllable: 'Re', incomplete: '__nato' },
    { word: 'Boneca', missingSyllable: 'Bo', incomplete: '__neca' },
    { word: 'Urso', missingSyllable: 'Ur', incomplete: '__so' },
    { word: 'Robô', missingSyllable: 'Ro', incomplete: '__bô' },
    { word: 'Bolacha', missingSyllable: 'la', incomplete: 'Bo__cha' },
    { word: 'Rocha', missingSyllable: 'Ro', incomplete: '__cha' }

];

// Randon
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

let currentWordIndex = 0;

// Carregar uma palavra aleatória
function loadWord() {
    const currentWord = words[currentWordIndex];
    incompleteWordElement.textContent = currentWord.incomplete;
    feedbackImage.src = '';
}


// Ver se está certo
function checkAnswer() {
    const userAnswer = userInput.value.trim();
    const currentWord = words[currentWordIndex];

    if (userAnswer.toLowerCase() === currentWord.missingSyllable.toLowerCase()) {
        feedback.textContent = 'Parabéns! Você acertou!';
        feedback.style.color = 'green';
        acertoSom.play();

        const randomIndex = Math.floor(Math.random() * 4) + 1;
        feedbackImage.src = `assets/happy-pikachu${randomIndex}.gif`; 

        setTimeout(() => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            loadWord();
            feedback.textContent = '';
        }, 4000);
    } else {
        feedback.textContent = 'Tente novamente!';
        feedback.style.color = 'red';
        erroSom.play();

        const randomIndex = Math.floor(Math.random() * 3) + 1;
        feedbackImage.src = `assets/sad-pikachu${randomIndex}.gif`;
    }

    userInput.value = '';
}

// Falar a palavra
function speakWord(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
}

// Evento de falar a palavra
playWordButton.addEventListener('click', () => {
    const currentWord = words[currentWordIndex];
    speakWord(currentWord.word);
});

// Evento de verificar a resposta
checkWordButton.addEventListener('click', checkAnswer);

// Randomizar a lista de palavras
shuffleArray(words);

// Carregar a palavra
loadWord();
