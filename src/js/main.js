import './navmenu';

import { Draggable } from 'gsap/all';
import gsap from 'gsap';
gsap.registerPlugin(Draggable);

const boundingCont = document.getElementById('bounding-cont');
const mouseFollow = document.getElementById('mouse-cursor-follower');

let velocityX = 0;
let velocityY = 0;
let lastX = 0;
let lastY = 0;

const updateVelocity = (draggable) => {
    const deltaX = draggable.x - lastX;
    const deltaY = draggable.y - lastY;
    velocityX = deltaX / (gsap.ticker.deltaRatio() || 1);
    velocityY = deltaY / (gsap.ticker.deltaRatio() || 1);
    lastX = draggable.x;
    lastY = draggable.y;
};

const resetPositionIfNeeded = (draggable) => {
    const rect = boundingCont.getBoundingClientRect();
    const draggableRect = draggable.target.getBoundingClientRect();

    if (draggableRect.right < rect.left) {
        gsap.set(draggable.target, { x: rect.right - draggableRect.width });
    } else if (draggableRect.left > rect.right) {
        gsap.set(draggable.target, { x: rect.left });
    }

    if (draggableRect.bottom < rect.top) {
        gsap.set(draggable.target, { y: rect.bottom - draggableRect.height });
    } else if (draggableRect.top > rect.bottom) {
        gsap.set(draggable.target, { y: rect.top });
    }
};

Draggable.create('#draggable-cont', {
    type: 'x,y',
    bounds: boundingCont,
    dragResistance: 0.55,
    edgeResistance: 1.5,

    onDrag: function () {
        updateVelocity(this);
        resetPositionIfNeeded(this);
    },
    onDragStart: (e) => {
        updateMouseFollow(e);
    },

    onDragEnd: function () {
        const friction = 0.1;
        const momentumDuration = 1;
        const finalX = this.x + velocityX * momentumDuration * (0.9 - friction);
        const finalY = this.y + velocityY * momentumDuration * (0.9 - friction);

        gsap.to(this.target, {
            x: finalX,
            y: finalY,
            duration: momentumDuration,
            ease: 'power2.out',
            onUpdate: () => {
                velocityX *= friction;
                velocityY *= friction;
                resetPositionIfNeeded(this);
            },
        });
    },
});

const updateMouseFollow = (e) => {
    const draggableCont = document.getElementById('draggable-cont');
    const rect = boundingCont.getBoundingClientRect();
    const draggableRect = draggableCont.getBoundingClientRect();
    const offsetX = draggableRect.left - rect.left + window.innerWidth + 30;
    const offsetY = draggableRect.top - rect.top + window.innerHeight + 310;

    const relativeX = e.clientX - rect.left - offsetX - mouseFollow.offsetWidth / 2;
    const relativeY = e.clientY - rect.top - offsetY - mouseFollow.offsetHeight / 2;

    gsap.to(mouseFollow, {
        x: relativeX,
        y: relativeY,
        duration: 0.1,
    });
};

const draggableCont = document.getElementById('draggable-cont');
draggableCont.addEventListener('mousemove', updateMouseFollow);

draggableCont.addEventListener('mouseover', () => {
    draggableCont.classList.add('is-hovered');
});

const allBread = document.querySelectorAll('[data-bread]');
const allTextContainer = document.querySelectorAll('.text-container');

allTextContainer.forEach((textContainer) => {
    if (!textContainer.parentElement.classList.contains('selected')) {
        gsap.set(textContainer, { autoAlpha: 0, scale: 0.1 });
    }
});

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
