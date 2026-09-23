//all in knop
//leaderboard

let score = 0;

function addScore() {
    score += 1;
    document.getElementById('score').textContent = score;
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function addResult(message) {
    const resultText = document.getElementById('resultText');
    const resultContainer = resultText.parentElement;
    if (resultText.textContent) {
        resultText.append(document.createElement('br'));
        
    }
    resultText.append(document.createTextNode(message));
    resultContainer.scrollTo({
        top: resultContainer.scrollHeight,
        behavior: 'smooth'
    });
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
            addResult('gewonnen ' + score);
        } else {
            addResult('veloren ' + score);
        }
    }
    updateScoreDisplay();
}

function allIn() {
    gamble(score);
}