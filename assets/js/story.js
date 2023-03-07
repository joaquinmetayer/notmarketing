const progressContainer = document.querySelector(".progress-container");
const progress = Array.from(document.querySelectorAll(".progress"));
const videoStory = document.querySelector(".video-story");
const imgStory = document.querySelector(".img-story");
const progressBar = document.querySelector(".progress");
const progressBarContainer = document.querySelector(".progress-container");
const status = document.querySelector(".status");
const pauseVideo = document.getElementsByClassName("pause")[0];
const buttonInfo = document.querySelector(".button-info");
let intervalId = null;

const images = [
  { type: "image", src: "./assets/img/01.jpg", duration: 2000, info: 0 },
  { type: "video", src: "./assets/vid/01.mp4", duration: 2000, info: 0 },
  { type: "image", src: "./assets/img/02.jpg", duration: 2000, info: 1 },
  { type: "image", src: "./assets/img/03.jpg", duration: 20000, info: 0 },
  { type: "video", src: "./assets/vid/02.mp4", duration: 2000, info: 1 },
];

if (pauseVideo) {
  pauseVideo.addEventListener("mouseout", reanudarVideos);
  pauseVideo.addEventListener("mouseover", pausarVideos);
}
let currentImageIndex = 0;
let currentDuration = images[currentImageIndex].duration;

function checkImageInfo() {
  if (images[currentImageIndex].info === 1) {
    buttonInfo.style.display = "flex";
    
  } else {
    buttonInfo.style.display = "none";
  }
}
function pausarVideos() {
  const videos = document.getElementsByTagName("video");
  for (let i = 0; i < videos.length; i++) {
    videos[i].pause();
  }
}
function reanudarVideos() {
  const videos = document.getElementsByTagName("video");
  for (let i = 0; i < videos.length; i++) {
    videos[i].play();
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
      videoStory.style.display = "none";
      imgStory.src = currentImage.src;
    } else if (currentImage.type === "video") {
      imgStory.style.display = "none";
      videoStory.style.display = "block";
      videoStory.src = currentImage.src;
      videoStory.play();
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
      videoStory.style.display = "none";
      imgStory.src = currentImage.src;
    } else if (currentImage.type === "video") {
      imgStory.style.display = "none";
      videoStory.style.display = "block";
      videoStory.src = currentImage.src;
      videoStory.play();
    }
    next = progress[0];
  }
  next.classList.add("active");
  next.style.animationDuration = `${currentDuration / 1000}s`;
  checkImageInfo();
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
  if (videoStory.paused === false) {
    videoStory.pause();
  }
  if (images[currentImageIndex].type === "video") {
    currentDuration = videoStory.duration * 1000;
  }
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
        videoStory.style.display = "none";
      } else if (images[currentImageIndex].type === "video") {
        videoStory.src = images[currentImageIndex].src;
        imgStory.style.display = "none";
        videoStory.style.display = "block";
        videoStory.play();
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
        videoStory.style.display = "none";
      } else if (images[currentImageIndex].type === "video") {
        videoStory.src = images[currentImageIndex].src;
        imgStory.style.display = "none";
        videoStory.style.display = "block";
        videoStory.play();
      }
      prev = progress[progress.length - 1];
    }
    prev.classList.add("active");
    prev.style.animationDuration = `${currentDuration / 1000}s`;
  }
  checkImageInfo();
};

const nextImage = () => {
  if (videoStory.paused === false) {
    videoStory.pause();
  }
  if (images[currentImageIndex].type === "video") {
    currentDuration = videoStory.duration * 1000;
  }
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
      videoStory.style.display = "none";
    } else if (images[currentImageIndex].type === "video") {
      videoStory.src = images[currentImageIndex].src;
      imgStory.style.display = "none";
      videoStory.style.display = "block";
      videoStory.play();
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
      videoStory.style.display = "none";
    } else if (images[currentImageIndex].type === "video") {
      videoStory.src = images[currentImageIndex].src;
      imgStory.style.display = "none";
      videoStory.style.display = "block";
      videoStory.play();
    }
    first.classList.add("active");
    first.style.animationDuration = `${currentDuration / 1000}s`;
  }
  checkImageInfo();
};
