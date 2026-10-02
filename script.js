document.addEventListener("DOMContentLoaded", function () {
    const introScreen = document.getElementById('step-intro');
    const sureScreen = document.getElementById('step-sure');
    const countdownScreen = document.getElementById('step-countdown');
    const playlistScreen = document.getElementById('step-playlist');

    const introBtn = document.getElementById('intro-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const countdownVal = document.getElementById('countdown-val');
    const choiceArea = document.getElementById('choice-area');

    let yesScale = 1;

    // 1. Adımdan 2. Adıma geçiş
    introBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
    });

    // Hayır butonuna basıldığında: Hayır Asla KÜÇÜLMEZ, sadece yer değiştirir.
    // Evet butonu her seferinde daha fazla büyür.
    noBtn.addEventListener('click', () => {
        // Evet butonunu büyük oranda büyüt
        yesScale += 0.55;
        yesBtn.style.transform = `scale(${yesScale})`;
        yesBtn.style.zIndex = "10"; // Büyüdükçe ön plana çıksın

        // Hayır butonunun boyutunu sabitle (küçülmesini engelle)
        noBtn.style.transform = "scale(1)";
        noBtn.style.position = 'absolute';
        
        // Kart içinde rastgele yeni konum belirle
        const maxX = choiceArea.clientWidth - noBtn.clientWidth;
        const maxY = choiceArea.clientHeight - noBtn.clientHeight;

        const randomX = Math.floor(Math.random() * Math.max(maxX, 100)) - 20;
        const randomY = Math.floor(Math.random() * Math.max(maxY, 80)) - 20;

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
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
