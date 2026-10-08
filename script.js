document.addEventListener("DOMContentLoaded", function () {
    const parseEmojis = () => {
        if (typeof twemoji !== 'undefined') {
            twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
        }
    };

    parseEmojis();

    const introScreen = document.getElementById('step-intro');
    const sureScreen = document.getElementById('step-sure');
    const countdownScreen = document.getElementById('step-countdown');
    const giftScreen = document.getElementById('step-gift');
    const playlistScreen = document.getElementById('step-playlist');

    const sureTitle = document.getElementById('sure-title');
    const introBtn = document.getElementById('intro-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const giftBox = document.getElementById('gift-box');
    const countdownVal = document.getElementById('countdown-val');
    const bgMusic = document.getElementById('bg-music');

    let clickCount = 0;

    // Hayır'a basıldığında değişecek ikna cümleleri
    const messages = [
        "Emin misin? 🥺",
        "Beni kırma lütfen... 💔",
        "Hayır'a basmak istemediğini biliyorum! 😉",
        "Hadi ama, Evet'e bas artık! ✨",
        "Kaçamazsın! 😜",
        "Son şansın, Evet'e tıkla! ❤️"
    ];

    introBtn.addEventListener('click', () => {
        if (bgMusic) {
            bgMusic.muted = false;
            let playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Müzik başarıyla başlatıldı!");
                }).catch(error => {
                    console.log("Müzik engeli:", error);
                });
            }
        }

        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
        parseEmojis();
    });

    noBtn.addEventListener('click', () => {
        clickCount++;

        // Başlığı sıra sıra ikna cümleleriyle güncelle
        const messageIndex = Math.min(clickCount - 1, messages.length - 1);
        sureTitle.innerText = messages[messageIndex];

        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

        noBtn.style.position = 'fixed';
        noBtn.style.zIndex = '999999';
        noBtn.style.transformOrigin = 'center center';

        const currentScale = Math.max(0, 1 - (clickCount * 0.10));
        noBtn.style.transform = `scale(${currentScale})`;

        if (clickCount >= 10 || currentScale <= 0) {
            noBtn.style.display = 'none';
        }

        const randomX = Math.floor(Math.random() * 70) + 10;
        const randomY = Math.floor(Math.random() * 80) + 5;

        noBtn.style.left = `${randomX}vw`;
        noBtn.style.top = `${randomY}vh`;

        const newWidth = 120 + (clickCount * 30);
        const newHeight = 45 + (clickCount * 20);
        const newFontSize = 1 + (clickCount * 0.12);

        yesBtn.style.width = `${newWidth}px`;
        yesBtn.style.height = `${newHeight}px`;
        yesBtn.style.fontSize = `${newFontSize}rem`;

        parseEmojis();
    });

    yesBtn.addEventListener('click', () => {
        sureScreen.classList.add('hidden');
        countdownScreen.classList.remove('hidden');
        noBtn.style.display = 'none';

        let count = 10;
        countdownVal.innerText = count;

        let timer = setInterval(() => {
            count--;
            countdownVal.innerText = count;

            if (count <= 0) {
                clearInterval(timer);
                countdownScreen.classList.add('hidden');
                giftScreen.classList.remove('hidden');
                parseEmojis();
            }
        }, 1000);
    });

    giftBox.addEventListener('click', () => {
        giftBox.classList.add('opening-effect');
        setTimeout(() => {
            giftScreen.classList.add('hidden');
            playlistScreen.classList.remove('hidden');
            parseEmojis();
        }, 750);
    });
});
