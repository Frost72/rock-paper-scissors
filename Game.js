
let playerScore = 0;
let computerScore = 0;

const resultDiv = document.getElementById('result');
const computerChoiceDiv = document.getElementById('computer-choice');

// Функция для применения стиля к иконкам бумаги (чтобы они были белыми)
function applyPaperStyle(imgElement) {
    // Проверяем, является ли иконка бумагой
    if (imgElement.alt === 'paper' || (imgElement.src && imgElement.src.includes('бумага'))) {
        imgElement.style.filter = 'brightness(0) invert(1)';
    }
}


function createChoiceIcon(choice) {
    const img = document.createElement('img');
    img.style.width = '64px';
    img.style.height = '64px';
    img.style.animation = 'fadeIn 0.3s ease';
    
    const images = {
        rock: 'image/icons8-камень-64.png',
        scissors: 'image/icons8-ножницы-64.png',
        paper: 'image/icons8-бумага-100.png'
    };
    
    img.src = images[choice];
    img.alt = choice;
    
    // Применяем белый фильтр для бумаги
    if (choice === 'paper') {
        img.style.filter = 'brightness(0) invert(1)';
    }
    
    return img;
}

// Функция для обновления счета на странице
function updateScoreDisplay() {
    let scoreDisplay = document.querySelector('.score-display');
    if (!scoreDisplay) {
        scoreDisplay = document.createElement('div');
        scoreDisplay.className = 'score-display';
        const resultText = document.querySelector('.result-text');
        if (resultText) {
            resultDiv.insertBefore(scoreDisplay, resultText);
        } else {
            resultDiv.insertBefore(scoreDisplay, resultDiv.firstChild);
        }
    }
    scoreDisplay.innerHTML = `<span style="font-size: 24px; margin-right: 20px;">Счет: ${playerScore} : ${computerScore}</span>`;
}

// Функция для отображения выбора компьютера
function displayComputerChoice(choice) {
    computerChoiceDiv.innerHTML = '';
    const img = createChoiceIcon(choice);
    computerChoiceDiv.appendChild(img);
}

// Функция определения победителя
function determineWinner(player, computer) {
    if (player === computer) {
        return ' Ничья!';
    }
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        playerScore++;
        return 'Вы победили! +1 очко';
    }
    
    computerScore++;
    return 'Компьютер победил! +1 очко';
}

// Функция анимации результата
function animateResult(resultText) {
    const resultTextElement = document.querySelector('.result-text');
    if (resultTextElement) {
        resultTextElement.textContent = resultText;
        resultTextElement.style.animation = 'none';
        setTimeout(() => {
            resultTextElement.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
}

// Главная функция игры
function play(playerChoice) {
    // Компьютер выбирает случайный вариант
    const computerChoices = ['rock', 'scissors', 'paper'];
    const computerChoice = computerChoices[Math.floor(Math.random() * 3)];
    
    // Отображаем выбор компьютера
    displayComputerChoice(computerChoice);
    
    // Определяем победителя и обновляем счет
    const result = determineWinner(playerChoice, computerChoice);
    
    // Обновляем отображение счета
    updateScoreDisplay();
    
    // Показываем результат
    animateResult(result);
    
    // Добавляем визуальный эффект для выбранной кнопки
    const buttons = document.querySelectorAll('.player .choice');
    buttons.forEach(btn => {
        btn.style.transform = 'scale(1)';
        btn.style.opacity = '0.7';
    });
    
    // Подсвечиваем выбранную кнопку
    const clickedButton = Array.from(buttons).find(btn => 
        btn.getAttribute('onclick').includes(playerChoice)
    );
    if (clickedButton) {
        clickedButton.style.transform = 'scale(1.05)';
        clickedButton.style.opacity = '1';
        clickedButton.style.boxShadow = '0 0 20px rgba(63, 54, 190, 0.8)';
        
        // Возвращаем нормальный вид через 0.3 секунды
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.style.transform = 'scale(1)';
                btn.style.opacity = '1';
                btn.style.boxShadow = '';
            });
        }, 300);
    }
}

// Функция сброса игры
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    
    // Очищаем выбор компьютера
    computerChoiceDiv.innerHTML = '';
    
    // Сбрасываем текст результата
    const resultTextElement = document.querySelector('.result-text');
    if (resultTextElement) {
        resultTextElement.textContent = 'Сделайте ход!';
    }
    
    // Убираем подсветку с кнопок
    const buttons = document.querySelectorAll('.player .choice');
    buttons.forEach(btn => {
        btn.style.transform = 'scale(1)';
        btn.style.opacity = '1';
        btn.style.boxShadow = '';
    });
}

// Создаем структуру результата при загрузке страницы
function initGame() {
    // Очищаем result div и создаем правильную структуру
    resultDiv.innerHTML = '';
    
    // Создаем отображение счета
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.style.marginBottom = '15px';
    resultDiv.appendChild(scoreDisplay);
    
    // Создаем текст результата
    const resultText = document.createElement('div');
    resultText.className = 'result-text';
    resultText.style.fontSize = '28px';
    resultText.style.marginBottom = '20px';
    resultText.style.fontWeight = 'bold';
    resultText.textContent = 'Сделайте ход!';
    resultDiv.appendChild(resultText);
    
    // Создаем кнопку сброса
    const resetButton = document.createElement('button');
    resetButton.className = 'play-again';
    resetButton.textContent = ' Сбросить игру';
    resetButton.onclick = resetGame;
    
    resultDiv.appendChild(resetButton);
    
    // Инициализируем счет
    updateScoreDisplay();
}

// Запускаем инициализацию при загрузке страницы
window.onload = initGame;