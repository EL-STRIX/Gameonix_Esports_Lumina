// books.js - Handles Books Catalog & Featured Books

let booksData = [];

// Determine root
let isRootPage = true;
$('script').each(function() {
    if ($(this).attr('src') && $(this).attr('src').includes('../js/books.js')) {
        isRootPage = false;
    }
});

const dataUrl = isRootPage ? 'data/books.json' : '../data/books.json';
const pagesPath = isRootPage ? 'pages/' : '';
const rootPrefix = isRootPage ? '' : '../';

function loadBooks(isHome) {
    $.getJSON(dataUrl, function(data) {
        booksData = data;
        
        if (isHome) {
            renderFeatured(data);
        } else {
            populateGenres(data);
            handleSearchParams();
            renderCatalog(data);
            setupFilters();
        }
    }).fail(function() {
        console.error("Error loading books.json");
        GlobalApp.showToast("Error", "Failed to load book data.", false);
    });
}

function generateStars(rating) {
    let stars = '';
    const full = Math.floor(rating);
    for(let i=1; i<=5; i++) {
        stars += `<span class="material-symbols-outlined text-warning" style="font-size:16px; font-variation-settings: 'FILL' ${i <= full ? '1' : '0'}">star</span>`;
    }
    return stars;
}

function renderFeatured(books) {
    const featured = books.filter(b => b.featured).slice(0, 4);
    let html = '';
    
    featured.forEach(b => {
        html += `
            <div class="col-md-3 col-sm-6 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${rootPrefix}${b.coverImage}" class="card-img-top p-3" alt="${b.title}" style="height:250px; object-fit:contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate" title="${b.title}">${b.title}</h5>
                        <p class="card-text text-muted small mb-2">${b.author}</p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="text-primary fw-bold">$${b.price}</span>
                            <a href="${pagesPath}book-details.html?id=${b.id}" class="btn btn-sm btn-outline-primary">Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    $('#featuredGrid').html(html);
}

function renderCatalog(books) {
    const container = $('#catalogGrid');
    container.empty();
    
    if (books.length === 0) {
        container.html('<div class="col-12"><div class="alert alert-info">No books found matching your criteria.</div></div>');
        return;
    }
    
    books.forEach(b => {
        const premiumBadge = b.isPremiumRequired ? `<span class="badge bg-warning position-absolute top-0 end-0 m-2"><span class="material-symbols-outlined fs-6 align-middle">star</span> Premium</span>` : '';
        
        const card = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100 shadow-sm border-0 position-relative">
                    ${premiumBadge}
                    <img src="${rootPrefix}${b.coverImage}" class="card-img-top p-3" alt="${b.title}" style="height:280px; object-fit:contain;">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 align-self-start">${b.genre}</span>
                        <h5 class="card-title text-truncate" title="${b.title}">${b.title}</h5>
                        <p class="card-text text-muted small mb-2">By ${b.author}</p>
                        <div class="mb-3">${generateStars(b.rating)} <small class="text-muted">(${b.rating})</small></div>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="text-primary fw-bold fs-5">$${b.price}</span>
                            <a href="book-details.html?id=${b.id}" class="btn btn-primary btn-sm">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(card);
    });
}

function populateGenres(books) {
    const genres = [...new Set(books.map(b => b.genre))].sort();
    const select = $('#genreFilter');
    genres.forEach(g => {
        select.append(`<option value="${g}">${g}</option>`);
    });
}

function handleSearchParams() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
        $('#navSearchInput').val(q);
        // Will be filtered in setupFilters apply() automatically
    }
}

function setupFilters() {
    function applyFilters() {
        const genre = $('#genreFilter').val();
        const sort = $('#sortFilter').val();
        const search = $('#navSearchInput').val().toLowerCase().trim();
        
        let filtered = [...booksData];
        
        if (genre !== 'all') {
            filtered = filtered.filter(b => b.genre === genre);
        }
        
        if (search) {
            filtered = filtered.filter(b => b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search));
        }
        
        if (sort === 'price-low') {
            filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === 'price-high') {
            filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sort === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }
        
        renderCatalog(filtered);
    }
    
    $('#genreFilter, #sortFilter').on('change', applyFilters);
    $('#navSearchInput').on('keyup', applyFilters);
    
    // Initial apply for search params
    applyFilters();
}
