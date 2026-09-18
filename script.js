document.addEventListener("DOMContentLoaded", function () {
    const introScreen = document.getElementById('step-intro');
    const sureScreen = document.getElementById('step-sure');
    const countdownScreen = document.getElementById('step-countdown');
    const playlistScreen = document.getElementById('step-playlist');

    const introBtn = document.getElementById('intro-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const countdownVal = document.getElementById('countdown-val');

    let yesScale = 1;
    let noScale = 1;

    // 1. Adımdan "Emin misin?" adımına geçiş
    introBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
    });

    // Hayır butonuna basıldıkça Evet büyür, Hayır küçülür/gider
    noBtn.addEventListener('click', () => {
        yesScale += 0.2;
        noScale -= 0.15;
        
        yesBtn.style.transform = `scale(${yesScale})`;
        
        if (noScale > 0.2) {
            noBtn.style.transform = `scale(${noScale})`;
        } else {
            noBtn.style.display = 'none'; // Hayır tamamen yok olur
        }
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
