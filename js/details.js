$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get('id'));

    $.getJSON('../data/books.json', function(books) {
        const book = books.find(b => b.id === (bookId || 1));
        if (book) {
            renderBookDetails(book);
            setupDownload(book);
            setupReviews(book.id);
        }
    });
});

function renderBookDetails(book) {
    const advHtml = book.advantages.map(a => `<li class="d-flex align-items-start font-body-md text-on-surface-variant mb-2"><span class="material-symbols-outlined text-tertiary me-2 icon-20">check_circle</span>` + a + `</li>`).join('');
    const disadvHtml = book.disadvantages.map(d => `<li class="d-flex align-items-start font-body-md text-on-surface-variant mb-2"><span class="material-symbols-outlined text-outline-variant me-2 icon-20">info</span>` + d + `</li>`).join('');

    const html = `
      <section class="row g-4 mb-5">
        <div class="col-md-4 col-lg-3">
          <div class="aspect-1-1-5 w-100 rounded-lg overflow-hidden book-card-shadow position-relative bg-surface-container">
            <img class="w-100 h-100 object-cover" src="../${book.coverImage}" alt="${book.title}" />
          </div>
          <button id="downloadBtn" class="btn bg-primary text-on-primary w-100 mt-4 font-label-md rounded-lg py-2 d-flex align-items-center justify-content-center gap-2 hover-bg-primary-container">
            <span class="material-symbols-outlined icon-20">download</span>
            Download E-Book
          </button>
        </div>
        <div class="col-md-8 col-lg-9 d-flex flex-column justify-content-start">
          <div class="mb-5">
            <span class="d-inline-block bg-secondary-fixed text-primary px-3 py-1 rounded-pill font-label-sm mb-3">${book.genre}</span>
            <h1 class="font-display-lg text-on-background mb-2">${book.title}</h1>
            <p class="font-headline-sm text-on-surface-variant m-0">by <span class="text-primary cursor-pointer">${book.author}</span></p>
          </div>
          <div class="row row-cols-2 row-cols-sm-3 g-3 bg-surface-container-low p-4 rounded-lg border border-surface-variant mb-5 mx-0">
            <div class="col">
              <p class="font-label-sm text-outline m-0 mb-1">ISBN</p>
              <p class="font-body-md text-on-surface m-0">${book.isbn}</p>
            </div>
            <div class="col">
              <p class="font-label-sm text-outline m-0 mb-1">Language</p>
              <p class="font-body-md text-on-surface m-0">${book.language}</p>
            </div>
            <div class="col">
              <p class="font-label-sm text-outline m-0 mb-1">Publisher</p>
              <p class="font-body-md text-on-surface m-0">${book.publisher}</p>
            </div>
            <div class="col">
              <p class="font-label-sm text-outline m-0 mb-1">Pages</p>
              <p class="font-body-md text-on-surface m-0">${book.pages}</p>
            </div>
            <div class="col">
              <p class="font-label-sm text-outline m-0 mb-1">Year</p>
              <p class="font-body-md text-on-surface m-0">${book.publishedYear}</p>
            </div>
            <div class="col">
              <p class="font-label-sm text-outline m-0 mb-1">Price</p>
              <p class="font-body-md text-primary fw-bold m-0">$${book.price}</p>
            </div>
          </div>
          <div class="mb-5">
            <h2 class="font-headline-md text-on-background mb-3">Summary</h2>
            <p class="font-body-lg text-on-surface-variant text-justify lh-18">${book.summary}</p>
          </div>
          <div class="row g-4">
            <div class="col-md-6">
              <div class="bg-surface-container-lowest border border-surface-variant rounded-lg p-4 h-100">
                <h3 class="font-headline-sm text-on-background mb-3">Strengths</h3>
                <ul class="list-unstyled m-0">${advHtml}</ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="bg-surface-container-lowest border border-surface-variant rounded-lg p-4 h-100">
                <h3 class="font-headline-sm text-on-background mb-3">Considerations</h3>
                <ul class="list-unstyled m-0">${disadvHtml}</ul>
              </div>
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

function setupReviews(bookId) {
    const html = `
      <section class="pt-section-padding border-top border-surface-variant">
        <h2 class="font-headline-md text-on-background mb-5 text-center">Reader Reviews</h2>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="bg-surface-container-low p-4 rounded-lg mb-5 border border-surface-variant">
                    <h4 class="font-headline-sm mb-3">Leave a Review</h4>
                    <form id="reviewForm">
                        <select class="form-select mb-3 bg-surface-container-lowest" id="reviewRating" required>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <textarea class="form-control mb-3 bg-surface-container-lowest" id="reviewText" required rows="3" placeholder="Share your thoughts..."></textarea>
                        <button type="submit" class="btn bg-primary text-on-primary rounded-pill px-4 hover-bg-primary-container">Submit Review</button>
                    </form>
                </div>
                <div id="reviewsList" class="d-flex flex-column gap-3"></div>
            </div>
        </div>
      </section>
    `;
    $('#reviewsSection').html(html);
    
    const storageKey = 'reviews_' + bookId;
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem(storageKey)) || [];
        let rHtml = '';
        reviews.reverse().forEach(r => {
            rHtml += `
            <div class="bg-surface-container-lowest border border-surface-variant p-4 rounded-lg">
                <div class="d-flex align-items-center mb-2">
                    <span class="font-label-md fw-bold me-2">${r.rating}.0</span>
                    <span class="material-symbols-outlined text-primary icon-16 icon-fill-1">star</span>
                </div>
                <p class="font-body-md text-on-surface-variant m-0">${r.text}</p>
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
