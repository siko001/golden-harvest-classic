import gsap from 'gsap';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(Draggable);

const boundingCont = document.getElementById('bounding-cont');
const mouseFollow = document.getElementById('mouse-cursor-follower');

// Draggable Variables
let velocityX = 0;
let velocityY = 0;
let lastX = 0;
let lastY = 0;

// Draggable Config
let dragResistance = 0.55;
let preventDefault = false;
let autoScroll = false;

//Mobile Draggable Config
if (window.innerWidth < 768) {
    dragResistance = 0.1;
    preventDefault = true;
    autoScroll = 1;
}

// Update the velocity of the draggable element
const updateVelocity = (draggable) => {
    const deltaX = draggable.x - lastX;
    const deltaY = draggable.y - lastY;
    velocityX = deltaX / (gsap.ticker.deltaRatio() || 1);
    velocityY = deltaY / (gsap.ticker.deltaRatio() || 1);
    lastX = draggable.x;
    lastY = draggable.y;
};

// Create the draggable element
Draggable.create('#draggable-cont', {
    allowEventDefault: preventDefault,
    type: 'x,y',
    bounds: boundingCont,
    dragResistance: dragResistance,
    edgeResistance: 1.5,
    autoScroll: autoScroll,

    onDrag: function () {
        updateVelocity(this);
    },
    onDragStart: (e) => {
        updateMouseFollow(e);
    },

    onDragEnd: function () {
        const friction = 0.1;
        const momentumDuration = 3;
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
            },
        });
    },
});

// Update the mouse follow element
const updateMouseFollow = (e) => {
    // Set the dividing value for the mouse follow element
    let dividingValue = 2;
    let extraOffsetY = 10;

    // Check if the device is mobile and set different configs
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    if (mobile) {
        extraOffsetY = window.innerWidth;
        dividingValue = 5;
    }

    const draggableCont = document.getElementById('draggable-cont');
    const rect = boundingCont.getBoundingClientRect();
    const draggableRect = draggableCont.getBoundingClientRect();
    const offsetX = draggableRect.left - rect.left + window.innerWidth + extraOffsetY;
    const offsetY = draggableRect.top - rect.top + window.innerHeight + 310;

    const relativeX = e.clientX - rect.left - offsetX - mouseFollow.offsetWidth / dividingValue;
    const relativeY = e.clientY - rect.top - offsetY - mouseFollow.offsetHeight / dividingValue;

    gsap.to(mouseFollow, {
        x: relativeX,
        y: relativeY,
        duration: 0.1,
    });
};

// Update the mouse follow element on mouse move
const draggableCont = document.getElementById('draggable-cont');
draggableCont.addEventListener('mousemove', updateMouseFollow);

// Hide the cursor on hover of the draggable container
draggableCont.addEventListener('mouseover', () => {
    draggableCont.classList.add('is-hovered');
});
