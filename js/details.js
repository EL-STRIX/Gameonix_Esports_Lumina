// details.js - Book Details, Reviews, and Download Logic

$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get('id'));
    
    if (!bookId) {
        window.location.href = '../index.html';
        return;
    }

    $.getJSON('../data/books.json', function(books) {
        const book = books.find(b => b.id === bookId);
        if (book) {
            renderBookDetails(book);
            setupDownload(book);
            setupReviews(bookId);
            renderRelatedBooks(book, books);
        } else {
            $('#detailsContainer').html('<div class="alert alert-danger mt-5">Book not found!</div>');
        }
    }).fail(function() {
        $('#detailsContainer').html('<div class="alert alert-danger mt-5">Failed to load book data!</div>');
    });
});

function renderBookDetails(book) {
    const premiumBadge = book.isPremiumRequired ? `<span class="badge bg-warning text-dark"><span class="material-symbols-outlined fs-6 align-middle">star</span> Premium Ebook</span>` : `<span class="badge bg-success">Free Download</span>`;
    
    let advHtml = book.advantages.map(a => `<li><span class="text-success">✓</span> ${a}</li>`).join('');
    let disadvHtml = book.disadvantages.map(d => `<li><span class="text-danger">✗</span> ${d}</li>`).join('');

    const html = `
        <div class="row mb-5 mt-4">
            <div class="col-md-4 text-center mb-4">
                <img src="../${book.coverImage}" class="img-fluid rounded shadow" alt="${book.title}" style="max-height: 500px;">
            </div>
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h1 class="display-5 fw-bold mb-0">${book.title}</h1>
                    ${premiumBadge}
                </div>
                <h4 class="text-muted mb-3">By ${book.author}</h4>
                
                <div class="d-flex align-items-center mb-4">
                    <div class="me-3">${generateStarsDetails(book.rating)}</div>
                    <span class="fw-bold fs-5 text-primary">$${book.price}</span>
                </div>
                
                <div class="card bg-light border-0 mb-4">
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-4 border-end"><strong>Pages</strong><br>${book.pages}</div>
                            <div class="col-4 border-end"><strong>Published</strong><br>${book.publishedYear}</div>
                            <div class="col-4"><strong>Language</strong><br>${book.language}</div>
                        </div>
                    </div>
                </div>
                
                <h5 class="fw-bold">Summary</h5>
                <p class="lead" style="font-size: 1.1rem;">${book.summary}</p>
                
                <div class="row mt-4">
                    <div class="col-md-6 mb-3">
                        <h6 class="fw-bold">Highlights</h6>
                        <ul class="list-unstyled">${advHtml}</ul>
                    </div>
                    <div class="col-md-6 mb-3">
                        <h6 class="fw-bold">Considerations</h6>
                        <ul class="list-unstyled">${disadvHtml}</ul>
                    </div>
                </div>
                
                <hr class="my-4">
                <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button id="downloadBtn" class="btn btn-primary btn-lg px-5 shadow-sm">
                        <span class="material-symbols-outlined align-middle me-2">download</span> Download Ebook
                    </button>
                </div>
                
                <p class="text-muted small mt-4">
                    ISBN: ${book.isbn} | Publisher: ${book.publisher} | Genre: ${book.genre}
                </p>
            </div>
        </div>
        
        <hr class="my-5">
        
        <div class="row mb-5">
            <div class="col-md-8 mx-auto">
                <h3 class="mb-4 text-center">Reader Reviews</h3>
                <div class="card shadow-sm border-0 mb-5">
                    <div class="card-body p-4">
                        <h5 class="mb-3">Leave a Review</h5>
                        <form id="reviewForm">
                            <div class="mb-3">
                                <label class="form-label">Rating (1-5)</label>
                                <select class="form-select" id="reviewRating" required>
                                    <option value="5">5 - Excellent</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="3">3 - Average</option>
                                    <option value="2">2 - Poor</option>
                                    <option value="1">1 - Terrible</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Your Review</label>
                                <textarea class="form-control" id="reviewText" rows="3" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-dark">Submit Review</button>
                        </form>
                    </div>
                </div>
                <div id="reviewsList"></div>
            </div>
        </div>
        
        <div class="row mb-5" id="relatedSection">
            <div class="col-12"><h3 class="mb-4">Related Books</h3></div>
            <div class="row g-4" id="relatedGrid"></div>
        </div>
    `;
    
    $('#detailsContainer').html(html);
}

function generateStarsDetails(rating) {
    let stars = '';
    const full = Math.floor(rating);
    for(let i=1; i<=5; i++) {
        stars += `<span class="material-symbols-outlined text-warning" style="font-variation-settings: 'FILL' ${i <= full ? '1' : '0'}">star</span>`;
    }
    return stars;
}

function setupDownload(book) {
    $('#downloadBtn').on('click', function() {
        if (book.isPremiumRequired) {
            if (GlobalApp.isPremium()) {
                GlobalApp.showToast("Success", "Download started! Thank you for being a premium member.", true);
                // Simulate download
                setTimeout(() => window.open(`../${book.coverImage}`, '_blank'), 1000); 
            } else {
                GlobalApp.showToast("Premium Required", "This book requires a premium subscription.", false);
                setTimeout(() => window.location.href = 'premium.html', 1500);
            }
        } else {
            GlobalApp.showToast("Success", "Download started! Enjoy your free ebook.", true);
            setTimeout(() => window.open(`../${book.coverImage}`, '_blank'), 1000);
        }
    });
}

function setupReviews(bookId) {
    const storageKey = `reviews_${bookId}`;
    
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
        let html = '';
        if (reviews.length === 0) {
            html = '<p class="text-muted text-center">No reviews yet. Be the first!</p>';
        } else {
            reviews.reverse().forEach(r => {
                html += `
                    <div class="card border-0 shadow-sm mb-3">
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-2">
                                <strong>Anonymous Reader</strong>
                                <span>${generateStarsDetails(r.rating)}</span>
                            </div>
                            <p class="mb-0 text-muted">${r.text}</p>
                            <small class="text-muted mt-2 d-block">${new Date(r.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                `;
            });
        }
        $('#reviewsList').html(html);
    }
    
    $('#reviewForm').on('submit', function(e) {
        e.preventDefault();
        const rating = parseInt($('#reviewRating').val());
        const text = $('#reviewText').val().trim();
        
        if (text) {
            const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
            reviews.push({ rating, text, date: new Date().toISOString() });
            localStorage.setItem(storageKey, JSON.stringify(reviews));
            
            $('#reviewText').val('');
            $('#reviewRating').val('5');
            loadReviews();
            GlobalApp.showToast("Success", "Your review has been posted!", true);
        }
    });
    
    loadReviews();
}

function renderRelatedBooks(book, allBooks) {
    if (!book.relatedBookIds || book.relatedBookIds.length === 0) {
        $('#relatedSection').hide();
        return;
    }
    
    const related = allBooks.filter(b => book.relatedBookIds.includes(b.id));
    let html = '';
    related.forEach(b => {
        html += `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="../${b.coverImage}" class="card-img-top p-3" alt="${b.title}" style="height:200px; object-fit:contain;">
                    <div class="card-body text-center">
                        <h6 class="card-title text-truncate" title="${b.title}">${b.title}</h6>
                        <a href="book-details.html?id=${b.id}" class="btn btn-sm btn-outline-secondary mt-2">View</a>
                    </div>
                </div>
            </div>
        `;
    });
    $('#relatedGrid').html(html);
}
