document.getElementById('filterBtn').addEventListener('click', function () {
    const dateFromInput = document.getElementById('dateFrom').value;
    const dateToInput = document.getElementById('dateTo').value;

    // Если оба поля пустые - показываем все
    if (!dateFromInput && !dateToInput) {
        showAllNews();
        return;
    }

    const dateFrom = dateFromInput ? new Date(dateFromInput) : null;
    const dateTo = dateToInput ? new Date(dateToInput) : null;

    const newsCards = document.querySelectorAll('.news__card_body');

    newsCards.forEach(card => {
        const newsDateStr = card.getAttribute('data-date'); // '2025-07-25'
        if (!newsDateStr) {
            card.style.display = 'none';
            return;
        }

        const newsDate = new Date(newsDateStr);

        let show = true;
        if (dateFrom && newsDate < dateFrom) {
            show = false;
        }
        if (dateTo && newsDate > dateTo) {
            show = false;
        }

        card.style.display = show ? '' : 'none';
    });
});

document.getElementById('clearFilterBtn').addEventListener('click', function () {
    document.getElementById('dateFrom').value = '';
    document.getElementById('dateTo').value = '';
    showAllNews();
});

function showAllNews() {
    const newsCards = document.querySelectorAll('.news__card_body');
    newsCards.forEach(card => card.style.display = '');
}
