document.addEventListener('DOMContentLoaded', () => {
    const batchSize = 6; // сколько показывать за раз
    const newsItems = document.querySelectorAll('.news__card_body');
    const showMoreBtn = document.getElementById('show-more-btn');
  
    let visibleCount = 0;
  
    function showNextBatch() {
      const nextCount = visibleCount + batchSize;
  
      for (let i = visibleCount; i < nextCount && i < newsItems.length; i++) {
        newsItems[i].style.display = 'block';
      }
  
      visibleCount = nextCount;
  
      // Если больше нечего показывать — скрываем кнопку
      if (visibleCount >= newsItems.length) {
        showMoreBtn.style.display = 'none';
      }
    }
  
    // Сначала скрываем все
    newsItems.forEach(item => item.style.display = 'none');
  
    // Показываем первую порцию
    showNextBatch();
  
    // Назначаем обработчик кнопке
    showMoreBtn.addEventListener('click', showNextBatch);
  
    // Показываем кнопку, если новостей больше batchSize
    if (newsItems.length > batchSize) {
      showMoreBtn.style.display = 'block';
    }
  });
  