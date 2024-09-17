// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav ul li a').forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').substring(1) === current) {
            li.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuIcon = document.createElement('div');
mobileMenuIcon.className = 'mobile-menu-icon';
mobileMenuIcon.innerHTML = '☰';
document.querySelector('nav').appendChild(mobileMenuIcon);

mobileMenuIcon.addEventListener('click', () => {
    const navUl = document.querySelector('nav ul');
    navUl.classList.toggle('show');
});

// Form submission (you can customize this part based on your backend)
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim.');
    this.reset();
});

// Tambahkan kode ini di akhir file script.js

// Fungsi untuk membuat tetesan hujan
function createRainDrop() {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    
    const stem = document.createElement('div');
    stem.classList.add('stem');
    drop.appendChild(stem);
    
    const splat = document.createElement('div');
    splat.classList.add('splat');
    drop.appendChild(splat);
    
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDuration = 0.5 + Math.random() * 0.3 + 's';
    drop.style.opacity = Math.random() * 0.3 + 0.7;
    
    return drop;
}

// Fungsi untuk memulai hujan
function startRain() {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain');
    document.body.appendChild(rainContainer);
    
    setInterval(() => {
        const rainDrop = createRainDrop();
        rainContainer.appendChild(rainDrop);
        
        setTimeout(() => {
            rainDrop.remove();
        }, 2000);
    }, 20);
}

// Fungsi untuk membuat efek petir
function createLightning() {
    const lightning = document.createElement('div');
    lightning.classList.add('lightning');
    document.body.appendChild(lightning);
    
    lightning.style.display = 'block';
    setTimeout(() => {
        lightning.style.display = 'none';
    }, 100);
    
    setTimeout(() => {
        lightning.style.display = 'block';
    }, 150);
    
    setTimeout(() => {
        lightning.style.display = 'none';
        lightning.remove();
    }, 250);
}

// Memulai hujan saat halaman dimuat
window.addEventListener('load', startRain);

// Membuat petir secara acak
setInterval(() => {
    if (Math.random() < 0.1) { // 10% kemungkinan petir muncul setiap interval
        createLightning();
    }
}, 5000); // Cek setiap 5 detik

function setParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(elem => {
            const scrolled = window.pageYOffset;
            const coords = (scrolled * 0.4) + 'px';
            elem.style.transform = `translateY(${coords})`;
        });
    });
}

setParallaxEffect();

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-level');
        bar.style.width = targetWidth;
    });
}

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', reveal);

function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const darkModeIcon = darkModeToggle.querySelector('i');

    // Check for saved dark mode preference or use system preference
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('darkMode') !== 'disabled')) {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

initDarkMode();

initScrollProgress();