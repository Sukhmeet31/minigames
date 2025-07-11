document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quote');
    const quoteInput = document.getElementById('quote-input');
    const timerElement = document.querySelector('.timer span');
    const scoreElement = document.querySelector('.score span');
    const resetBtn = document.querySelector('.reset-btn');
    
    let timer;
    let timeLeft = 60;
    let score = 0;
    let isPlaying = false;
    
    const quotes = [
        "The quick brown fox jumps over the lazy dog.",
        "Programming is the art of telling another human what one wants the computer to do.",
        "The only way to learn a new programming language is by writing programs in it.",
        "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
        "Debugging is twice as hard as writing the code in the first place.",
        "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
        "The best error message is the one that never shows up.",
        "First, solve the problem. Then, write the code.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "The most disastrous thing that you can ever learn is your first programming language."
    ];
    
    function startGame() {
        isPlaying = true;
        timeLeft = 60;
        score = 0;
        scoreElement.textContent = score;
        timerElement.textContent = timeLeft;
        
        // Start timer
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
        
        // Load a random quote
        loadQuote();
        
        // Focus on input
        quoteInput.value = '';
        quoteInput.disabled = false;
        quoteInput.focus();
    }
    
    function loadQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        
        // Display quote with spans for each character
        quoteDisplay.innerHTML = '';
        quote.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            quoteDisplay.appendChild(charSpan);
        });
    }
    
    function endGame() {
        clearInterval(timer);
        isPlaying = false;
        quoteInput.disabled = true;
        alert(`Game Over! Your score: ${score} characters per minute`);
    }
    
    function checkInput() {
        if (!isPlaying) return;
        
        const quoteSpans = quoteDisplay.querySelectorAll('span');
        const inputValue = quoteInput.value;
        let correctChars = 0;
        
        quoteSpans.forEach((span, index) => {
            const inputChar = inputValue[index];
            
            // Reset classes
            span.className = '';
            
            if (inputChar == null) {
                // Not typed yet
                if (index === inputValue.length) {
                    span.classList.add('current');
                }
            } else if (inputChar === span.textContent) {
                // Correct character
                span.classList.add('correct');
                correctChars++;
            } else {
                // Incorrect character
                span.classList.add('incorrect');
            }
        });
        
        // Update score (characters per minute)
        const timeElapsed = 60 - timeLeft;
        if (timeElapsed > 0) {
            score = Math.floor((correctChars / timeElapsed) * 60);
            scoreElement.textContent = score;
        }
    }
    
    resetBtn.addEventListener('click', startGame);
    quoteInput.addEventListener('input', checkInput);
    
    // Initialize
    loadQuote();
});