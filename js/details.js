var oldOnloadDetails = window.onload;
window.onload = function() {
    if (typeof oldOnloadDetails === 'function') {
        oldOnloadDetails();
    }

    var params = window.location.search.substring(1).split('&');
    var bookId = 1;
    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        if (pair[0] === 'id') {
            bookId = parseInt(pair[1], 10);
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/books.json', true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var books = JSON.parse(xhr.responseText);
            var book = null;
            for (var j = 0; j < books.length; j++) {
                if (books[j].id === bookId) {
                    book = books[j];
                    break;
                }
            }
            if (book) {
                renderBookDetails(book);
                setupDownload(book);
                renderRelatedBooks(book, books);
                setupReviews(book.id);
            }
        }
    };
    xhr.send();
};

function renderBookDetails(book) {
    var advHtml = '';
    for (var i = 0; i < book.advantages.length; i++) {
        advHtml += '<li><span style="color: var(--primary);">✅</span> ' + book.advantages[i] + '</li>';
    }

    var disadvHtml = '';
    for (var j = 0; j < book.disadvantages.length; j++) {
        disadvHtml += '<li><span style="color: var(--text-muted);">ℹ️</span> ' + book.disadvantages[j] + '</li>';
    }

    var html = '';
    html += '<section class="book-details-section">';
    html += '  <div class="book-details-left">';
    html += '    <img class="book-details-cover" src="../' + book.coverImage + '" alt="' + book.title + '" />';
    html += '    <button id="downloadBtn" class="btn btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">';
    html += '      <span>📥</span> Download E-Book';
    html += '    </button>';
    html += '  </div>';
    html += '  <div class="book-details-right">';
    html += '    <div class="mb-4">';
    html += '      <span class="genre-badge">' + book.genre + '</span>';
    html += '      <h1 class="book-title-lg">' + book.title + '</h1>';
    html += '      <p class="book-author-lg">by <span style="color: var(--primary); cursor: pointer;">' + book.author + '</span></p>';
    html += '    </div>';
    html += '    <div class="book-meta-grid">';
    html += '      <div><p class="meta-item-label">ISBN</p><p class="meta-item-value">' + book.isbn + '</p></div>';
    html += '      <div><p class="meta-item-label">Language</p><p class="meta-item-value">' + book.language + '</p></div>';
    html += '      <div><p class="meta-item-label">Publisher</p><p class="meta-item-value">' + book.publisher + '</p></div>';
    html += '      <div><p class="meta-item-label">Pages</p><p class="meta-item-value">' + book.pages + '</p></div>';
    html += '      <div><p class="meta-item-label">Year</p><p class="meta-item-value">' + book.publishedYear + '</p></div>';
    html += '      <div><p class="meta-item-label">Price</p><p class="meta-item-value" style="color: var(--primary);">$' + book.price + '</p></div>';
    html += '    </div>';
    html += '    <div class="summary-section">';
    html += '      <h2 class="section-heading">Summary</h2>';
    html += '      <p class="summary-text">' + book.summary + '</p>';
    html += '    </div>';
    html += '    <div class="pros-cons-grid">';
    html += '      <div class="pros-cons-card">';
    html += '        <h3>Strengths</h3>';
    html += '        <ul class="pros-cons-list">' + advHtml + '</ul>';
    html += '      </div>';
    html += '      <div class="pros-cons-card">';
    html += '        <h3>Considerations</h3>';
    html += '        <ul class="pros-cons-list">' + disadvHtml + '</ul>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</section>';

    var container = document.getElementById('bookDetailsContainer');
    if (container) {
        container.innerHTML = html;
    }
}

function setupDownload(book) {
    var downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.onclick = function() {
            if (book.isPremiumRequired) {
                if (sessionStorage.getItem('premium') === 'true') {
                    alert("Download started!");
                } else {
                    window.location.href = 'premium.html';
                }
            } else {
                alert("Download started!");
            }
        };
    }
}

