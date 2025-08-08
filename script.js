document.addEventListener('DOMContentLoaded', () => {
  const newsCards = document.querySelectorAll('.news__card_body');
  newsCards.forEach((card, index) => {
    if (index >= 6) {
      card.style.display = 'none';
    }
  });
});