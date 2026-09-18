document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('miss-slider');
    const percentVal = document.getElementById('percent-val');
    const statusText = document.getElementById('status-text');
    const nextBtn = document.getElementById('next-btn');

    const messages = [
        { limit: 10, text: "Hiç hatrım yok mu?" },
        { limit: 39, text: "Hiç sevmedin mi?" },
        { limit: 70, text: "Fena değil eski günler hatrına kalsın" },
        { limit: 100, text: "Bende seni özledim♥️" }
    ];

    function updateSliderValue() {
        const val = parseInt(slider.value, 10) || 0;
        percentVal.innerText = '%' + val;

        for (let m of messages) {
            if (val <= m.limit) {
                statusText.innerText = m.text;
                break;
            }
        }

        nextBtn.disabled = (val !== 100);
    }

    slider.addEventListener('input', updateSliderValue);
    slider.addEventListener('change', updateSliderValue);
    slider.addEventListener('touchmove', updateSliderValue);
    
    updateSliderValue();

    nextBtn.addEventListener('click', function () {
        document.getElementById('step-1').classList.add('hidden');
        runHeartAnimation(() => {
            document.getElementById('step-2').classList.remove('hidden');
        });
    });

    document.getElementById('box-1').addEventListener('click', () => triggerBoxOpen('note-box'));
    document.getElementById('box-2').addEventListener('click', () => triggerBoxOpen('music-box'));
    document.getElementById('box-3').addEventListener('click', () => triggerBoxOpen('video-box'));

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', backToGifts);
    });
});

function triggerBoxOpen(boxId) {
    document.getElementById('step-2').classList.add('hidden');
    runHeartAnimation(() => {
        openBox(boxId);
    });
}

function openBox(boxId) {
    document.getElementById(boxId).classList.remove('hidden');
    if (boxId === 'video-box') {
        document.body.classList.add('pink-theme');
    }
}

function backToGifts() {
    document.body.classList.remove('pink-theme');
    document.getElementById('note-box').classList.add('hidden');
    document.getElementById('music-box').classList.add('hidden');
    document.getElementById('video-box').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');
}

// Python/Turtle Mantığında Hızlı Matematiksel Kalp Çizim Fonksiyonu
function runHeartAnimation(onComplete) {
    const loaderOverlay = document.getElementById('heart-loader');
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');

    loaderOverlay.classList.remove('hidden');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let t = 0;
    const totalSteps = 150; // Hızlı ve akıcı çizim için step sayısı
    const scale = 7;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 10;

    let points = [];

    // Parametrik Kalp Denklemi: x = 16*sin^3(t), y = 13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t)
    for (let i = 0; i <= totalSteps; i++) {
        let stepT = (i / totalSteps) * Math.PI * 2;
        let x = 16 * Math.pow(Math.sin(stepT), 3);
        let y = -(13 * Math.cos(stepT) - 5 * Math.cos(2 * stepT) - 2 * Math.cos(3 * stepT) - Math.cos(4 * stepT));
        points.push({
            x: cx + x * scale,
            y: cy + y * scale
        });
    }

    let currentStep = 0;

    function animate() {
        if (currentStep < points.length) {
            ctx.beginPath();
            ctx.strokeStyle = '#f43f5e';
            ctx.lineWidth = 3.5;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#f43f5e';
            ctx.lineCap = 'round';

            if (currentStep === 0) {
                ctx.moveTo(points[0].x, points[0].y);
            } else {
                ctx.moveTo(points[currentStep - 1].x, points[currentStep - 1].y);
                ctx.lineTo(points[currentStep].x, points[currentStep].y);
            }
            ctx.stroke();

            currentStep++;
            let progress = Math.floor((currentStep / points.length) * 100);
            loadingBar.style.width = progress + '%';
            loadingText.innerText = 'Yükleniyor %' + progress;

            // Hızlı animasyon süresi (her karede 2 adım çizer)
            setTimeout(animate, 6);
        } else {
            setTimeout(() => {
                loaderOverlay.classList.add('hidden');
                if (onComplete) onComplete();
            }, 200);
        }
    }

    animate();
}