function renderRelatedBooks(book, allBooks) {
    if (!book.relatedBookIds || book.relatedBookIds.length === 0) return;
    
    var relatedBooks = [];
    for (var i = 0; i < allBooks.length; i++) {
        for (var j = 0; j < book.relatedBookIds.length; j++) {
            if (allBooks[i].id === book.relatedBookIds[j]) {
                relatedBooks.push(allBooks[i]);
            }
        }
    }

    if (relatedBooks.length === 0) return;

    var html = '<section class="related-section"><h2 class="section-heading">Related Books</h2><div class="books-grid">';
    
    for (var k = 0; k < relatedBooks.length; k++) {
        var rBook = relatedBooks[k];
        var badge = rBook.isPremiumRequired ? '<div class="book-badge">Premium</div>' : '';
        
        html += '<article class="book-card" onclick="window.location.href=\'book-details.html?id=' + rBook.id + '\'">';
        html += '  <div class="book-cover-container">';
        html += '    <img class="book-cover" src="../' + rBook.coverImage + '" alt="' + rBook.title + '"/>';
        html += '    ' + badge;
        html += '  </div>';
        html += '  <div class="book-info">';
        html += '    <h3 class="book-title">' + rBook.title + '</h3>';
        html += '    <p class="book-author">' + rBook.author + '</p>';
        html += '    <div class="book-rating" style="justify-content: space-between;">';
        html += '      <div style="display: flex; align-items: center;">';
        html += '        <span>⭐</span>';
        html += '        <span>' + rBook.rating + '</span>';
        html += '      </div>';
        html += '      <span style="color: var(--primary); font-weight: 600;">$' + rBook.price + '</span>';
        html += '    </div>';
        html += '  </div>';
        html += '</article>';
    }
    
    html += '</div></section>';
    var relatedSection = document.getElementById('relatedBooksSection');
    if (relatedSection) {
        relatedSection.innerHTML = html;
    }
}

function setupReviews(bookId) {
    var html = '';
    html += '<section class="reviews-section">';
    html += '  <h2 class="section-heading" style="text-align: center;">Reader Reviews</h2>';
    html += '  <div class="review-form-card">';
    html += '    <h4>Leave a Review</h4>';
    html += '    <form id="reviewForm">';
    html += '      <select class="form-control" id="reviewRating" required>';
    html += '        <option value="5">5 Stars</option>';
    html += '        <option value="4">4 Stars</option>';
    html += '        <option value="3">3 Stars</option>';
    html += '        <option value="2">2 Stars</option>';
    html += '        <option value="1">1 Star</option>';
    html += '      </select>';
    html += '      <textarea class="form-control" id="reviewText" required rows="3" placeholder="Share your thoughts..."></textarea>';
    html += '      <button type="submit" class="btn btn-primary" style="margin-top: 16px;">Submit Review</button>';
    html += '    </form>';
    html += '  </div>';
    html += '  <div id="reviewsList" class="reviews-list"></div>';
    html += '</section>';

    var reviewsSection = document.getElementById('reviewsSection');
    if (reviewsSection) {
        reviewsSection.innerHTML = html;
    }
    
    var storageKey = 'reviews_' + bookId;
    function loadReviews() {
        var saved = localStorage.getItem(storageKey);
        var reviews = saved ? JSON.parse(saved) : [];
        var rHtml = '';
        for (var i = reviews.length - 1; i >= 0; i--) {
            var r = reviews[i];
            rHtml += '<div class="review-card">';
            rHtml += '  <div class="review-header">';
            rHtml += '    <span>' + r.rating + '.0</span>';
            rHtml += '    <span>⭐</span>';
            rHtml += '  </div>';
            rHtml += '  <p class="review-text">' + r.text + '</p>';
            rHtml += '</div>';
        }
        var rList = document.getElementById('reviewsList');
        if (rList) {
            rList.innerHTML = rHtml;
        }
    }
    
    var reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.onsubmit = function(e) {
            e.preventDefault();
            var saved = localStorage.getItem(storageKey);
            var reviews = saved ? JSON.parse(saved) : [];
            
            var ratingVal = document.getElementById('reviewRating').value;
            var textVal = document.getElementById('reviewText').value;
            
            reviews.push({ rating: ratingVal, text: textVal });
            localStorage.setItem(storageKey, JSON.stringify(reviews));
            
            document.getElementById('reviewText').value = '';
            loadReviews();
        };
    }
    loadReviews();
}
