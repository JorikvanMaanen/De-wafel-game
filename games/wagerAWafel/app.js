//leaderboard
//slider om je kans te verhogen maar gains verlagen 

let score = 0;
let ColorTimeout;
let rewardRollActive = false;
let rewardRollCloseTimeout;
const clickTimes = [];
const clickWindowMs = 1000;
const maxClicksPerWindow = 12;
let autoClickDetected = false;

function addScore(clickEvent) {
    if (autoClickDetected) {
        return;
    }

    if (clickEvent && !clickEvent.isTrusted) {
        autoClickDetected = true;
        lockWafel();
        return;
    }

    const now = performance.now();
    clickTimes.push(now);
    while (clickTimes[0] <= now - clickWindowMs) {
        clickTimes.shift();
    }

    if (clickTimes.length > maxClicksPerWindow) {
        autoClickDetected = true;
        lockWafel();
        return;
    }

    score += 1;
    document.getElementById('score').textContent = score;
}

function lockWafel() {
    document.querySelector('.wafel').classList.add('is-locked');
    document.getElementById('antiCheatStatus').textContent = 'Auto-clicking detected. Wafel clicking disabled.';
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
    if (rewardRollActive || !Number.isInteger(gambleAmount) || gambleAmount < 1 || score < gambleAmount) {
        return;
    }

    startRewardRoll(gambleAmount, document.getElementById('confirm'));
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function startRewardRoll(amount, sourceButton) {
    rewardRollActive = true;

    const allInButton = document.getElementById('allIn');
    const confirmButton = document.getElementById('confirm');
    const rollWheel = document.getElementById('rollWheel');
    const rollStatus = document.getElementById('rollStatus');
    const win = Math.random() < 0.5;
    const targetColor = win ? 'WON' : 'LOST';
    const targetAngle = win ? getRandom(1, 179) : getRandom(181, 359);
    const fullSpins = Math.round(getRandom(8, 20));

    clearTimeout(rewardRollCloseTimeout);
    document.getElementById('rewardRoll').classList.add('is-visible');
    sourceButton.disabled = true;
    allInButton.disabled = true;
    confirmButton.disabled = true;
    rollStatus.textContent = '...';
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
        rollStatus.textContent = `You ${targetColor}!`;
        rewardRollActive = false;
        allInButton.disabled = false;
        confirmButton.disabled = false;
        rewardRollCloseTimeout = setTimeout(closeRewardRoll, 2000);
    }, 2800);
}

function allIn() {
    if (rewardRollActive || score <= 0) {
        return;
    }

    startRewardRoll(score, document.getElementById('allIn'));
}

function closeRewardRoll() {
    if (!rewardRollActive) {
        document.getElementById('rewardRoll').classList.remove('is-visible');
    }
}