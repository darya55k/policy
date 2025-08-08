// news.js

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderNews(data))
        .catch(error => console.error('Ошибка загрузки JSON:', error));
});

function renderNews(newsArray) {
    const desktopContainer = document.querySelector('.news__cards');
    const mobileContainer = document.querySelector('.news__cards_mobile');

    if (desktopContainer) desktopContainer.innerHTML = '';
    if (mobileContainer) mobileContainer.innerHTML = '';

    newsArray.forEach(news => {
        const date = new Date(news.date * 1000).toLocaleDateString('ru-RU');
        const imageSrc = news.image || 'images/default.jpg'; 

        const desktopNewsHTML = `
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

        const mobileNewsHTML = `
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

        if (desktopContainer) desktopContainer.insertAdjacentHTML('beforeend', desktopNewsHTML);
        if (mobileContainer) mobileContainer.insertAdjacentHTML('beforeend', mobileNewsHTML);
    });
}
