import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Scroll Snapping on sections
const snapSection = document.querySelectorAll('.snap-section');
snapSection.forEach((section, index) => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // end: 'bottom top',
        snap: {
            snapTo: 1, // Snap to the closest section
            duration: 0.3,
            delay: 0.1,
        },
    });
});
