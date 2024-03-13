    const timerElement = document.getElementById('timer');
    let seconds = localStorage.getItem('timerSeconds') || 0;

    function updateTimer() {
        seconds++;
        timerElement.textContent = seconds;
        localStorage.setItem('timerSeconds', seconds);
    }

    // Call updateTimer() repeatedly to increment the timer infinitely
    setInterval(updateTimer, 1000);

    // Initialize the timer display with the stored value
    timerElement.textContent = seconds;