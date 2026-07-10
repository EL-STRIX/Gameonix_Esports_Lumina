// search.js - Handles search results on the search.html page

document.addEventListener('booksLoaded', () => {
    const searchContainer = document.getElementById('search-results-grid');
    if (!searchContainer) return;

    // Get Query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    document.getElementById('search-query-display').textContent = query || '';

    if (!query) {
        searchContainer.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const lowerQuery = query.toLowerCase();

    // Filter books by title, author, or category
    const searchResults = allBooks.filter(book => {
        return book.title.toLowerCase().includes(lowerQuery) ||
               book.author.toLowerCase().includes(lowerQuery) ||
               book.category.toLowerCase().includes(lowerQuery);
    });

    renderBooks(searchResults, 'search-results-grid');
});
