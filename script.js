document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog posts
    const initialPosts = [
        {
            title: "Kenapa Saya Kuliah",
            content: "Awalnya sih karena dipaksa ortu. Tapi sekarang? Karena udah terlanjur bayar UKT. Mau mundur, dompet nggak memungkinkan. Mau maju, otak kadang nggak sanggup. Yah, namanya juga perjuangan."
        },
        {
            title: "Tips Sukses Kuliah",
            content: "1. Bangun pagi (kalau bisa)<br>2. Dateng ke kelas (minimal absen)<br>3. Catat yang penting-penting (gosip dosen termasuk penting)<br>4. Kerjain tugas (sehari sebelum deadline masih keburu)"
        },
        {
            title: "Pengalaman Magang: Expectation vs Reality",
            content: "Expectation: Jadi profesional muda yang keren.<br>Reality: Jadi tukang fotokopi handal dan ahli bikin kopi. Tapi hey, at least kopi buatan gue enak!"
        }
    ];

    const blogPostsContainer = document.getElementById('blogPosts');
    initialPosts.forEach(post => addBlogPost(post.title, post.content));

    function addBlogPost(title, content) {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post fade-in';
        postElement.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
        `;
        blogPostsContainer.appendChild(postElement);
        setTimeout(() => postElement.classList.add('appear'), 10);
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
        addBlogPost(title, content);
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
        quoteElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            quoteElement.style.transform = 'scale(1)';
        }, 300);
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
        factElement.style.transform = 'rotate(5deg)';
        setTimeout(() => {
            factElement.style.transform = 'rotate(0deg)';
        }, 300);
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

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    navToggle.addEventListener('change', function() {
        if (this.checked) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.checked = false;
            navMenu.style.display = 'none';
        });
    });

    // Intersection Observer for fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Attach event listeners
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    document.querySelector('.quote').addEventListener('click', changeQuote);
    document.getElementById('funFact').addEventListener('click', changeFunFact);
});
