$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get('id'));

    $.getJSON('../data/books.json', function(books) {
        const book = books.find(b => b.id === (bookId || 1));
        if (book) {
            renderBookDetails(book);
            setupDownload(book);
            renderRelatedBooks(book, books);
            setupReviews(book.id);
        }
    });
});

function renderBookDetails(book) {
    const advHtml = book.advantages.map(a => `<li><span class="material-symbols-outlined" style="color: var(--primary);">check_circle</span> ` + a + `</li>`).join('');
    const disadvHtml = book.disadvantages.map(d => `<li><span class="material-symbols-outlined" style="color: var(--text-muted);">info</span> ` + d + `</li>`).join('');

    const html = `
      <section class="book-details-section">
        <div class="book-details-left">
          <img class="book-details-cover" src="../${book.coverImage}" alt="${book.title}" />
          <button id="downloadBtn" class="btn btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <span class="material-symbols-outlined">download</span> Download E-Book
          </button>
        </div>
        <div class="book-details-right">
          <div class="mb-4">
            <span class="genre-badge">${book.genre}</span>
            <h1 class="book-title-lg">${book.title}</h1>
            <p class="book-author-lg">by <span style="color: var(--primary); cursor: pointer;">${book.author}</span></p>
          </div>
          <div class="book-meta-grid">
            <div>
              <p class="meta-item-label">ISBN</p>
              <p class="meta-item-value">${book.isbn}</p>
            </div>
            <div>
              <p class="meta-item-label">Language</p>
              <p class="meta-item-value">${book.language}</p>
            </div>
            <div>
              <p class="meta-item-label">Publisher</p>
              <p class="meta-item-value">${book.publisher}</p>
            </div>
            <div>
              <p class="meta-item-label">Pages</p>
              <p class="meta-item-value">${book.pages}</p>
            </div>
            <div>
              <p class="meta-item-label">Year</p>
              <p class="meta-item-value">${book.publishedYear}</p>
            </div>
            <div>
              <p class="meta-item-label">Price</p>
              <p class="meta-item-value" style="color: var(--primary);">$${book.price}</p>
            </div>
          </div>
          <div class="summary-section">
            <h2 class="section-heading">Summary</h2>
            <p class="summary-text">${book.summary}</p>
          </div>
          <div class="pros-cons-grid">
            <div class="pros-cons-card">
              <h3>Strengths</h3>
              <ul class="pros-cons-list">${advHtml}</ul>
            </div>
            <div class="pros-cons-card">
              <h3>Considerations</h3>
              <ul class="pros-cons-list">${disadvHtml}</ul>
            </div>
          </div>
        </div>
      </section>
    `;
    $('#bookDetailsContainer').html(html);
}

function setupDownload(book) {
    $('#downloadBtn').on('click', function() {
        if (book.isPremiumRequired) {
            if (sessionStorage.getItem('premium') === 'true') {
                alert("Download started!");
            } else {
                window.location.href = 'premium.html';
            }
        } else {
            alert("Download started!");
        }
    });
}

function renderRelatedBooks(book, allBooks) {
    if (!book.relatedBookIds || book.relatedBookIds.length === 0) return;
    
    let relatedBooks = allBooks.filter(b => book.relatedBookIds.includes(b.id));
    if (relatedBooks.length === 0) return;

    let html = '<section class="related-section"><h2 class="section-heading">Related Books</h2><div class="books-grid">';
    
    relatedBooks.forEach(rBook => {
        const badge = rBook.isPremiumRequired 
            ? '<div class="book-badge">Premium</div>' 
            : '';
        
        html += `
            <article class="book-card" onclick="window.location.href='book-details.html?id=${rBook.id}'">
                <div class="book-cover-container">
                    <img class="book-cover" src="../${rBook.coverImage}" alt="${rBook.title}"/>
                    ${badge}
                </div>
                <div class="book-info">
                    <h3 class="book-title">${rBook.title}</h3>
                    <p class="book-author">${rBook.author}</p>
                    <div class="book-rating" style="justify-content: space-between;">
                        <div style="display: flex; align-items: center;">
                            <span class="material-symbols-outlined" style="color: var(--primary); font-size: 16px;">star</span>
                            <span>${rBook.rating}</span>
                        </div>
                        <span style="color: var(--primary); font-weight: 600;">$${rBook.price}</span>
                    </div>
                </div>
            </article>
        `;
    });
    
    html += '</div></section>';
    $('#relatedBooksSection').html(html);
}

function setupReviews(bookId) {
    const html = `
      <section class="reviews-section">
        <h2 class="section-heading" style="text-align: center;">Reader Reviews</h2>
        <div class="review-form-card">
            <h4>Leave a Review</h4>
            <form id="reviewForm">
                <select class="form-control" id="reviewRating" required>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
                <textarea class="form-control" id="reviewText" required rows="3" placeholder="Share your thoughts..."></textarea>
                <button type="submit" class="btn btn-primary">Submit Review</button>
            </form>
        </div>
        <div id="reviewsList" class="reviews-list"></div>
      </section>
    `;
    $('#reviewsSection').html(html);
    
    const storageKey = 'reviews_' + bookId;
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
        let rHtml = '';
        reviews.reverse().forEach(r => {
            rHtml += `
            <div class="review-card">
                <div class="review-header">
                    <span>${r.rating}.0</span>
                    <span class="material-symbols-outlined" style="color: var(--primary); font-size: 18px;">star</span>
                </div>
                <p class="review-text">${r.text}</p>
            </div>
            `;
        });
        $('#reviewsList').html(rHtml);
    }
    
    $('#reviewForm').on('submit', function(e) {
        e.preventDefault();
        const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
        reviews.push({ rating: $('#reviewRating').val(), text: $('#reviewText').val() });
        localStorage.setItem(storageKey, JSON.stringify(reviews));
        $('#reviewText').val('');
        loadReviews();
    });
    loadReviews();
}
