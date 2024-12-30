// Wave Animation
function setupWaveAnimation() {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const waves = Array.from({ length: 20 }, (_, i) => ({
        y: 85 + i,
        amplitude: 10,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02
    }));

    function drawWave(wave, opacity) {
        ctx.beginPath();
        ctx.moveTo(0, height * (wave.y / 100));

        for (let x = 0; x <= width; x++) {
            const y = height * (wave.y / 100) + 
                     Math.sin(x * 0.003 + wave.phase) * wave.amplitude;
            ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
        gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        waves.forEach((wave, i) => {
            wave.phase += wave.speed;
            drawWave(wave, 0.3 - (i * 0.01));
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Scroll Animation
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.scroll-fade');
    
    function checkScroll() {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check initial state
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupWaveAnimation();
    setupScrollAnimation();
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});