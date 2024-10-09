// Burger Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Burger Animation
  burger.classList.toggle('toggle');
});

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let counter = 1; // Start at 1 because 0 is the lastClone
const size = slides[0].clientWidth;

// Position the carousel to the first actual slide
carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Next Button
nextButton.addEventListener('click', () => {
  if (counter >= slides.length - 1) return;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  counter++;
  carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// Prev Button
prevButton.addEventListener('click', () => {
  if (counter <= 0) return;
  carousel.style.transition = 'transform 0.5s ease-in-out';
  counter--;
  carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

// Transition End Event
carousel.addEventListener('transitionend', () => {
  const currentSlide = slides[counter];
  if (currentSlide.id === 'lastClone') {
    carousel.style.transition = 'none';
    counter = slides.length - 2;
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
  if (currentSlide.id === 'firstClone') {
    carousel.style.transition = 'none';
    counter = 1;
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

// Auto Slide (optional)
setInterval(() => {
  nextButton.click();
}, 5000); // Change slide every 5 seconds

// Smooth Scroll for Navigation Links
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = item.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 70, // Adjust for fixed nav height
      behavior: 'smooth'
    });
    // Close the nav menu if it's active (for mobile)
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

// Fade-In on Scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Keyboard Navigation for Carousel
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevButton.click();
  } else if (e.key === 'ArrowRight') {
    nextButton.click();
  }
});

// Continuous Animation for Animated Heading
const animatedHeading = document.querySelector('.animated-heading');
const headingSpans = animatedHeading.querySelectorAll('span');

function restartAnimations() {
  headingSpans.forEach(span => {
    span.style.animation = 'none';
    span.offsetHeight; /* trigger reflow */
    span.style.animation = '';
  });

  // Restart tagline animation
  const tagline = document.querySelector('.tagline');
  tagline.style.animation = 'none';
  tagline.offsetHeight; /* trigger reflow */
  tagline.style.animation = '';
}

// Restart animations after they complete
// Total duration: last span's delay + animation duration + tagline delay + animation duration
setTimeout(restartAnimations, 3600); // Adjust timing based on your animation delays

// Alternatively, use 'animationend' event for more precision
headingSpans.forEach(span => {
  span.addEventListener('animationend', () => {
    if (span === headingSpans[headingSpans.length - 1]) {
      setTimeout(restartAnimations, 1000); // Short delay before restarting
    }
  });
});

const tagline = document.querySelector('.tagline');
tagline.addEventListener('animationend', () => {
  setTimeout(restartAnimations, 500); // Short delay before restarting
});
// JavaScript for carousel navigation with mouse and keyboard
const manhwaItems = document.querySelectorAll('.manhwa-item');
let currentIndex = 0;

function showManhwa(index) {
    manhwaItems.forEach((item, idx) => {
        item.style.display = idx === index ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    showManhwa(currentIndex);

    manhwaItems.forEach(item => {
        item.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % manhwaItems.length;
            showManhwa(currentIndex);
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                currentIndex = (currentIndex + 1) % manhwaItems.length;
                showManhwa(currentIndex);
            }
        });
    });
});

// Optional: Auto-rotate carousel every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % manhwaItems.length;
    showManhwa(currentIndex);
}, 5000);
