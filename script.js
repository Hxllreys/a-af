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

    if (slider) {
        slider.addEventListener('input', updateSliderValue);
        slider.addEventListener('change', updateSliderValue);
        slider.addEventListener('touchmove', updateSliderValue);
        updateSliderValue();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            document.getElementById('step-1').classList.add('hidden');
            runHeartAnimation(() => {
                document.getElementById('step-2').classList.remove('hidden');
            });
        });
    }

    // Kutuların tıklama dinleyicileri
    const box1 = document.getElementById('box-1');
    const box2 = document.getElementById('box-2');
    const box3 = document.getElementById('box-3');

    if (box1) box1.addEventListener('click', () => triggerBoxOpen('note-box'));
    if (box2) box2.addEventListener('click', () => triggerBoxOpen('music-box'));
    if (box3) box3.addEventListener('click', () => triggerBoxOpen('video-box'));

    // Geri Dön butonları
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', backToGifts);
    });

    // Video kart destesi mantığı
    const cards = document.querySelectorAll('.stack-card');
    const nextCardBtn = document.getElementById('nextCardBtn');
    let currentCardIndex = 0;

    function updateStack() {
        cards.forEach((card, idx) => {
            const video = card.querySelector('video');
            if (video && idx !== currentCardIndex) {
                video.pause();
            }

            if (idx === currentCardIndex) {
                card.className = 'stack-card active';
            } else {
                card.className = 'stack-card';
            }
        });
    }

    if (nextCardBtn) {
        nextCardBtn.addEventListener('click', () => {
            currentCardIndex = (currentCardIndex + 1) % cards.length;
            updateStack();
        });
    }
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
    
    document.querySelectorAll('video').forEach(v => v.pause());
}

/* YÜKLEME BARLI HIZLI KALP ANİMASYONU */
function runHeartAnimation(onComplete) {
    const wrapper = document.getElementById('heart-anim-wrapper');
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');

    wrapper.classList.remove('hidden');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let totalSteps = 140;
    let scale = 7.5;
    let cx = canvas.width / 2;
    let cy = canvas.height / 2 - 10;
    let points = [];

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

            setTimeout(animate, 6);
        } else {
            setTimeout(() => {
                wrapper.classList.add('hidden');
                if (onComplete) onComplete();
            }, 200);
        }
    }

    animate();
}
