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

    document.getElementById("toggleButton").addEventListener("click", function() {
        var imageText = this.nextElementSibling;
        imageText.classList.toggle("hidden");
    });

    function smoothScroll(targetId) {
        const target = document.getElementById(targetId);
        const offsetTop = target.offsetTop;
        const scrollDuration = 1000; // Duración del desplazamiento en milisegundos
        let startTime = null;
        const startPosition = window.pageYOffset;
    
        function animation(currentTime) {
            if (startTime === null) {
                startTime = currentTime;
            }
            const timeElapsed = currentTime - startTime;
            const scrollProgress = Math.min(timeElapsed / scrollDuration, 1); // Garantiza que el progreso no exceda 1
            const easeInOutQuad = t => t<.5 ? 2*t*t : -1+(4-2*t)*t; // Función de interpolación easing
    
            window.scrollTo(0, startPosition + (offsetTop * easeInOutQuad(scrollProgress)));
    
            if (timeElapsed < scrollDuration) {
                requestAnimationFrame(animation);
            } else {
                window.location.hash = targetId; // Restablecer la ubicación hash para permitir el scroll hacia arriba
            }
        }
    
        requestAnimationFrame(animation);
    }
    
    // Detectar todos los enlaces <a> y agregar un evento click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const targetId = this.getAttribute('href').substring(1); // Obtener el ID del objetivo del enlace
            smoothScroll(targetId); // Llamar a la función de desplazamiento suave
        });
    });