let images = [
  {
    url: "https://s1.1zoom.ru/big0/94/345461-admin.jpg",
    title: "картинка 1 vsvfdbfv werfgersvrfv wefrervsergsvf erferfvaervervear",
  },
  {
    url: "https://i.pinimg.com/originals/02/c4/82/02c482063823ce8bb75bc7a73541a1c6.jpg",
    title: "картинка 2",
  },
  {
    url: "https://i02.fotocdn.net/s109/edbe5e8e7ccb11e9/public_pin_l/2410262715.jpg",
    title: "картинка 3",
  },
  {
    url: "https://oakmandesigns.files.wordpress.com/2012/07/ferrari-599xx-067.jpg",
    title: "картинка 4",
  },
  {
    url: "https://get.wallhere.com/photo/sports-sunset-night-car-vehicle-Lamborghini-Porsche-California-panorama-Nikon-sports-car-Ferrari-Convertible-F430-performance-car-Nevada-italian-Ferrari-California-exotic-shot-light-flickr-Italia-Motion-wheel-cars-trails-V8-automobile-supercar-d3000-nightshot-458-worldcars-motorsport-land-vehicle-automotive-design-race-car-luxury-vehicle-ferrari-599-gtb-fiorano-folk-photography-reno-automotive-wheel-system-sports-car-racing-870531.jpg",
    title: "картинка 5",
  },
  {
    url: "https://www.premiumfelgi.com/modGalerie/en_GB/2009/4Gallery/2009_Wheels-Ferrari-812-Superfast.jpg",
    title: "картинка 6",
  },
  {
    url: "https://s1.1zoom.ru/big0/56/224235-burbon.jpg",
    title: "картинка 7",
  },
  {
    url: "https://sun9-28.userapi.com/c844521/v844521539/19df4c/3WJOoEAyp4A.jpg",
    title: "картинка 8",
  },
];

function initSlider(options) {
  if (!images || !images.length) return;

  options = options || {
    dots: true,
    title: false,
    autoplay: false,
    interval: 3000,
  };

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");

  initImages();
  initArrows();

  if (options.dots) {
    initDots();
  }

  if (options.title) {
    initTitle();
  }

  if (options.autoplay) {
    initAuto();
  }

  function initImages() {
    images.forEach((image, index) => {
      let imageElem = `<img src="${image.url}" class="image n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}">`;
      sliderImages.innerHTML += imageElem;
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach((arrow) => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        console.log(curNumber);
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach((dot) => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.title) {
      changeTitle(num);
    }
  }

  function initTitle() {
    let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
    sliderImages.innerHTML += cropTitle(titleDiv, 50);
  }

  function changeTitle(num) {
    if (!images[num].title) return;
    let sliderTitle = sliderImages.querySelector(".slider__images-title");
    sliderTitle.innerText = cropTitle(images[num].title, 50);
  }

  function cropTitle(title, size) {
    if (title.length <= size) {
      return title;
    } else {
      return title.substr(0, size) + "...";
    }
  }

  function initAuto() {
    const ID = setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.interval);
  }
}

let sliderOptions = {
  dots: true,
  title: true,
  autoplay: true,
  interval: 5000,
};

document.addEventListener("DOMContentLoaded", function () {
  initSlider(sliderOptions);
});
