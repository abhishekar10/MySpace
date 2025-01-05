addFolderButton = document.querySelector(".upload-music p");
initialState = document.querySelector(".upload-music");
const player = document.querySelector(".player");
const musicList = document.getElementById("music-list");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
let audio = new Audio();
let isPlaying = false;
let currentTrackIndex = 0;
let tracks = [];

addFolderButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.webkitdirectory = true;
    input.multiple = true;
    input.accept = "audio/*";

    input.addEventListener("change", (event) => {
        const files = Array.from(event.target.files);
        tracks = files.filter((file) => file.type.startsWith("audio/"));
        if (tracks.length > 0) {
            loadTracks(tracks);
            initialState.classList.add("hide-element");
            player.classList.remove("hide-element");
        }
    });

    input.click();
});

function loadTracks(tracks) {
    musicList.innerHTML = "";
    tracks.forEach((track, index) => {
        const listItem = document.createElement("li");
        let trackName = track.name;
        listItem.textContent = trackName.substring(0,trackName.length - 4);
        listItem.addEventListener("click", () => playTrack(index,tracks.length));
        musicList.appendChild(listItem);
    });
    playTrack(0,tracks.length);
}

function playTrack(index, trackLength) {
    const track = tracks[index];
    if (!track) return;

    currentTrackIndex = index;
    const objectURL = URL.createObjectURL(track);
    audio.src = objectURL;
    audio.load();
    audio.play();
    playPauseBtn.textContent = "Pause";
    isPlaying = true;

    audio.addEventListener("loadedmetadata", () => {
        durationEl.textContent = formatTime(audio.duration);
        progressBar.max = Math.floor(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        progressBar.value = Math.floor(audio.currentTime);
        currentTimeEl.textContent = formatTime(audio.currentTime);
        if(audio.currentTime === audio.duration) {
            if( currentTrackIndex + 1 === trackLength) {
                playTrack(0);
            } else playTrack(currentTrackIndex + 1);
        }
    });
}

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        audio.play();
        playPauseBtn.textContent = `<i class="fa-solid fa-pause"></i>`;
    }
    isPlaying = !isPlaying;
});


progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}