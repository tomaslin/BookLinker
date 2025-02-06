let bookUrl = "";
let audioBookUrl = "";

// Load URLs from storage before proceeding
chrome.storage.local.get(['bookUrl', 'audiobookUrl'], function(data) {
    bookUrl = data.bookUrl || "";
    audioBookUrl = data.audiobookUrl || "";
});

function createSearchLinks(title, author) {
    title = title.split(':')[0].trim();

    if (title && author) {
        const bookSearchUrl = bookUrl
            .replace('{title}', encodeURIComponent(title))
            .replace('{author}', encodeURIComponent(author));

        const audioBookSearchUrl = audioBookUrl
            .replace('{title}', encodeURIComponent(title))
            .replace('{author}', encodeURIComponent(author));

        const bookButton = document.createElement('a');
        bookButton.type = 'link';
        bookButton.className = 'Button Button--transparent Button--medium Button--rounded';
        bookButton.setAttribute('aria-label', 'Search for eBook');
        bookButton.innerHTML = `<span class="Button__labelItem">📖</span>`;
        bookButton.href = bookSearchUrl;
        bookButton.target = '_blank';

        const audioBookButton = document.createElement('a');
        audioBookButton.type = 'link';
        audioBookButton.className = 'Button Button--transparent Button--medium Button--rounded';
        audioBookButton.setAttribute('aria-label', 'Search for Audiobook');
        audioBookButton.innerHTML = `<span class="Button__labelItem">🎧</span>`;
        audioBookButton.href = audioBookSearchUrl;
        audioBookButton.target = '_blank';

        const addButtons = (container) => {
            if (container) {
                const clonedBookButton = bookButton.cloneNode(true);
                const clonedAudioBookButton = audioBookButton.cloneNode(true);
                if(bookSearchUrl){
                    container.appendChild(clonedBookButton);
                }
                if(audioBookSearchUrl){
                    container.appendChild(clonedAudioBookButton);
                }
            }
        };

        addButtons(document.querySelector('.BookPageTitleSection__share .Button__container'));
        addButtons(document.querySelector('.BookPage__share .Button__container'));
    }
}

function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutations, observerInstance) => {
        const targetElement = document.querySelector(selector);
        if (targetElement) {
            callback(targetElement);
            observerInstance.disconnect(); // Stop observing once element is found
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function observeBookTitle() {
    waitForElement('h1[data-testid="bookTitle"]', (titleElement) => {
        waitForElement('.ContributorLink__name', (authorElement) => {
            createSearchLinks(titleElement.innerText, authorElement.innerText);
        });
    });
}

observeBookTitle();
