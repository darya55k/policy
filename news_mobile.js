let allNews = [];
const newsPerPage = 6;

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      allNews = data;

      const pathname = window.location.pathname;
      const isMainPage = pathname.endsWith('index.html') || pathname === '/' || pathname.endsWith('index.html'); 
      const isAktualnoePage = pathname.endsWith('aktualnoe.html');

      const isMobile = window.innerWidth <= 600;

      if (isMobile) {
        if (isMainPage) {
          renderMobileSlider(allNews.slice(0, newsPerPage));
          setupLoadMoreButtonMobile();
        } else if (isAktualnoePage) {
          renderNewsBatch(allNews.length);
          hideLoadMoreButton();
        } else {
          renderNewsBatch(allNews.length);
          hideLoadMoreButton();
        }
        initSwiper();
      } else {
        // Десктоп
        if (isMainPage) {
          renderNewsBatch(newsPerPage);
          setupLoadMoreButton();
        } else if (isAktualnoePage) {
          renderNewsBatch(allNews.length);
          hideLoadMoreButton();
        } else {
          renderNewsBatch(allNews.length);
          hideLoadMoreButton();
        }
      }
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));
});

// Рендер новостей для десктопа (карточки)
function renderNewsBatch(count) {
  const container = document.querySelector('.news__cards');
  if (!container) return;

  container.innerHTML = '';

  const batch = allNews.slice(0, count);

  batch.forEach(news => {
    const date = new Date(news.date * 1000).toLocaleDateString('ru-RU');
    const imageSrc = news.image || 'images/default.jpg';

    const html = `
      <div class="news__card_body" data-date="${date}">
        <p class="news__date">${date}</p>
        <div class="news__card">
          <img src="${imageSrc}" alt="новость" />
          <p class="news__text">${news.text.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="news__button">
          <div class="news__button_inline">
            <a href="${news.link}" target="_blank">Читать в Telegram</a>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
  });
}

// Рендер слайдера для мобильных
function renderMobileSlider(newsArray) {
  const container = document.querySelector('.news__cards_mobile');
  if (!container) return;

  container.innerHTML = '';

  newsArray.forEach(news => {
    const date = new Date(news.date * 1000).toLocaleDateString('ru-RU');
    const imageSrc = news.image || 'images/default.jpg';

    const html = `
      <div class="swiper-slide">
        <div class="news__card_body" data-date="${date}">
          <p class="news__date">${date}</p>
          <div class="news__card">
            <img src="${imageSrc}" alt="новость" />
            <p class="news__text">${news.text.replace(/\n/g, '<br>')}</p>
          </div>
          <div class="news__button">
            <div class="news__button_inline">
              <a href="${news.link}" target="_blank">Читать в Telegram</a>
            </div>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
  });
}

// Инициализация слайдера Swiper
function initSwiper() {
  if (window.mySwiper) {
    window.mySwiper.destroy(true, true);
  }

  window.mySwiper = new Swiper('.news-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    loop: false,
  });
}

// Кнопка "Все новости" для десктопа
function setupLoadMoreButton() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) return;

  loadMoreBtn.style.display = 'block';
  loadMoreBtn.addEventListener('click', () => {
    window.location.href = 'aktualnoe.html';
  });
}

// Кнопка "Все новости" для мобильной версии (отдельная кнопка ниже слайдера)
function setupLoadMoreButtonMobile() {
  let btn = document.getElementById('loadMoreBtnMobile');
  if (!btn) {
    // Создаем кнопку, если её нет
    btn = document.createElement('a');
    btn.id = 'loadMoreBtnMobile';
    btn.className = 'news__button_id';
    btn.href = 'aktualnoe.html';
    btn.textContent = 'Все новости';

    // Добавим кнопку после слайдера
    const sliderWrapper = document.querySelector('.news-slider-wrapper');
    if (sliderWrapper) {
      sliderWrapper.insertAdjacentElement('afterend', btn);
    }
  }

  btn.style.display = 'block';

  mobileBtn.style.maxWidth = '200px';

}

function hideLoadMoreButton() {
  const desktopBtn = document.getElementById('loadMoreBtn');
  if (desktopBtn) desktopBtn.style.display = 'none';

  const mobileBtn = document.getElementById('loadMoreBtnMobile');
  if (mobileBtn) mobileBtn.style.display = 'none';
}
