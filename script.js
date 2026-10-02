document.addEventListener("DOMContentLoaded", function () {
    const introScreen = document.getElementById('step-intro');
    const sureScreen = document.getElementById('step-sure');
    const countdownScreen = document.getElementById('step-countdown');
    const giftScreen = document.getElementById('step-gift');
    const playlistScreen = document.getElementById('step-playlist');

    const introBtn = document.getElementById('intro-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const giftBox = document.getElementById('gift-box');
    const countdownVal = document.getElementById('countdown-val');

    let clickCount = 0;

    introBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
    });

    noBtn.addEventListener('click', () => {
        clickCount++;

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

        const newWidth = 120 + (clickCount * 40);
        const newHeight = 45 + (clickCount * 25);
        const newFontSize = 1 + (clickCount * 0.15);

        yesBtn.style.width = `${newWidth}px`;
        yesBtn.style.height = `${newHeight}px`;
        yesBtn.style.fontSize = `${newFontSize}rem`;
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
                giftScreen.classList.remove('hidden'); // Geri sayım bittiğinde 3D hediye kutusu ekranını gösterir
            }
        }, 1000);
    });

    // Hediye kutusuna tıklama
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');
        setTimeout(() => {
            giftScreen.classList.add('hidden');
            playlistScreen.classList.remove('hidden'); // Kapak açıldıktan sonra playlist ekranına geçer
        }, 800);
    });
});
