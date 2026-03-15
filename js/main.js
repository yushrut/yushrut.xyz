/* js/main.js — Complete FourNine Effects */
function initSlideshow() {
  const slideshowImg = document.getElementById("slideshow-img");
  if (!slideshowImg || images.length === 0) return;

  const showRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    const rawPath = images[randomIndex];
    const encodedPath = encodeURI(rawPath);

    // Debug: ensure we’re picking an image and the src is valid
    console.debug("Slideshow: loading", rawPath, "->", encodedPath);

    slideshowImg.onerror = () => {
      console.warn("Slideshow: failed to load", encodedPath);
      // fallback to first valid image
      if (images.length > 0) {
        slideshowImg.onerror = null;
        slideshowImg.src = encodeURI(images[0]);
      }
    };

    slideshowImg.src = encodedPath;
  };

  showRandomImage();
  setInterval(showRandomImage, 3000); // Change image every 3 seconds
}

function initAnimations() {
  // ==========================================================================
  // SMOOTH SCROLL ENGINE (Lenis)
  // ==========================================================================
  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ==========================================================================
  // SCROLL REVEALS (AOS)
  // ==========================================================================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }

  // ==========================================================================
  // GSAP HERO ANIMATIONS
  // ==========================================================================
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero text stagger
    gsap.from(".hero h1", {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
    });

    // Cards stagger reveal
    gsap.utils.toArray(".glass-card, .capability-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    });

    // Navbar underline animations
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          "--underline-width": "100%",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          "--underline-width": "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // ======================================================================
    // PARALLAX ELEMENTS
    // ======================================================================
    gsap.to(".hero-visual", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Floating gradient orbs in footer
    gsap.to(".footer-cta::before", {
      y: -20,
      rotation: 5,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
  }

  // ==========================================================================
  // INTERSECTION OBSERVER (Mobile fallback)
  // ==========================================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeInUp");
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    observer.observe(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAnimations();
    initSlideshow();
  });
} else {
  initAnimations();
  initSlideshow();
}

const modal = document.getElementById("projectModal");

if (modal) {
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  });

  const closeBtn = document.querySelector(".close-modal");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }
}

// ==========================================================================
// IMAGE SLIDESHOW
// ==========================================================================
const images = [
  "Images/carousel/an10.jpeg",
  "Images/carousel/an12.jpeg",
  "Images/carousel/an14.jpeg",
  "Images/carousel/an2.jpeg",
  "Images/carousel/an6.jpeg",
  "Images/carousel/an7.jpeg",
  "Images/carousel/an9.jpeg",
  "Images/carousel/Bihar Exhibition.png",
  "Images/carousel/BIhar Pavilion.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 03_40_54 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 03_42_36 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 03_46_48 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 03_53_49 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 12_05_07 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 12_57_11 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 12_57_14 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 12_57_19 PM.png",
  "Images/carousel/ChatGPT Image Mar 12, 2026, 12_57_22 PM.png",
  "Images/carousel/dp1.jpeg",
  "Images/carousel/dp11.jpeg",
  "Images/carousel/dp13.jpeg",
  "Images/carousel/dp15.jpeg",
  "Images/carousel/dp2.jpeg",
  "Images/carousel/dp3.jpeg",
  "Images/carousel/dp5.jpeg",
  "Images/carousel/dp9.jpeg",
  "Images/carousel/DSC_4964.JPG",
  "Images/carousel/DSC_4965.JPG",
  "Images/carousel/DSC_4966.JPG",
  "Images/carousel/DSC_4967.JPG",
  "Images/carousel/DSC_4972.JPG",
  "Images/carousel/DSC_4994.JPG",
  "Images/carousel/DSC_4998.JPG",
  "Images/carousel/DSC_5081.JPG",
  "Images/carousel/DSC_5090.JPG",
  "Images/carousel/DSC_5099.JPG",
  "Images/carousel/DSC_5108.JPG",
  "Images/carousel/DSC_5123.JPG",
  "Images/carousel/DSC_5148.JPG",
  "Images/carousel/exp1.png",
  "Images/carousel/exp2.png",
  "Images/carousel/Haryana (1).png",
  "Images/carousel/Haryana Pavilion 1.png",
  "Images/carousel/Haryana Pavilion.png",
  "Images/carousel/Holograph.png",
  "Images/carousel/malayair1.jpg",
  "Images/carousel/malayair2.jpg",
  "Images/carousel/malayair3.jpg",
  "Images/carousel/malayair4.jpg",
  "Images/carousel/mapic1.jpeg",
  "Images/carousel/mapic4.jpeg",
  "Images/carousel/mapic7.jpeg",
  "Images/carousel/p.jpeg",
  "Images/carousel/p1.jpeg",
  "Images/carousel/p10.jpeg",
  "Images/carousel/p2.jpeg",
  "Images/carousel/p3.jpeg",
  "Images/carousel/p4.jpeg",
  "Images/carousel/p6.jpeg",
  "Images/carousel/p8.jpeg",
  "Images/carousel/WhatsApp Image 2023-12-30 at 9.44.28 PM (1).jpeg",
  "Images/carousel/WhatsApp Image 2023-12-30 at 9.44.43 PM (1).jpeg",
  "Images/carousel/WhatsApp Image 2023-12-30 at 9.44.43 PM.jpeg",
  "Images/carousel/WhatsApp Image 2024-09-18 at 3.29.31 PM (3).jpeg",
  "Images/carousel/WhatsApp Image 2024-09-18 at 3.29.32 PM (2).jpeg",
  "Images/carousel/WhatsApp Image 2024-09-18 at 3.29.33 PM (1).jpeg",
  "Images/carousel/WhatsApp Image 2024-09-18 at 7.45.03 AM.jpeg",
  "Images/carousel/WhatsApp Image 2025-03-28 at 10.47.50 AM (1).jpeg",
  "Images/carousel/WhatsApp Image 2025-03-28 at 10.47.53 AM (2).jpeg",
  "Images/carousel/WhatsApp Image 2025-03-28 at 10.47.54 AM (3).jpeg",
  "Images/carousel/whiskey.jpeg",
  "Images/carousel/whiskey1.jpeg",
  "Images/carousel/whiskey17.jpeg",
  "Images/carousel/whiskey20.jpeg",
  "Images/carousel/whiskey3.jpeg",
  "Images/carousel/whiskey9.jpeg",
];

let currentIndex = 0;

function showRandomImage() {
  if (images.length === 0) return;
  const randomIndex = Math.floor(Math.random() * images.length);
  document.getElementById("slideshow-img").src = images[randomIndex];
}

if (document.getElementById("slideshow-img")) {
  showRandomImage();
  setInterval(showRandomImage, 3000); // Change image every 3 seconds
}
