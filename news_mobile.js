// news.js

let allNews = [];
let newsPerPage = 6;
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      allNews = data;

      const isDesktop = window.innerWidth > 600;

      if (isDesktop) {
        renderNewsBatch();
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
          loadMoreBtn.style.display = 'block';
          loadMoreBtn.addEventListener('click', renderNewsBatch);
        }
      } else {
        renderAllMobileNews();
      }
    })
    .catch(error => console.error('Ошибка загрузки JSON:', error));
});

function renderNewsBatch() {
  const container = document.querySelector('.news__cards');
  if (!container) return;

  const nextBatch = allNews.slice(currentIndex, currentIndex + newsPerPage);

  nextBatch.forEach(news => {
    const date = new Date(news.date * 1000).toLocaleDateString('ru-RU');
    const imageSrc = news.image || 'images/default.jpg';

    const html = `
      <div class="news__card_body">
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

  currentIndex += nextBatch.length;

  if (currentIndex >= allNews.length) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
  }
}

function renderAllMobileNews() {
  const container = document.querySelector('.news__cards_mobile');
  if (!container) return;

  container.innerHTML = '';

  allNews.forEach(news => {
    const date = new Date(news.date * 1000).toLocaleDateString('ru-RU');
    const imageSrc = news.image || 'images/default.jpg';

    const html = `
      <div class="swiper-slide">
        <div class="news__card_body">
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
