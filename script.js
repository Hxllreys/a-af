const slider = document.getElementById("myRange");
const output = document.getElementById("demo");
const sliderText = document.getElementById("sliderText");
const heartCard = document.getElementById("heartCard");
const contentBoxes = document.getElementById("contentBoxes");
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
const progressBar = document.getElementById("progressBar");
const loadingText = document.getElementById("loadingText");

slider.oninput = function() {
    output.innerHTML = this.value;
    
    if (this.value == 100) {
        sliderText.innerHTML = "Harika! Sürpriz Yükleniyor... ❤️";
        slider.disabled = true;
        startHeartAnimation();
    }
};

function startHeartAnimation() {
    heartCard.style.display = "block";
    let progress = 0;
    let t = 0;

    ctx.translate(150, 150);
    ctx.strokeStyle = "#ff4081";
    ctx.lineWidth = 2;

    const interval = setInterval(() => {
        progress += 2;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + "%";
        loadingText.innerHTML = "%" + progress + " Yükleniyor...";

        if (t <= Math.PI * 2) {
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            ctx.lineTo(x * 6, y * 6);
            ctx.stroke();
            t += 0.05;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                heartCard.style.display = "none";
                contentBoxes.style.display = "block";
            }, 500);
        }
    }, 50);
}

function togglePlay() {
    const audio = document.getElementById('audioPlayer');
    const vinyl = document.getElementById('vinyl');
    
    if (audio.paused) {
        audio.play();
        vinyl.classList.add('spinning');
    } else {
        audio.pause();
        vinyl.classList.remove('spinning');
    }
}
