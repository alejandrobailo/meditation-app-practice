const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');
    const sounds = document.querySelectorAll('.sound-section button');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-section button');
    // Length of the outline const declared before:
    const outlineLength = outline.getTotalLength();
    // Duration (10min = 600sec)
    let duration = 600;

    // Outline SVG style:
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Select sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', () => {
            song.src = sound.getAttribute('data-sound');
            video.src = sound.getAttribute('data-video');
            handlePlaying(song);
        })
    })

    // Play sound start
    play.addEventListener('click', () => handlePlaying(song));

    // Choose sound time:
    timeSelect.forEach(item => {
        item.addEventListener(('click'), () => {
            duration = item.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
        })
    })

    const handlePlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };


    // Animation circle:
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate text time: 
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };

};

app();