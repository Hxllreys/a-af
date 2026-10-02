document.addEventListener("DOMContentLoaded", function () {
    const introScreen = document.getElementById('step-intro');
    const sureScreen = document.getElementById('step-sure');
    const countdownScreen = document.getElementById('step-countdown');
    const playlistScreen = document.getElementById('step-playlist');

    const introBtn = document.getElementById('intro-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const countdownVal = document.getElementById('countdown-val');

    let clickCount = 0;

    // 1. Adımdan 2. Adıma geçiş
    introBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
    });

    // Hayır butonuna basıldığında
    noBtn.addEventListener('click', () => {
        clickCount++;

        // Hayır butonunu DOM'da Body'ye taşı
        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

        noBtn.style.position = 'fixed';
        noBtn.style.zIndex = '999999';

        // 10 Tıklamada doğrudan Piksel cinsinden küçülme
        const initialWidth = 110;
        const initialHeight = 45;
        const initialFontSize = 1;

        const currentWidth = Math.max(0, initialWidth - (clickCount * 11));
        const currentHeight = Math.max(0, initialHeight - (clickCount * 4.5));
        const currentFontSize = Math.max(0, initialFontSize - (clickCount * 0.1));

        noBtn.style.width = `${currentWidth}px`;
        noBtn.style.height = `${currentHeight}px`;
        noBtn.style.fontSize = `${currentFontSize}rem`;
        noBtn.style.padding = '0';

        // 10 veya daha fazla tıklamada tamamen kaldır
        if (clickCount >= 10 || currentWidth <= 0) {
            noBtn.style.display = 'none';
        }

        // Tam Ekran Rastgele Konum
        const randomX = Math.floor(Math.random() * 70) + 10;
        const randomY = Math.floor(Math.random() * 80) + 5;

        noBtn.style.left = `${randomX}vw`;
        noBtn.style.top = `${randomY}vh`;

        // Evet Butonunu dikey ve yatay büyüt
        const newWidth = 120 + (clickCount * 40);
        const newHeight = 45 + (clickCount * 25);
        const newFontSize = 1 + (clickCount * 0.15);

        yesBtn.style.width = `${newWidth}px`;
        yesBtn.style.height = `${newHeight}px`;
        yesBtn.style.fontSize = `${newFontSize}rem`;
    });

    // Evet butonuna basıldığında 10'dan geriye sayım başlar
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
                playlistScreen.classList.remove('hidden');
            }
        }, 1000);
    });
});
