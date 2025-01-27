const bookUrl = "https://annas-archive.org/search?index=&page=1&display=&ext=epub&src=lgli&src=lgrs&sort=newest&q={title}+{author}";
const audioBookUrl = "https://audiobooksbee.com/?s={title}&tt=1";

// Function to create and insert the search links
function createSearchLinks(title, author) {
  // Strip out anything after the first colon in the title
  title = title.split(':')[0].trim();

  if (title && author) {
    const bookSearchUrl = bookUrl
      .replace('{title}', encodeURIComponent(title))
      .replace('{author}', encodeURIComponent(author));

    const audioBookSearchUrl = audioBookUrl
      .replace('{title}', encodeURIComponent(title))
      .replace('{author}', encodeURIComponent(author));

    // Create the book search button
    const bookButton = document.createElement('a');
    bookButton.type = 'link';
    bookButton.className = 'Button Button--transparent Button--medium Button--rounded';
    bookButton.setAttribute('aria-label', 'Search for eBook');
    bookButton.innerHTML = `<span class="Button__labelItem">📖</span>`;
    bookButton.href = bookSearchUrl;
    bookButton.target = '_blank';
      
    // Create the audiobook search button
    const audioBookButton = document.createElement('a');
    audioBookButton.type = 'link';
    audioBookButton.className = 'Button Button--transparent Button--medium Button--rounded';
    audioBookButton.setAttribute('aria-label', 'Search for Audiobook');
    audioBookButton.innerHTML = `<span class="Button__labelItem">🎧</span>`;
    audioBookButton.href = audioBookSearchUrl;
    audioBookButton.targer = '_blank';

    // Find the correct Button__container within the BookPageTitleSection__share div
    const shareSection = document.querySelector('.BookPageTitleSection__share');
    if (shareSection) {
      const buttonContainer = shareSection.querySelector('.Button__container');
      if (buttonContainer) {
        // Clone the buttons and append them to the container
        const clonedBookButton = bookButton.cloneNode(true);
        const clonedAudioBookButton = audioBookButton.cloneNode(true);
        buttonContainer.appendChild(clonedBookButton);
        buttonContainer.appendChild(clonedAudioBookButton);
      }
    }

    // Find the Button__container within the BookPage__share div
    const bookPageShareSection = document.querySelector('.BookPage__share');
    if (bookPageShareSection) {
      const bookPageButtonContainer = bookPageShareSection.querySelector('.Button__container');
      if (bookPageButtonContainer) {
        // Clone the buttons and append them to the container
        const clonedBookButton = bookButton.cloneNode(true);
        const clonedAudioBookButton = audioBookButton.cloneNode(true);
        bookPageButtonContainer.appendChild(clonedBookButton);
        bookPageButtonContainer.appendChild(clonedAudioBookButton);
      }
    }
  }
}

// Function to observe changes in the DOM
function observeBookTitle() {
  const observer = new MutationObserver((mutationsList, observer) => {
    // Check for the existing structure
    const titleElement = document.querySelector('h1[data-testid="bookTitle"]');
    const authorElement = document.querySelector('.ContributorLink__name');

    // Check for the new structure
    const bookCardTitleElement = document.querySelector('.BookCard .BookCard__title');
    const bookCardAuthorElement = document.querySelector('.BookCard .BookCard__author');

    let title = '';
    let author = '';

    if (titleElement && authorElement) {
      // Existing structure
      title = titleElement.innerText;
      author = authorElement.innerText;
    } else if (bookCardTitleElement && bookCardAuthorElement) {
      // New structure
      title = bookCardTitleElement.innerText;
      author = bookCardAuthorElement.innerText;
    }

    if (title && author) {
      createSearchLinks(title, author);
      observer.disconnect(); // Stop observing once the title and author are found
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}

// Start observing for the book title
observeBookTitle();
