const progressContainer = document.querySelector(".progress-container");
const progress = Array.from(document.querySelectorAll(".progress"));
const imgStory = document.querySelector(".img-story");
const progressBar = document.querySelector(".progress");
const progressBarContainer = document.querySelector(".progress-container");
const status = document.querySelector(".status");
const buttonInfo = document.querySelector(".button-info");
let intervalId = null;
let currentImageIndex = 0;
let isPaused = false;

const images = [
  { type: "image", src: "./assets/img/01.jpg", duration: 2000, info: 0 },
  { type: "image", src: "./assets/img/02.jpg", duration: 2000, info: 1 },
  { type: "image", src: "./assets/img/03.jpg", duration: 2000, info: 0 },
];

let currentDuration = images[currentImageIndex].duration;
function checkImageInfo() {
  if (images[currentImageIndex].info === 1) {
    buttonInfo.style.display = "flex";
  } else {
    buttonInfo.style.display = "none";
  }
}

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
    const currentImage = images[currentImageIndex];
    currentDuration = currentImage.duration;
    if (currentImage.type === "image") {
      imgStory.style.display = "block";
      imgStory.src = currentImage.src;
    }
  }
  if (!next) {
    progress.map((el) => {
      el.classList.remove("active");
      el.classList.remove("passed");
    });
    currentImageIndex = 0;
    currentDuration = images[currentImageIndex].duration;
    const currentImage = images[currentImageIndex];
    if (currentImage.type === "image") {
      imgStory.style.display = "block";
      imgStory.src = currentImage.src;
    }
    next = progress[0];
  }
  next.classList.add("active");
  next.style.animationDuration = `${currentDuration / 1000}s`;
  checkImageInfo();
};

progress.map((el) => el.addEventListener("animationend", playNext, false));

playNext();

const prevImage = () => {
  const current = progress.find((el) => el.classList.contains("active"));
  const currentIndex = progress.indexOf(current);
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
      if (images[currentImageIndex].type === "image") {
        imgStory.src = images[currentImageIndex].src;
        imgStory.style.display = "block";
      }
    }
    if (!prev) {
      progress.map((el) => {
        el.classList.remove("active");
      });
      currentImageIndex = images.length - 1;
      currentDuration = images[currentImageIndex].duration;
      if (images[currentImageIndex].type === "image") {
        imgStory.src = images[currentImageIndex].src;
        imgStory.style.display = "block";
      }
      prev = progress[progress.length - 1];
    }
    prev.classList.add("active");
    prev.style.animationDuration = `${currentDuration / 1000}s`;
  }
  checkImageInfo();
};

const nextImage = () => {
  const current = progress.find((el) => el.classList.contains("active"));
  const currentIndex = progress.indexOf(current);
  if (currentIndex !== progress.length - 1) {
    const next = progress[currentIndex + 1];
    current.classList.remove("active");
    current.classList.add("passed");
    for (let i = 0; i <= currentIndex; i++) {
      progress[i].classList.add("passed");
    }
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    currentDuration = images[currentImageIndex].duration;
    if (images[currentImageIndex].type === "image") {
      imgStory.src = images[currentImageIndex].src;
      imgStory.style.display = "block";
    }
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
    if (images[currentImageIndex].type === "image") {
      imgStory.src = images[currentImageIndex].src;
      imgStory.style.display = "block";
    }
    first.classList.add("active");
    first.style.animationDuration = `${currentDuration / 1000}s`;
  }
  checkImageInfo();
};

function pauseImage() {
  const current = progress.find((el) => el.classList.contains("active"));
  clearInterval(intervalId);
  isPaused = true;
  current.style.animationPlayState = "paused";
}

function resumeImage() {
  const current = progress.find((el) => el.classList.contains("active"));
  current.style.animationPlayState = "running";
  intervalId = setInterval(() => {
    playNext();
  }, currentDuration);
  isPaused = false;
}


function init() {
  const btnPause = document.querySelector(".button-pause");
  const btnResume = document.querySelector(".button-resume");
  
  btnPause.addEventListener("click", pauseImage);
  btnResume.addEventListener("click", resumeImage);

  intervalId = setInterval(() => {
    playNext();
  }, currentDuration);
}

init();


