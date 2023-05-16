const gameNumber = document.querySelector('.js-number');
const btnGame = document.querySelector('.js-button');
const clue = document.querySelector('.js-clue');
const counter = document.querySelector('.js-counter');
const btnReset = document.querySelector('.js-btn-reset');

let contador = 0;

function getRandomNumber(max) {
    return Math.ceil(Math.random() * max);
};

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function throwConfetti() {
    const duration = 15 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

const randomNumber = getRandomNumber(100)

function randomGame(event) {
    event.preventDefault()
    const numberChoice = parseInt(gameNumber.value);


    if (numberChoice > 100 || numberChoice < 1 || isNaN(numberChoice)) {
        printScreen("El valor introducido debe ser un número y debe estar entre 1 y 100");
    } else if (numberChoice > randomNumber) {
        printScreen("Demasiado alto");
    } else if (numberChoice < randomNumber) {
        printScreen("Demasiado bajo");
    } else if (numberChoice === randomNumber) {
        printScreen("¡Has ganado!");
        throwConfetti();
    }

    function printScreen(message) {
        clue.innerHTML = message;
    }

    function actualizarContador() {
        contador++;
        counter.innerHTML = `Número de intentos: ${contador}`;
    }
    actualizarContador()
};

function playAgain() {
    window.location.reload();
}

btnGame.addEventListener('click', randomGame);
btnReset.addEventListener('click', playAgain);
