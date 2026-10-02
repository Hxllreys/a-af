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

    let yesWidth = choiceArea.clientWidth / 2 - 10;
    let yesHeight = 50;

    // 1. Adımdan 2. Adıma geçiş
    introBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        sureScreen.classList.remove('hidden');
    });

    // Hayır butonuna basıldığında
    noBtn.addEventListener('click', () => {
        // 1. Hayır butonunu ilk tıklamada absolute yap ki flex düzeninden çıksın (sıkışmasın)
        if (noBtn.style.position !== 'fixed') {
            noBtn.style.position = 'fixed';
        }

        // Hayır butonunu ekranın rastgele bir yerine fırlat (boyutu hiç değişmez)
        const padding = 20;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        Ağzına sağlık kiral, videoda durum net bir şekilde görünüyor. 

Sorunun mantığı şu: "Evet" butonu esnek bir kapsayıcı (`flex`) içinde durduğu için dikeyde genişleyemiyor, sadece yatayda uzuyor. "Hayır" butonunun küçülme sebebi ise "Evet" büyüdükçe yanındaki alanı sıkıştırması.

Aşağıdaki güncellemeyle "Hayır" butonunu tıklanıldığı an tamamen serbest pozisyona alıp boyutunu sabitliyoruz. "Evet" butonunun da `scale` mantığını değiştirip hem enine hem boyuna ekranı tamamen kaplayacak şekilde büyümesini sağlıyoruz.

---

### 1. `script.js`

```javascript
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
        // 1. Hayır butonunu ilk tıklamada serbest pozisyona al ve sabit boyutta tut
        noBtn.style.position = 'fixed';
        noBtn.style.width = '110px';
        noBtn.style.height = '45px';
        noBtn.style.zIndex = '999';

        // Ekran sınırları içinde (sağ, sol, yukarı, aşağı) rastgele konumlandır
        const padding = 20;
        const maxX = window.innerWidth - 130;
        const maxY = window.innerHeight - 60;

        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // 2. Evet butonunu hem EN hem BOY olarak dengeli büyüt
        yesScaleX += 0.6;
        yesScaleY += 0.5;

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
