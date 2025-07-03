const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");

// Бургер-меню
burger.addEventListener("click", () => {
   nav.classList.toggle("open");
   burger.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
   link.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("open");
   });
});

const navClose = document.getElementById("navClose");

navClose.addEventListener("click", () => {
   const nav = document.getElementById("navLinks");
   const burger = document.getElementById("burger");

   nav.classList.remove("open");
   burger.classList.remove("open");
});


// Карусель

const carousel = document.getElementById('testimonialCarousel');
const cards = carousel.querySelectorAll('.testimonial-card');
cards.forEach(card => {
   card.addEventListener('mouseenter', () => {
      clearInterval(autoScroll);
      card.classList.add('hovered');
   });

   card.addEventListener('mouseleave', () => {
      autoScroll = setInterval(() => {
         moveCarousel(1);
      }, 3000);
      card.classList.remove('hovered');
   });
});
const cardCount = cards.length;

let currentIndex = 0;
let cardWidth = cards[0].offsetWidth + 16;
let visibleCardsCount;

function updateDimensions() {
   const vw = window.innerWidth;
   if (vw <= 600) {
      visibleCardsCount = 1;
   } else if (vw <= 992) {
      visibleCardsCount = 2;
   } else {
      visibleCardsCount = 3;
   }
   cardWidth = cards[0].offsetWidth + 16;
}

function cloneCards() {
   const firstClones = [];
   const lastClones = [];

   for (let i = 0; i < visibleCardsCount; i++) {
      const firstClone = cards[i].cloneNode(true);
      firstClone.classList.add('clone');
      carousel.appendChild(firstClone);
      firstClones.push(firstClone);

      const lastClone = cards[cardCount - 1 - i].cloneNode(true);
      lastClone.classList.add('clone');
      carousel.insertBefore(lastClone, carousel.firstChild);
      lastClones.push(lastClone);
   }
}

// Инициализация карусели
function initCarousel() {
   updateDimensions();
   cloneCards();

   carousel.style.transition = 'none';
   carousel.style.transform = `translateX(${-cardWidth * visibleCardsCount}px)`;
   currentIndex = visibleCardsCount;

   setTimeout(() => {
      carousel.style.transition = 'transform 0.5s ease';
   }, 50);
}

initCarousel();

let isMoving = false;

function moveCarousel(direction = 1) {
   if (isMoving) return;
   isMoving = true;

   currentIndex += direction;
   carousel.style.transform = `translateX(${-cardWidth * currentIndex}px)`;

   carousel.addEventListener('transitionend', () => {
      if (currentIndex >= cardCount + visibleCardsCount) {
         carousel.style.transition = 'none';
         currentIndex = visibleCardsCount;
         carousel.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
         setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
            isMoving = false;
         }, 50);
      } else if (currentIndex <= visibleCardsCount - 1) {
         carousel.style.transition = 'none';
         currentIndex = cardCount + visibleCardsCount - 1;
         carousel.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
         setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
            isMoving = false;
         }, 50);
      } else {
         isMoving = false;
      }
   }, { once: true });
}

// Автопрокрутка
let autoScroll = setInterval(() => {
   moveCarousel(1);
}, 3000);

window.addEventListener('resize', () => {
   clearInterval(autoScroll);
   carousel.style.transition = 'none';
   carousel.style.transform = 'translateX(0)';
   carousel.innerHTML = '';

   for (let i = 0; i < cardCount; i++) {
      carousel.appendChild(cards[i]);
   }

   initCarousel();
   autoScroll = setInterval(() => {
      moveCarousel(1);
   }, 3000);
});