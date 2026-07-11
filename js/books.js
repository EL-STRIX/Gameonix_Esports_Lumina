let booksData = [];
let isRootPage = true;
$('script').each(function() {
    if ($(this).attr('src') && $(this).attr('src').includes('../js/books.js')) {
        isRootPage = false;
    }
});

const dataUrl = isRootPage ? 'data/books.json' : '../data/books.json';
const pagesPath = isRootPage ? 'pages/' : '';
const rootPrefix = isRootPage ? '' : '../';

let currentSearch = '';
let currentGenre = 'All';
let currentSort = 'Recommended';

function loadBooks(isHome) {
    $.getJSON(dataUrl, function(data) {
        booksData = data;
        if (isHome) {
            renderFeatured(data);
        } else {
            renderCatalog(data); 
            setupFilters();
        }
    });
}

function setupFilters() {
    $('input[placeholder*="Search"]').on('input', function(e) {
        currentSearch = $(this).val().toLowerCase();
        applyFilters();
    });

    $('.btn:contains("All"), .btn:contains("Fiction"), .btn:contains("Sci-Fi"), .btn:contains("History"), .btn:contains("Psychology")').on('click', function() {
        $('.btn').removeClass('bg-primary text-on-primary border-primary').addClass('bg-transparent text-on-surface border-surface-variant');
        $(this).removeClass('bg-transparent text-on-surface border-surface-variant').addClass('bg-primary text-on-primary border-primary');
        currentGenre = $(this).text();
        applyFilters();
    });

    $('select').on('change', function() {
        currentSort = $(this).val();
        applyFilters();
    });
}

function applyFilters() {
    let filtered = booksData.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(currentSearch) || b.author.toLowerCase().includes(currentSearch) || b.genre.toLowerCase().includes(currentSearch);
        const matchesGenre = currentGenre === 'All' || b.genre === currentGenre;
        return matchesSearch && matchesGenre;
    });

    if (currentSort === 'Newest') {
        filtered.sort((a, b) => b.publishedYear - a.publishedYear);
    } else if (currentSort === 'Highest Rated') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderCatalog(filtered);
}

function renderFeatured(books) {
    const featured = books.filter(b => b.featured).slice(0, 4);
    if (featured.length < 4) return;
    
    const largeBook = featured[0];
    const smallBooks = featured.slice(1, 4);

    let html = `
    <!-- Large Feature Card -->
    <div class="featured-large-card" onclick="window.location.href='${pagesPath}book-details.html?id=${largeBook.id}'" style="cursor: pointer;">
        <div class="featured-large-image">
            <img class="book-cover" src="${rootPrefix}${largeBook.coverImage}" alt="${largeBook.title}"/>
        </div>
        <div class="featured-large-content">
            <div class="badge">Editor's Choice</div>
            <h3 style="font-size: 20px; margin-bottom: 8px;">${largeBook.title}</h3>
            <p style="color: var(--text-muted); margin-bottom: 16px;">by ${largeBook.author}</p>
            <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 14px;">${largeBook.summary}</p>
            <button class="btn btn-outline" style="align-self: flex-start;">Read Extract</button>
        </div>
    </div>
    
    <!-- Small Feature Cards Grid -->
    <div class="featured-small-grid">
    `;

    smallBooks.forEach(b => {
        html += `
        <div class="featured-small-card" onclick="window.location.href='${pagesPath}book-details.html?id=${b.id}'" style="cursor: pointer;">
            <div class="featured-small-image">
                <img class="book-cover" src="${rootPrefix}${b.coverImage}" alt="${b.title}"/>
            </div>
            <div>
                <h4 style="font-size: 16px; margin-bottom: 4px;">${b.title}</h4>
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">by ${b.author}</p>
                <div style="font-size: 12px; font-weight: 500; color: var(--primary); display: flex; align-items: center; gap: 4px;">
                    <span class="material-symbols-outlined" style="font-size: 16px;">star</span> ${b.rating}
                </div>
            </div>
        </div>
        `;
    });

    html += `</div>`;
    $('#featuredGrid').html(html);
}

function renderCatalog(books) {
    const container = $('#catalogGrid');
    container.empty();
    
    books.forEach(b => {
        let badge = b.bestseller ? '<div class="book-badge">Bestseller</div>' : '';
        if (b.featured && !b.bestseller) {
            badge = '<div class="book-badge" style="background: var(--primary); color: white;">Featured</div>';
        }
        
        const html = `
        <article class="book-card" onclick="window.location.href='${pagesPath}book-details.html?id=${b.id}'">
            <div class="book-cover-container">
                <img class="book-cover" src="${rootPrefix}${b.coverImage}" alt="${b.title}"/>
                ${badge}
            </div>
            <div class="book-info">
                <h3 class="book-title">${b.title}</h3>
                <p class="book-author">${b.author}</p>
                <div class="book-rating">
                    <span class="material-symbols-outlined" style="color: var(--primary); font-size: 16px;">star</span>
                    <span>${b.rating}</span>
                    <span style="color: var(--text-muted); margin-left: 4px; font-size: 12px;">(${Math.floor(Math.random()*200) + 10})</span>
                </div>
            </div>
        </article>
        `;
        container.append(html);
    });
}

$(document).ready(function() {
    if ($('#featuredGrid').length > 0) {
        loadBooks(true);
    } else if ($('#catalogGrid').length > 0) {
        loadBooks(false);
    }
});
