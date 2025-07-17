// Carousel logic for smooth sliding
(function () {
  const track = document.querySelector("#package-carousel .carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dots = Array.from(document.querySelectorAll("#carousel-dots button"));
  let currentIndex = 0;
  const slideCount = slides.length;

  // Set slide widths (in case responsive)
  function setSlideWidths() {
    const carouselWidth =
      document.getElementById("package-carousel").offsetWidth;
    slides.forEach((slide) => {
      slide.style.width = carouselWidth + "px";
    });
  }
  setSlideWidths();
  window.addEventListener("resize", setSlideWidths);

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= slideCount) index = slideCount - 1;
    currentIndex = index;
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    updateDots();
    updateButtons();
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle("bg-blue-300", idx === currentIndex);
      dot.classList.toggle("bg-blue-100", idx !== currentIndex);
    });
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slideCount - 1;
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
    });
  });

  // Touch/drag support (optional, for mobile)
  let startX = 0,
    isDragging = false,
    currentTranslate = 0;
  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentTranslate = -slides[0].offsetWidth * currentIndex;
    track.style.transition = "none";
  });
  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${currentTranslate + dx}px)`;
  });
  track.addEventListener("touchend", (e) => {
    isDragging = false;
    track.style.transition = "";
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else if (dx < -50 && currentIndex < slideCount - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex);
    }
  });

  // Init
  goToSlide(0);
})();
