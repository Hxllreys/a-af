document.addEventListener("DOMContentLoaded", function () {
    const introScreen = document.getElementById('step-intro');
    const sureScreen = document.getElementById('step-sure');
    const countdownScreen = document.getElementById('step-countdown');
    const playlistScreen = document.getElementById('step-playlist');

    const introBtn = document.getElementById('intro-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const countdownVal = document.getElementById('countdown-val');

    let yesScaleX = 1;
    let yesScaleY = 1;

    // 1. Adımdan 2. Adıma geçiş
    introBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
    });

    // Hayır butonuna basıldığında
    noBtn.addEventListener('click', () => {
        // 1. Hayır butonunu ekranda tamamen serbest yap ve en üste çıkar
        noBtn.style.position = 'fixed';
        noBtn.style.width = '110px';
        noBtn.style.height = '45px';
        noBtn.style.zIndex = '99999'; // Asla Evet'in arkasında kalmaz

        // Bütün ekranın sınırlarını kullan (En üst, en alt, sağ, sol)
        const padding = 20;
        const maxX = window.innerWidth - 130;
        const maxY = window.innerHeight - 65;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // 2. Evet butonunu her basışta yumuşakça büyüt (Yaklaşık 7-8 basışta tam ekran olur)
        yesScaleX += 0.35;
        yesScaleY += 0.30;

        yesBtn.style.transform = `scale(${yesScaleX}, ${yesScaleY})`;
    });

    // Evet butonuna basıldığında 10'dan geriye sayım başlar
    yesBtn.addEventListener('click', () => {
        sureScreen.classList.add('hidden');
        countdownScreen.classList.remove('hidden');

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
