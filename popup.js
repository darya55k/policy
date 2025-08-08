document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.openPopupBtn');
    const closeBtn = document.getElementById('closePopupBtn');
    const popup = document.getElementById('popup');
  
    openButtons.forEach(button => {
      button.addEventListener('click', () => {
        popup.style.display = 'flex';
      });
    });
  
    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });
  