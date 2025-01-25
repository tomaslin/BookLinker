const searchUrlTemplate = "https://www.powells.com/searchresults?keyword={title}+{author}";

// Function to create and insert the search link
function createSearchLink(title, author) {
  if (title && author) {
    const searchUrl = searchUrlTemplate
      .replace('{title}', encodeURIComponent(title))
      .replace('{author}', encodeURIComponent(author));

      
    // Create and insert the search link
    const searchLink = document.createElement('a');
    searchLink.href = searchUrl;
    searchLink.innerText = '🏴‍☠️'; // Pirate ship emoji
    searchLink.style.marginLeft = '10px';
    searchLink.style.color = 'blue';
    searchLink.style.textDecoration = 'none'; // Remove underline
    searchLink.style.fontSize = '1.5em'; // Increase emoji size

    // Insert the link into the share section (for existing structure)
    const shareSection = document.querySelector('.BookPageTitleSection__share');
    if (shareSection) {
      shareSection.appendChild(searchLink);
    }

    // Insert the link into the BookCard (for new structure)
    const bookCard = document.querySelector('.BookCard');
    if (bookCard) {
      const clickCardTarget = document.querySelector('.BookPage__share');
      if (clickCardTarget) {
        clickCardTarget.appendChild(searchLink);
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
      createSearchLink(title, author);
      observer.disconnect(); // Stop observing once the title and author are found
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}

// Start observing for the book title
observeBookTitle();
