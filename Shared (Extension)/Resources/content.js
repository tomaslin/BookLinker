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

    // Insert the link into the share section
    const shareSection = document.querySelector('.BookPageTitleSection__share');
    if (shareSection) {
      shareSection.appendChild(searchLink);
    }
  }
}

// Function to observe changes in the DOM
function observeBookTitle() {
  const observer = new MutationObserver((mutationsList, observer) => {
    const titleElement = document.querySelector('h1[data-testid="bookTitle"]');
    if (titleElement) {
      const title = titleElement.innerText;
      const authorElement = document.querySelector('.ContributorLink__name');
      const author = authorElement ? authorElement.innerText : '';

      if (title && author) {
        createSearchLink(title, author);
        observer.disconnect(); // Stop observing once the title is found
      }
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
}

// Start observing for the book title
observeBookTitle();
