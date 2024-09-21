function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    if (sectionId === 'gallerySection') {
        loadInitialPhotos();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeIcon = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show-notification');
    setTimeout(() => {
        notification.classList.remove('show-notification');
    }, 3000);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('button');
    const originalText = button.innerHTML;
    button.innerHTML = '<div class="loading"></div>Mengirim...';
    button.disabled = true;
    
    setTimeout(() => {
        showNotification('Pesan terkirim! Atau mungkin nyangkut di spam. Who knows?');
        this.reset();
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
});

document.getElementById('blogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const postDiv = document.createElement('div');
    postDiv.className = 'blog-post';
    postDiv.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
    document.getElementById('userBlogPosts').appendChild(postDiv);
    showNotification('Postingan berhasil ditambahkan! Selamat, Anda sekarang resmi jadi influencer... di website ini.');
    this.reset();
});

function changeQuote() {
    const quotes = [
        "Hidup itu seperti main game. Kadang menang, kadang kalah, tapi yang penting jangan lupa save progress.",
        "Jangan takut gagal. Takutlah kalau nggak pernah mencoba.",
        "Kalau hidup memberimu lemon, buatlah lemonade. Kalau hidup memberimu durian, ya dimakan aja lah.",
        "Skripsi itu seperti mantan. Susah move on, tapi harus diselesaikan."
    ];
    const quoteElement = document.querySelector('.quote');
    let newQuote = quoteElement.textContent;
    while (newQuote === quoteElement.textContent) {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }
    quoteElement.textContent = newQuote;
}

function changeFunFact() {
    const facts = [
        "Pernah nyoba bikin robot, tapi malah jadi tukang gosip.",
        "Skill memasak saya begitu hebat, sampai-sampai Indomie bisa gosong.",
        "Pernah ikut lomba maraton, tapi malah nyasar ke food court.",
        "Bisa tidur dengan mata terbuka pas kuliah online."
    ];
    const factElement = document.getElementById('funFact');
    let newFact = factElement.textContent;
    while (newFact === factElement.textContent) {
        newFact = facts[Math.floor(Math.random() * facts.length)];
    }
    factElement.textContent = newFact;
}

function addRandomPhoto() {
    const gallery = document.getElementById('photoGallery');
    const img = document.createElement('img');
    img.src = `https://picsum.photos/300/200?random=${Math.random()}`;
    img.alt = 'Foto Random';
    img.className = 'gallery-photo';
    gallery.appendChild(img);
}

function loadInitialPhotos() {
    const gallery = document.getElementById('photoGallery');
    if (gallery.children.length === 0) {
        for (let i = 0; i < 6; i++) {
            addRandomPhoto();
        }
    }
}

document.getElementById('profilePic').addEventListener('click', function() {
    this.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        this.style.transform = 'none';
    }, 1000);
});

// Easter egg
let konami = '';
const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
document.addEventListener('keydown', (e) => {
    konami += e.key;
    if (konamiCode.indexOf(konami) !== 0) {
        konami = '';
        return;
    }
    if (konami === konamiCode) {
        document.body.style.fontFamily = '"Comic Sans MS", cursive';
        showNotification('Easter egg activated! Enjoy your new... interesting font.');
        konami = '';
    }
});

// Load initial content
showSection('homeSection');