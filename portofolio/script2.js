document.addEventListener('DOMContentLoaded', () => {
    try {
        const riderTransform = document.getElementById('rider-transform');
        const henshinBelt = document.getElementById('henshin-belt');
        const henshinBtn = document.getElementById('henshin-btn');
        const lightning = document.getElementById('lightning');
        const rainContainer = document.getElementById('rain-container');
        const backgroundMusic = document.getElementById('background-music');
        const henshinSound = document.getElementById('henshin-sound');
        const thunderSound = document.getElementById('thunder-sound');

        function createRain() {
            const raindropsCount = 200;
            for (let i = 0; i < raindropsCount; i++) {
                createRaindrop();
            }
        }

        function createRaindrop() {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');
            raindrop.style.left = `${Math.random() * 100}%`;
            raindrop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            raindrop.style.opacity = Math.random();
            raindrop.style.height = `${Math.random() * 20 + 10}px`;
            rainContainer.appendChild(raindrop);

            raindrop.addEventListener('animationend', () => {
                raindrop.remove();
                createRaindrop();
            });
        }

        function flashLightning() {
            gsap.to(lightning, {
                duration: 0.1,
                opacity: 0.8,
                repeat: 3,
                yoyo: true,
                onComplete: () => {
                    thunderSound.play();
                }
            });
        }

        function startBackgroundMusic() {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play();
        }

        createRain();
        setInterval(flashLightning, 5000);
        startBackgroundMusic();

        setTimeout(() => {
            riderTransform.classList.remove('hidden');
            gsap.from(riderTransform, {duration: 1, y: -100, opacity: 0});
        }, 1000);

        setTimeout(() => {
            henshinBelt.classList.remove('hidden');
            gsap.from(henshinBelt, {duration: 1, scale: 0, opacity: 0});
        }, 2000);

        setTimeout(() => {
            henshinBtn.classList.remove('hidden');
            gsap.from(henshinBtn, {duration: 1, y: 100, opacity: 0});
            console.log('Henshin button is ready!');
            henshinBtn.addEventListener('click', handleHenshinClick);
        }, 3000);

        function handleHenshinClick() {
            console.log('Henshin button clicked!');
            
            gsap.to(backgroundMusic, {duration: 1, volume: 0});
            henshinSound.play();
            
            intensifyRain();
            flashLightning();
            
            gsap.to(riderTransform, {duration: 2, rotation: 360, scale: 1.5});
            gsap.to(henshinBelt, {duration: 1, opacity: 0, y: 50});
            gsap.to(henshinBtn, {duration: 1, opacity: 0, onComplete: redirectToHome});
        }

        function intensifyRain() {
            for (let i = 0; i < 100; i++) {
                createRaindrop();
            }
            document.querySelectorAll('.raindrop').forEach(drop => {
                drop.style.animationDuration = `${0.3 + Math.random() * 0.3}s`;
            });
        }

        function redirectToHome() {
            gsap.to('body', {
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    backgroundMusic.pause();
                    henshinSound.pause();
                    thunderSound.pause();
                    window.location.href = 'home.html';
                }
            });
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
});