document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Intersection Observer for Scroll Reveals
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 2. Background Music & Start Overlay
    // ==========================================
    const bgMusic = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-control");
    const startOverlay = document.getElementById("start-overlay");
    const startBtn = document.getElementById("start-btn");
    let isPlaying = false;

    startBtn.addEventListener("click", () => {
        bgMusic.play().then(() => {
            musicBtn.classList.add("playing");
            isPlaying = true;
        }).catch(e => {
            console.log("حدث خطأ في تشغيل الصوت:", e);
        });
        startOverlay.classList.add("hidden");
    });

    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove("playing");
        } else {
            bgMusic.play();
            musicBtn.classList.add("playing");
        }
        isPlaying = !isPlaying;
    });

    // ==========================================
    // 3. Image Parallax Effect
    // ==========================================
    const parallaxImage = document.querySelector(".parallax-img");
    const imageWrapper = document.querySelector(".image-wrapper");
    
    if (parallaxImage && imageWrapper) {
        window.addEventListener("scroll", () => {
            requestAnimationFrame(() => {
                const rect = imageWrapper.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                    const rate = offset * 0.12; 
                    parallaxImage.style.transform = `scale(1.15) translate3d(0, ${rate}px, 0)`;
                }
            });
        });
    }

    // ==========================================
    // 4. Playful "NO" Button Interaction
    // ==========================================
    const noBtn = document.getElementById("no-btn");
    const toastContainer = document.getElementById("toast-container");
    
    const messages = [
        "طب جربي تاني 😂",
        "انتي متأكدة؟",
        "لسه؟ 😂",
        "طيب اقعدي معايا الاول 😭",
        "خلاص اخر محاولة 😂"
    ];
    let msgIndex = 0;

    const moveButton = () => {
        noBtn.style.position = "fixed";
        
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        const padding = 20;
        const maxX = window.innerWidth - btnWidth - padding;
        const maxY = window.innerHeight - btnHeight - padding;
        
        const randomX = Math.max(padding, Math.random() * maxX);
        const randomY = Math.max(padding, Math.random() * maxY);

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.right = "auto"; 
        noBtn.style.bottom = "auto";
        noBtn.style.transform = "none";
        
        if (msgIndex < messages.length) {
            showToast(messages[msgIndex], randomX, randomY - 40);
            msgIndex++;
        }
    };

    const showToast = (text, x, y) => {
        const toast = document.createElement("div");
        toast.classList.add("toast-msg");
        toast.innerText = text;
        
        toast.style.left = `${x}px`;
        toast.style.top = `${Math.max(10, y)}px`;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    };

    noBtn.addEventListener("mouseover", moveButton);
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveButton();
    });

    // ==========================================
    // 5. Celebration "YES" Button Interaction
    // ==========================================
    const yesBtn = document.getElementById("yes-btn");
    const celebScreen = document.getElementById("celebration-screen");

    yesBtn.addEventListener("click", () => {
        celebScreen.classList.add("active");
        createParticles();
        
        if (isPlaying) {
            let vol = 1;
            const fadeOut = setInterval(() => {
                if (vol > 0.3) {
                    vol -= 0.1;
                    bgMusic.volume = vol;
                } else {
                    clearInterval(fadeOut);
                }
            }, 200);
        }
    });

    // النقط الجديدة التي تطير لأعلى
    const createParticles = () => {
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement("div");
            particle.style.position = "absolute";
            particle.style.width = Math.random() * 8 + 4 + "px";
            particle.style.height = particle.style.width;
            particle.style.background = "var(--accent-soft)";
            particle.style.borderRadius = "50%";
            particle.style.opacity = "0";
            particle.style.left = Math.random() * 100 + "vw";
            particle.style.top = (Math.random() * 100 + 20) + "vh"; // تبدأ من الأسفل
            particle.style.zIndex = "-1";
            particle.style.animation = `floatUp ${Math.random() * 4 + 3}s infinite ease-in`;
            celebScreen.appendChild(particle);
        }
    };

    // ==========================================
    // 6. Return Button Interaction
    // ==========================================
    const returnBtn = document.getElementById("return-btn");

    returnBtn.addEventListener("click", () => {
        celebScreen.classList.remove("active");
        
        if (isPlaying) {
            let vol = bgMusic.volume;
            const fadeIn = setInterval(() => {
                if (vol < 1) {
                    vol += 0.1;
                    bgMusic.volume = Math.min(vol, 1); 
                } else {
                    clearInterval(fadeIn);
                }
            }, 200);
        }
    });

    // ==========================================
    // 7. Custom Cinematic Cursor
    // ==========================================
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorOutline) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const interactables = document.querySelectorAll("button, .card");
        interactables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("hovering");
            });
            el.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("hovering");
            });
        });
    }

});
