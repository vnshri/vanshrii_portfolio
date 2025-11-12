class SplitLoader {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.mainContainer = document.getElementById('mainContainer');
        this.spotlight = document.getElementById('spotlight');
    }

    startLoading() {
        setTimeout(() => this.completeLoading(), 1400);
    }

    completeLoading() {
        this.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            this.mainContainer.classList.add('loaded');
            // section fade in effects
            document.body.classList.add("page-loaded");

            this.initNavigation();
            this.initSpotlight();
            this.enableLeftScrollControl();   // NEW
        }, 300);
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollContainer = document.querySelector('.right-section');
        const sections = scrollContainer.querySelectorAll('.section');

        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const target = scrollContainer.querySelector(link.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth' });
            });
        });

        scrollContainer.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(sec => {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                if (scrollContainer.scrollTop >= top - 100 && scrollContainer.scrollTop < top + height - 100) {
                    current = sec.id;
                }
            });
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`.menu a[href="#${current}"]`)?.classList.add('active');
        });
    }

    enableLeftScrollControl() {
        const left = document.querySelector('.left-section');
        const right = document.querySelector('.right-section');

        left.addEventListener('wheel', (e) => {
            e.preventDefault();
            right.scrollTop += e.deltaY * 3; // SCROLL SPEED MULTIPLIER (change 3 → faster or slower)
        }, { passive: false });
    }

    initSpotlight() {
        document.addEventListener('mousemove', e => {
            this.spotlight.style.background =
            `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(29,78,216,0.15), transparent 80%)`;
            this.spotlight.classList.add('active');
        });
        document.addEventListener('mouseleave', () => this.spotlight.classList.remove('active'));
    }
}

document.addEventListener('DOMContentLoaded', () => new SplitLoader().startLoading());


//Typing text effect 

const roles = ["Java Developer", "Full Stack Developer", "Web Developer"];
let i = 0, j = 0;
const el = document.querySelector(".typing-text");

function type() {
    if (j < roles[i].length) {
        el.textContent += roles[i][j];
        j++;
        setTimeout(type, 80); // faster typing
    } else {
        setTimeout(erase, 400); // short pause before erasing
    }
}

function erase() {
    if (j > 0) {
        el.textContent = roles[i].substring(0, j-1);
        j--;
        setTimeout(erase, 50); // faster erase
    } else {
        i = (i + 1) % roles.length;
        setTimeout(type, 200); // short delay before next word
    }
}

type();


// section fade in

// Add subtle animation to cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Initial animation
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Add scroll effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelector('.skills-section').style.transform = `translateY(${rate}px)`;
    });
    
    // Add click effect to skill cards
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});