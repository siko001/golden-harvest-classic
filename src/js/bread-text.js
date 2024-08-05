import gsap from 'gsap';

const allBread = document.querySelectorAll('[data-bread]');
const allTextContainer = document.querySelectorAll('.text-container');

// Set all the text containers to be hidden and scaled down
allTextContainer.forEach((textContainer) => {
    if (!textContainer.parentElement.classList.contains('selected')) {
        gsap.set(textContainer, { autoAlpha: 0, scale: 0.1 });
    }
});

// Add click event listener to all bread elements
allBread.forEach((bread) => {
    bread.addEventListener('click', () => {
        allBread.forEach((bread) => {
            bread?.classList.remove('selected');
            if (bread.children[1]) {
                gsap.to(bread.children[1], {
                    autoAlpha: 0,
                    duration: 0.5,
                    scale: 0.1,
                    ease: 'power2.out',
                    onComplete: () => {
                        bread.children[1].classList.add('flex');
                        bread.children[1].classList.remove('hidden');
                    },
                });
            }
        });
        bread?.classList.add('selected');
        const textContainer = bread?.querySelector('.text-container');
        if (textContainer) {
            gsap.to(textContainer, {
                autoAlpha: 1,
                duration: 0.5,
                scale: 1,
                ease: 'power2.out',
                onStart: () => {
                    textContainer.classList.remove('hidden');
                    textContainer.classList.add('flex');
                },
            });
        }
    });
});
