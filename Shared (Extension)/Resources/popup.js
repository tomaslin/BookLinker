// Predefined URL mappings
const BOOK_URLS = {
  'Hide': '',
  'Salem Library': 'https://catalog.ccrls.org/client/en_US/ccrls/search/results?qu={title}&te=ERC_ST_DEFAULT&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle',
  'Bookstore.org': 'https://bookshop.org/beta-search?keywords={title}',
  "Powell's": 'https://www.powells.com/searchresults?keyword={title}',
  'Amazon': 'https://www.amazon.com/s?i=stripbooks&rh=p_27%3A{author}%2Cp_28%3A{title}',
 'Indigo': 'https://www.chapters.indigo.ca/en-ca/books/search/?keywords={title}+{author}'
};

const AUDIOBOOK_URLS = {
  'Hide': '',
  'Salem Library': 'https://catalog.ccrls.org/client/en_US/ccrls/search/results?qu={title}&te=&lm=AUDIOBK&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle',
  'Audible': 'https://www.audible.com/search?title={title}&author_author={author}',
  'Barnes&Noble': 'https://www.barnesandnoble.com/s/{title}/_/N-2sgz'
};

document.addEventListener('DOMContentLoaded', function() {
  const bookSelect = document.getElementById('bookSelect');
  const audiobookSelect = document.getElementById('audiobookSelect');

  // Create dropdowns
  function createOptions(select, options) {
    Object.keys(options).forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
  }

  createOptions(bookSelect, BOOK_URLS);
  createOptions(audiobookSelect, AUDIOBOOK_URLS);

  // Handle dropdown changes with immediate saving
  bookSelect.addEventListener('change', () => {
    chrome.storage.local.set({
      bookUrl: BOOK_URLS[bookSelect.value],
      bookSelect: bookSelect.value
    });
  });

  audiobookSelect.addEventListener('change', () => {
    chrome.storage.local.set({
      audiobookUrl: AUDIOBOOK_URLS[audiobookSelect.value],
      audiobookSelect: audiobookSelect.value
    });
  });

  // Load saved selections
  chrome.storage.local.get(['bookSelect', 'audiobookSelect'], function(data) {
    bookSelect.value = data.bookSelect || 'Amazon';
    audiobookSelect.value = data.audiobookSelect || 'Audible';
  });
});
