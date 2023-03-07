const progressContainer = document.querySelector(".progress-container");
const progress = Array.from(document.querySelectorAll(".progress"));
const imgStory = document.querySelector(".img-story");
const progressBar = document.querySelector(".progress");
const progressBarContainer = document.querySelector(".progress-container");
const status = document.querySelector(".status");
let intervalId = null;

const images = [
  { src: "./assets/img/01.jpg", duration: 2000 },
  { src: "./assets/img/02.jpg", duration: 5000 },
  { src: "./assets/img/03.jpg", duration: 3000 },
  { src: "./assets/img/04.jpg", duration: 3000 },
  { src: "./assets/img/05.jpg", duration: 3000 },
  { src: "./assets/img/06.jpg", duration: 3000 },
  { src: "./assets/img/07.jpg", duration: 3000 },
];

let currentImageIndex = 0;
let currentDuration = images[currentImageIndex].duration;

const playNext = (e) => {
  const current = e && e.target;
  let next;
  if (current) {
    const currentIndex = progress.indexOf(current);
    current.classList.remove("active");
    current.classList.add("passed");
    if (currentIndex < progress.length) {
      next = progress[currentIndex + 1];
      for (let i = 0; i < currentIndex; i++) {
        progress[i].classList.add("passed");
      }
    }
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    currentDuration = images[currentImageIndex].duration;
    imgStory.src = images[currentImageIndex].src;
  }
  if (!next) {
    progress.map((el) => {
      el.classList.remove("active");
      el.classList.remove("passed");
    });
    currentImageIndex = 0;
    currentDuration = images[currentImageIndex].duration;
    imgStory.src = images[currentImageIndex].src;
    next = progress[0];
  }
  next.classList.add("active");
  next.style.animationDuration = `${currentDuration / 1000}s`;
};

const clickHandler = (e) => {
  const index = Math.floor(
    e.offsetX / (progressContainer.clientWidth / progress.length)
  );
};

progress.map((el) => el.addEventListener("animationend", playNext, false));
progressContainer.addEventListener("click", clickHandler, false);

playNext();

const prevImage = () => {
  const current = progress.find((el) => el.classList.contains("active"));
  const currentIndex = progress.indexOf(current);
  console.log(currentIndex);
  if (currentIndex !== 0) {
    const current = progress.find((el) => el.classList.contains("active"));
    let prev;
    if (current) {
      const currentIndex = progress.indexOf(current);
      if (currentIndex > 0) {
        prev = progress[currentIndex - 1];
      }
      current.classList.remove("active");
      current.classList.remove("passed");
      currentImageIndex--;
      if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
      }
      currentDuration = images[currentImageIndex].duration;
      imgStory.src = images[currentImageIndex].src;
    }
    if (!prev) {
      progress.map((el) => {
        el.classList.remove("active");
      });
      currentImageIndex = images.length - 1;
      currentDuration = images[currentImageIndex].duration;
      imgStory.src = images[currentImageIndex].src;
      prev = progress[progress.length - 1];
    }
    prev.classList.add("active");
    prev.style.animationDuration = `${currentDuration / 1000}s`;
  }
};

const nextImage = () => {
  const current = progress.find((el) => el.classList.contains("active"));
  const currentIndex = progress.indexOf(current);
  if (currentIndex !== progress.length - 1) {
    const next = progress[currentIndex + 1];
    current.classList.remove("active");
    current.classList.add("passed");
    for (let i = 0; i < currentIndex; i++) {
      progress[i].classList.add("passed");
    }
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    currentDuration = images[currentImageIndex].duration;
    imgStory.src = images[currentImageIndex].src;
    next.classList.add("active");
    next.style.animationDuration = `${currentDuration / 1000}s`;
  } else {
    const first = progress[0];
    progress.map((el) => {
      el.classList.remove("active");
      el.classList.remove("passed");
    });
    currentImageIndex = 0;
    currentDuration = images[currentImageIndex].duration;
    imgStory.src = images[currentImageIndex].src;
    first.classList.add("active");
    first.style.animationDuration = `${currentDuration / 1000}s`;
  }
};
