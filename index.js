const volume = document.querySelector('.volume');
const article2 = document.querySelector('#article2');
const audioPlayer1 = document.querySelector('#audio1');
const audioPlayer2 = document.querySelector('#audio3');

const volumeClicked = () => {
    if (!audioPlayer1.paused) {
        audioPlayer1.pause();
        volume.classList.remove('playing');
        return;
    }

    if (!audioPlayer2.paused) {
        audioPlayer2.pause();
        audioPlayer2.currentTime = 0;
    }
    
    audioPlayer1.addEventListener('ended', () => {
        volume.classList.remove('playing');
    });
    audioPlayer1.play();
    volume.classList.add('playing');
}

volume.addEventListener('click', volumeClicked);

const isInViewport = element => {
    const rect = element.getBoundingClientRect();
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return rect.top + 30 <  screenHeight;
}

document.addEventListener('scroll', () => {
    if (isInViewport(article2) && audioPlayer2.paused) {
        audioPlayer2.play();
        if (!audioPlayer1.paused) {
            audioPlayer1.pause();
            volume.classList.remove('playing');
        }
        if (audioPlayer1.currentTime !== 0) {
            audioPlayer1.currentTime = 0;
        }
    }
    if (!isInViewport(article2) && !audioPlayer2.paused) {
        audioPlayer2.pause();
        audioPlayer2.currentTime = 0;
          
    }
}, {
    passive: true
});