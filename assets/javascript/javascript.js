window.onscroll = function() {
  makeHeaderSticky();
};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function makeHeaderSticky() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// stickyheader
// vertical-slider
var swiper = new Swiper(".myVertical", {
  spaceBetween: 20,
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
// vertical-slider
// sharper-slider
var swiper = new Swiper(".mysharper", {
  spaceBetween: 20,
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
// sharper-slider
// mygallery-slider
var swiper = new Swiper(".mygallery", {
  spaceBetween: 10,
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
// mygallery-slider