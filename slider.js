// Инициализация Swiper только при ширине <= 600px
let swiperInstance = null;

function initSwiperIfMobile() {
  const isMobile = window.innerWidth <= 600;

  if (isMobile && !swiperInstance) {
    swiperInstance = new Swiper('.news-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  if (!isMobile && swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
}

// При загрузке
window.addEventListener('load', initSwiperIfMobile);
// При изменении размера окна
window.addEventListener('resize', initSwiperIfMobile);
