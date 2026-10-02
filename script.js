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
        noBtn.style.width = '110px';
        noBtn.style.height = '45px';
        noBtn.style.zIndex = '999999';

        // 10 tıklamada aşamalı olarak küçülüp kaybolma mantığı
        const newScale = Math.max(0, 1 - (clickCount * 0.10));
        noBtn.style.transform = `scale(${newScale})`;

        if (clickCount >= 10) {
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

        // Body'ye taşınan Hayır butonunu gizle
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
