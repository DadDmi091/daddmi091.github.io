const tg = window.Telegram.WebApp;
const tapButton = document.getElementById('tapButton');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let timerId = null;

// Инициализация Telegram Web App
tg.expand();
tg.MainButton.setText('Закрыть игру').onClick(tg.close);

// Старт игры
function startGame() {
    timerId = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

// Обработчик клика
tapButton.addEventListener('click', () => {
    score++;
    scoreElement.textContent = score;
    
    // Анимация кнопки
    tapButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        tapButton.style.transform = 'scale(1)';
    }, 100);
});

// Завершение игры
function endGame() {
    tapButton.disabled = true;
    tg.showAlert(`Игра окончена! Ваш счет: ${score}`);
    
    // Отправка данных в бота (пример)
    tg.sendData(JSON.stringify({
        score: score,
        time: new Date().toISOString()
    }));
}

// Инициализация
tg.ready();
startGame();