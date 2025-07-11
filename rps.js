document.addEventListener('DOMContentLoaded', () => {
    const playerScoreEl = document.querySelector('.player-score');
    const computerScoreEl = document.querySelector('.computer-score');
    const resultEl = document.querySelector('.result');
    const choices = document.querySelectorAll('.choice');
    const resetBtn = document.querySelector('.reset-btn');
    
    let playerScore = 0;
    let computerScore = 0;
    
    function computerPlay() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function playRound(playerSelection, computerSelection) {
        if (playerSelection === computerSelection) {
            return "It's a tie!";
        }
        
        if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'paper' && computerSelection === 'rock') ||
            (playerSelection === 'scissors' && computerSelection === 'paper')
        ) {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            return `You Win! ${playerSelection} beats ${computerSelection}`;
        } else {
            computerScore++;
            computerScoreEl.textContent = computerScore;
            return `You Lose! ${computerSelection} beats ${playerSelection}`;
        }
    }
    
    function handleChoice(e) {
        const playerSelection = e.target.id;
        const computerSelection = computerPlay();
        const result = playRound(playerSelection, computerSelection);
        resultEl.textContent = result;
    }
    
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreEl.textContent = '0';
        computerScoreEl.textContent = '0';
        resultEl.textContent = 'Make your choice!';
    }
    
    choices.forEach(choice => {
        choice.addEventListener('click', handleChoice);
    });
    
    resetBtn.addEventListener('click', resetGame);
});