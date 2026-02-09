// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Search Tabs =====
const searchTabs = document.querySelectorAll('.search-tab');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// ===== Property Favorite Toggle =====
const favoriteButtons = document.querySelectorAll('.property-favorite');

favoriteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentText = button.textContent;
        button.textContent = currentText === '♡' ? '♥' : '♡';

        // Add animation
        button.style.transform = 'scale(1.3)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    });
});

// ===== Property Cards Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe property cards
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show success message (in real app, this would send to server)
    const formButton = contactForm.querySelector('.form-button');
    const originalText = formButton.textContent;

    formButton.textContent = 'Відправлено! ✓';
    formButton.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

    // Reset form
    setTimeout(() => {
        contactForm.reset();
        formButton.textContent = originalText;
        formButton.style.background = '';
    }, 3000);
});

// ===== Mobile Menu Toggle =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            navLinksContainer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 968) {
        if (!e.target.closest('.nav-content')) {
            navLinksContainer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// ===== Property Button Click Handler =====
const propertyButtons = document.querySelectorAll('.property-button');

propertyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.property-card');
        const title = card.querySelector('.property-title').textContent;
        const price = card.querySelector('.property-price').textContent;

        // In a real application, this would open a modal or navigate to a detail page
        alert(`Ви обрали: ${title}\nЦіна: ${price}\n\nЗв'яжіться з нами для отримання додаткової інформації!`);
    });
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Number Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/\D/g, ''));

    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }

        let displayValue = Math.floor(current);
        if (isPercentage) {
            displayValue += '%';
        } else if (isPlus) {
            displayValue += '+';
        }

        element.textContent = displayValue;
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===== Search Form Handler =====
const searchButton = document.querySelector('.search-button');
const searchForm = document.querySelector('.search-form');

if (searchButton && searchForm) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

        const city = searchForm.querySelector('.search-input').value;
        const propertyType = searchForm.querySelectorAll('.search-select')[0].value;
        const priceRange = searchForm.querySelectorAll('.search-select')[1].value;

        // In a real application, this would filter properties or navigate to search results
        if (city) {
            alert(`Пошук нерухомості в: ${city}\nТип: ${propertyType}\nЦіна: ${priceRange}`);
        } else {
            alert('Будь ласка, введіть місто для пошуку');
        }
    });
}

// ===== Add hover effect to images =====
const propertyImages = document.querySelectorAll('.property-image');

propertyImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.cursor = 'pointer';
    });
});

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Console Welcome Message =====
console.log('%c🏛️ Елітна Нерухомість', 'font-size: 24px; font-weight: bold; color: #c9a961;');
console.log('%cВітаємо на нашому сайті!', 'font-size: 14px; color: #2c3e50;');
console.log('%cЗнайдіть свій ідеальний дім з нами', 'font-size: 12px; color: #6c757d;');
