import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
    gsap.set('.sub-menu', { top: '-85' });

    const menuItems = document.querySelectorAll(
        '#menu-left-header-menu-1 .menu-item-has-children, #menu-right-header-menu-1 .menu-item-has-children'
    );

    let activeMenuItem = null;
    let isAnimating = false;

    menuItems.forEach((item) => {
        const link = item.querySelector('a');

        item.addEventListener('mouseenter', function () {
            if (isAnimating) return;
            if (activeMenuItem && activeMenuItem !== item) {
                isAnimating = true;

                gsap.to(activeMenuItem.querySelector('.sub-menu'), {
                    top: '-85',
                    duration: 0.5,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        activeMenuItem.querySelector('.sub-menu-container').style.display = 'none';
                        activeMenuItem = item;
                        item.querySelector('.sub-menu-container').style.display = 'block';
                        gsap.to(item.querySelector('.sub-menu'), {
                            top: '0',
                            duration: 0.5,
                            ease: 'power1.inOut',
                            onComplete: () => {
                                isAnimating = false;
                            },
                        });
                    },
                });
            } else if (!activeMenuItem) {
                activeMenuItem = item;
                item.querySelector('.sub-menu-container').style.display = 'block';

                gsap.to(item.querySelector('.sub-menu'), {
                    top: '0',
                    duration: 0.5,
                    ease: 'power1.inOut',
                });
            }
        });

        item.addEventListener('mouseleave', function () {
            if (isAnimating) return;
            if (activeMenuItem === item) {
                isAnimating = true;
                gsap.to(item.querySelector('.sub-menu'), {
                    top: '-85',
                    duration: 0.5,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        item.querySelector('.sub-menu-container').style.display = 'none';
                        isAnimating = false;
                        activeMenuItem = null;
                    },
                });
            }
        });
    });

    //********************************  Mobile Menu
    const toggleBtn = document.getElementById('mnav-menu-btn');
    const navMenu = document.getElementById('mobile-nav-menu');

    // Set initial state
    navMenu &&
        gsap.set(navMenu, {
            left: '-100%',
            onComplete: () => {
                navMenu.classList.remove('invisible');
            },
        });

    // Toggle the Btn
    toggleBtn?.addEventListener('click', () => {
        let state = toggleBtn.getAttribute('aria-expanded') === 'true' ? 'true' : 'false';
        state === 'true'
            ? (() => {
                  // CLOSE
                  gsap.to(navMenu, { left: '-100%', duration: 0.5 });
                  gsap.to(toggleBtn, { color: '#000', duration: 0.5 });
                  setTimeout(() => {
                      toggleBtn.innerHTML = 'open';
                  }, 50);
                  toggleBtn.setAttribute('aria-expanded', 'false');
              })()
            : (() => {
                  // OPEN
                  gsap.to(navMenu, { left: '0', duration: 0.5 });
                  gsap.to(toggleBtn, { color: '#fff', duration: 0.5, content: 'close' });
                  setTimeout(() => {
                      toggleBtn.innerHTML = 'close';
                  }, 300);
                  toggleBtn.setAttribute('aria-expanded', 'true');
              })();
    });

    const desktopSize = 1000;
    window.addEventListener('resize', () => {
        window.innerWidth > desktopSize
            ? (() => {
                  gsap.to(navMenu, { left: '-100%', duration: 0.5 });
                  gsap.to(toggleBtn, { color: '#000', duration: 0.5 });
                  setTimeout(() => {
                      toggleBtn.innerHTML = 'open';
                  }, 50);
                  toggleBtn.setAttribute('aria-expanded', 'false');
              })()
            : null;
    });
});
