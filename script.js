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
