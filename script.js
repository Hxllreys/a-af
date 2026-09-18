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

    // Mobil ve masaüstü kaydırma olayları
    slider.addEventListener('input', updateSliderValue);
    slider.addEventListener('change', updateSliderValue);
    slider.addEventListener('touchmove', updateSliderValue);
    
    updateSliderValue();

    // Buton ve kutu yönlendirmeleri
    nextBtn.addEventListener('click', function () {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('step-2').classList.remove('hidden');
    });

    document.getElementById('box-1').addEventListener('click', () => openBox('note-box'));
    document.getElementById('box-2').addEventListener('click', () => openBox('music-box'));
    document.getElementById('box-3').addEventListener('click', () => openBox('video-box'));

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', backToGifts);
    });
});

function openBox(boxId) {
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById(boxId).classList.remove('hidden');

    if (boxId === 'note-box') {
        startHeartAnimation();
    } else if (boxId === 'video-box') {
        document.body.classList.add('pink-theme');
        startEcgHeart();
    }
}

function backToGifts() {
    document.body.classList.remove('pink-theme');
    document.getElementById('note-box').classList.add('hidden');
    document.getElementById('music-box').classList.add('hidden');
    document.getElementById('video-box').classList.add('hidden');
    document.getElementById('step-2').classList.remove('hidden');

    const wrapper = document.getElementById('heart-anim-wrapper');
    wrapper.classList.remove('hidden');
    wrapper.style.opacity = '1';
    document.getElementById('journal-wrapper').classList.add('hidden');
}

function startHeartAnimation() {
    const wrapper = document.getElementById('heart-anim-wrapper');
    const journal = document.getElementById('journal-wrapper');
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    wrapper.classList.remove('hidden');
    wrapper.style.opacity = '1';
    journal.classList.add('hidden');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffb6c1";
    ctx.font = "bold 6.5px Arial";
    ctx.textAlign = "center";

    let scaleIndex = 11;
    let iIndex = 0;

    function drawStep() {
        if (scaleIndex < 17) {
            let angle = iIndex * (Math.PI * 2) / 120;
            let scaleFactor = scaleIndex * 7.5;
            let x = 16 * Math.pow(Math.sin(angle), 3) * (scaleFactor / 16);
            let y = (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * (scaleFactor / 16);

            let canvasX = (canvas.width / 2) + x;
            let canvasY = (canvas.height / 2) - y + 10;

            ctx.fillText("I love you", canvasX, canvasY);

            iIndex++;
            if (iIndex >= 120) {
                iIndex = 0;
                scaleIndex++;
            }
            requestAnimationFrame(drawStep);
        } else {
            setTimeout(() => {
                wrapper.style.opacity = '0';
                setTimeout(() => {
                    wrapper.classList.add('hidden');
                    journal.classList.remove('hidden');
                }, 800);
            }, 1200);
        }
    }
    drawStep();
}

let ecgAnimationId;
function startEcgHeart() {
    const canvas = document.getElementById('ecgCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    cancelAnimationFrame(ecgAnimationId);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.translate(W / 2, H / 2 - 10);

        ctx.strokeStyle = '#f43f5e';
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 3;

        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.05) {
            let scale = 6.5;
            let x = 16 * Math.pow(Math.sin(a), 3) * scale;
            let y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * scale;
            if (a === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('YOU & ME', 0, -5);

        ctx.fillStyle = '#fda4af';
        ctx.font = '9px Arial';
        ctx.fillText('WRITTEN IN THE STARS', 0, 15);

        ctx.restore();

        ecgAnimationId = requestAnimationFrame(draw);
    }
    draw();
}
