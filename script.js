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

        // 1. Hayır butonunu DOM'da doğrudan BODY'ye taşı ki kart kısıtlamasından çıksın
        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

        noBtn.style.position = 'fixed';
        noBtn.style.width = '100px';
        noBtn.style.height = '42px';
        noBtn.style.zIndex = '999999';

        // Tüm ekranı kapsayan rastgele koordinat (mavi alanlar dahil)
        const margin = 20;
        const maxX = window.innerWidth - noBtn.offsetWidth - margin;
        const maxY = window.innerHeight - noBtn.offsetHeight - margin;

        const randomX = Math.floor(Math.random() * (maxX - margin)) + margin;
        const randomY = Math.floor(Math.random() * (maxY - margin)) + margin;

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // 2. Evet butonunu hem EN hem BOY olarak (piksel olarak) dikey ve yatay büyüt
        // Yaklaşık 7-8 tıklamada ekranı kaplar
        const addedWidth = clickCount * 45;
        const addedHeight = clickCount * 25;
        const addedFontSize = clickCount * 2;

        yesBtn.style.width = `calc(100% + ${addedWidth}px)`;
        yesBtn.style.paddingTop = `${14 + addedHeight}px`;
        yesBtn.style.paddingBottom = `${14 + addedHeight}px`;
        yesBtn.style.fontSize = `${1 + addedFontSize * 0.05}rem`;
    });

    // Evet butonuna basıldığında 10'dan geriye sayım başlar
    yesBtn.addEventListener('click', () => {
        sureScreen.classList.add('hidden');
        countdownScreen.classList.remove('hidden');

        // Hayır butonu body'ye taşındıysa gizleyelim
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
