const fileInput = document.getElementById('fileInput');
const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const coverImg = document.getElementById('coverImg');
const trackTitle = document.getElementById('trackTitle');
const currentEl = document.getElementById('current');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const timeline = document.getElementById('timeline');

let playlist = [], currentIndex = 0;

fileInput.addEventListener('change', () => {
  playlist = Array.from(fileInput.files);
  if (playlist.length) {
    currentIndex = 0; loadTrack();
    document.querySelector('.player').style.display='block';
  }
});

function loadTrack() {
  const file = playlist[currentIndex];
  const url = URL.createObjectURL(file);
  audio.src = url;
  trackTitle.textContent = file.name.replace(/\.(mp3|wav|ogg)$/i, '');
  coverImg.src = ""; coverImg.style.display = 'none';
  audio.load();
}

playPause.addEventListener('click', () => {
  if(audio.paused) { audio.play(); playPause.textContent='⏸'; }
  else { audio.pause(); playPause.textContent='▶️'; }
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = format(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentEl.textContent = format(audio.currentTime);
  progress.style.width = (audio.currentTime/audio.duration)*100 + '%';
});

timeline.addEventListener('click', e => {
  audio.currentTime = (e.offsetX/timeline.clientWidth)*audio.duration;
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(); audio.play(); playPause.textContent='⏸';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(); audio.play(); playPause.textContent='⏸';
});

audio.addEventListener('ended', () => nextBtn.click());

function format(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
