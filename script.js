class slider {
  constructor(sliderWrap, ...arg) {
    if ([...arg].length) {
      this.options = Object.assign(...arg);
    } else {
      this.options = {
        prev: ".slide-prev",
        next: ".slide-next",
        dots: false,
        dotsWrap: ".dots",
        autoplay: true,
        interval: 4000,
        title: true,
      };
    }

    this.wrapper = document.querySelector(sliderWrap);
    this.sliderDots = document.querySelector(this.options.dotsWrap);
    this.sliderImages = this.wrapper.querySelectorAll(".slide");

    this.PREV = this.wrapper.querySelector(this.options.prev);
    this.NEXT = this.wrapper.querySelector(this.options.next);
    this.initSlider();
  }

  initSlider() {
    this.sliderImages.forEach((image, index) => {
      image.dataset.index = index;
      image.classList.add("n" + index);
    });
    this.addEventArrows();
    this.initDots();
    this.initTitle();
    this.initAuto();
  }

  addEventArrows() {
    let nextNumber;
    this.PREV.addEventListener("click", () => {
      let indexEl = +this.wrapper.querySelector(".active").dataset.index;
      nextNumber = indexEl === 0 ? this.sliderImages.length - 1 : indexEl - 1;
      this.moveSlider(nextNumber);
    });
    this.NEXT.addEventListener("click", () => {
      let indexEl = +this.wrapper.querySelector(".active").dataset.index;
      nextNumber = indexEl === this.sliderImages.length - 1 ? 0 : indexEl + 1;
      this.moveSlider(nextNumber);
    });
  }

  initDots() {
    if (this.options.dots === false) {
      console.log("dots false");
      return;
    }
    this.sliderImages.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      this.sliderDots.innerHTML += dot;
    });

    this.sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        this.moveSlider(+e.target.dataset.index);
      });
    });
  }

  initTitle(slide) {
    if (this.options.title === false) {
      console.log("title false");
      return;
    }
    if (!slide) {
      slide = this.sliderImages[0];
    }
    let slideTitle = slide.querySelector("figcaption").textContent;
    let titleDiv = `<div class="slider__images-title">${this.cropTitle(
      slideTitle,
      30
    )}</div>`;
    this.wrapper.insertAdjacentHTML("beforeend", titleDiv);
  }

  changeTitle(slide) {
    let sliderTitle = this.wrapper.querySelector(".slider__images-title");
    let slideTitle = slide.querySelector("figcaption").textContent;
    sliderTitle.innerText = this.cropTitle(slideTitle, 30);
  }

  cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }

  moveSlider(index) {
    this.wrapper.querySelector(".active").classList.remove("active");
    this.wrapper.querySelector(".n" + index).classList.add("active");

    if (this.options.dots === true) {
      this.sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
        dot.classList.remove("prev-slide");
        dot.classList.remove("next-slide");
      });

      this.sliderDots.querySelector(".active").classList.remove("active");
      this.sliderDots.querySelector(".n" + index).classList.add("active");
      this.sliderDots
        .querySelector(
          ".n" + (index === 0 ? +this.sliderImages.length - 1 : index - 1)
        )
        .classList.add("prev-slide");
      this.sliderDots
        .querySelector(
          ".n" + (index === +this.sliderImages.length - 1 ? 0 : index + 1)
        )
        .classList.add("next-slide");
    }
    if (this.options.title === true) {
      let slide = this.wrapper.querySelector(".n" + index);
      this.changeTitle(slide);
    }
  }

  initAuto() {
    const intervalFunc = () => {
      let curNumber = +this.wrapper.querySelector(".active").dataset.index;
      let nextNumber =
        curNumber === this.sliderImages.length - 1 ? 0 : curNumber + 1;
      this.moveSlider(nextNumber);
    };

    if (this.options.autoplay === false) return;

    let ID = setInterval(intervalFunc, this.options.interval);

    this.wrapper.addEventListener("mouseover", () => {
      clearInterval(ID);
    });
    this.wrapper.addEventListener("mouseout", () => {
      ID = setInterval(intervalFunc, this.options.interval);
    });
  }
}

const initSlider = new slider(".slider-wrapper", {
  prev: ".slide-prev",
  next: ".slide-next",
  dots: true,
  dotsWrap: ".dots",
  autoplay: true,
  interval: 1000,
  title: true,
});
