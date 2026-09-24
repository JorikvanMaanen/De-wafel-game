//leaderboard
//krunker scroll
//slider om je kan te verhogen maar gains verlagen 

let score = 0;
let ColorTimeout;
let rewardRollActive = false;

function addScore() {
    score += 1;
    document.getElementById('score').textContent = score;
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
    changebackgroundcolor();
}

function changebackgroundcolor() {
    const counter = document.getElementById('counter');
    clearTimeout(ColorTimeout);

    if (score === 0) {
        counter.style.backgroundColor = "red";
        ColorTimeout = setTimeout(() => {
            counter.style.backgroundColor = "rgb(255 248 226 / 80%)";
        }, 500);
    } else {
        counter.style.backgroundColor = "rgb(255 248 226 / 80%)";
    }
}


function gamble(gambleAmount) {
    if (typeof gambleAmount === 'undefined') {
        gambleAmount = parseInt(document.getElementById('gambleAmount').value);
    }
    if (score >= gambleAmount) {
        score -= gambleAmount;
        const win = Math.random() < 0.5;
        if (win) {
            score += gambleAmount * 2;
        }
    }
    updateScoreDisplay();
}

function allIn() {
    if (rewardRollActive || score <= 0) {
        return;
    }

    rewardRollActive = true;
    const allInButton = document.getElementById('allIn');
    const rollWheel = document.getElementById('rollWheel');
    const rollStatus = document.getElementById('rollStatus');
    const amount = score;
    const win = Math.random() < 0.5;
    const targetColor = win ? 'GROEN' : 'ROOD';
    const targetAngle = win ? 90 : 270;
    const fullSpins = 5 + Math.floor(Math.random() * 3);

    document.getElementById('rewardRoll').classList.add('is-visible');
    allInButton.disabled = true;
    rollStatus.textContent = 'De Reward Roll draait...';
    rollWheel.classList.remove('is-spinning');
    void rollWheel.offsetWidth;
    rollWheel.style.transform = `rotate(${fullSpins * 360 + targetAngle}deg)`;
    rollWheel.classList.add('is-spinning');

    setTimeout(() => {
        score -= amount;
        if (win) {
            score += amount * 2;
        }

        updateScoreDisplay();
        rollStatus.textContent = `Je landde op ${targetColor}!`;
        rewardRollActive = false;
        allInButton.disabled = false;
    }, 2800);
}

function closeRewardRoll() {
    if (!rewardRollActive) {
        document.getElementById('rewardRoll').classList.remove('is-visible');
    }
}