let score = 100;

function addScore() {
    score += 1;
    document.getElementById('score').textContent = score;
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function gamble() {
    const gambleAmount = parseInt(document.getElementById('gambleAmount').value);
    if (score >= gambleAmount) {
        score -= gambleAmount;
        const win = Math.random() < 0.5;
        if (win) {
            score += gambleAmount * 2;
        }
    }
    updateScoreDisplay();
}