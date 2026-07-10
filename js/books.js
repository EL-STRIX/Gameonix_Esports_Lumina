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

function loadBooks(isHome) {
    $.getJSON(dataUrl, function(data) {
        booksData = data;
        if (isHome) {
            renderFeatured(data);
        } else {
            renderCatalog(data);
        }
    });
}

function renderFeatured(books) {
    const featured = books.filter(b => b.featured).slice(0, 4);
    if (featured.length < 4) return;
    
    const largeBook = featured[0];
    const smallBooks = featured.slice(1, 4);

    let html = \
    <!-- Large Feature Card -->
    <div class="col-md-8">
        <div class="bg-surface rounded-xl overflow-hidden book-card-shadow d-flex flex-column flex-md-row cursor-pointer h-100" onclick="window.location.href='\book-details.html?id=\'">
            <div class="w-100 w-md-50 aspect-1-1-2">
                <img class="w-100 h-100 object-cover" src="\\" alt="\"/>
            </div>
            <div class="w-100 w-md-50 p-4 d-flex flex-column justify-content-center bg-surface">
                <span class="d-inline-flex px-3 py-1 bg-secondary-container text-on-secondary-container font-label-sm rounded-pill mb-3" style="width: max-content;">Editor's Choice</span>
                <h3 class="font-headline-sm text-on-background mb-2">\</h3>
                <p class="font-label-md text-on-surface-variant mb-3">by \</p>
                <p class="font-body-md text-on-surface-variant line-clamp-3 mb-3">\</p>
                <button class="btn bg-secondary-fixed text-primary font-label-md rounded-pill px-4 py-2 hover-bg-primary-container" style="width: max-content;">Read Extract</button>
            </div>
        </div>
    </div>
    
    <!-- Small Feature Cards Grid -->
    <div class="col-md-4">
        <div class="d-flex flex-column gap-4 h-100">
    \;

    smallBooks.forEach(b => {
        html += \
        <div class="bg-surface rounded-xl p-3 book-card-shadow d-flex align-items-center gap-3 cursor-pointer flex-grow-1" onclick="window.location.href='\book-details.html?id=\'">
            <div class="aspect-1-1-5 rounded-lg overflow-hidden flex-shrink-0" style="width: 72px;">
                <img class="w-100 h-100 object-cover" src="\\" alt="\"/>
            </div>
            <div class="d-flex flex-column justify-content-center">
                <h4 class="font-label-md fw-bold text-on-background line-clamp-2 m-0 mb-1">\</h4>
                <p class="font-label-sm text-on-surface-variant m-0 mb-2">by \</p>
                <div class="d-flex align-items-center text-primary font-label-sm">
                    <span class="material-symbols-outlined me-1" style="font-size: 16px; font-variation-settings: 'FILL' 1;">star</span> \
                </div>
            </div>
        </div>
        \;
    });

    html += \</div></div>\;
    $('#featuredGrid').html(html);
}

function renderCatalog(books) {
    const container = $('#catalogGrid');
    container.empty();
    
    books.forEach(b => {
        let badge = b.bestseller ? '<div class="position-absolute top-0 start-0 m-2 bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label-sm text-uppercase">Bestseller</div>' : '';
        if (b.featured && !b.bestseller) {
            badge = '<div class="position-absolute top-0 start-0 m-2 bg-primary text-on-primary px-2 py-1 rounded font-label-sm text-uppercase">Featured</div>';
        }
        
        const html = \
        <div class="col">
            <article class="bg-surface rounded-lg shadow-level-1 card-hover-lift d-flex flex-column h-100 overflow-hidden border border-surface-variant cursor-pointer" onclick="window.location.href='\book-details.html?id=\'">
                <div class="position-relative w-100 bg-surface-container-low" style="padding-top: 150%;">
                    <img class="position-absolute top-0 start-0 w-100 h-100 object-cover" src="\\" alt="\"/>
                    \
                </div>
                <div class="p-3 d-flex flex-column flex-grow-1">
                    <h3 class="font-headline-sm text-on-background mb-1 line-clamp-2">\</h3>
                    <p class="font-body-md text-on-surface-variant mb-3">\</p>
                    <div class="d-flex align-items-center gap-1 mt-auto">
                        <span class="material-symbols-outlined text-surface-tint" style="font-size: 16px; font-variation-settings: 'FILL' 1;">star</span>
                        <span class="font-label-sm text-on-background">\</span>
                        <span class="font-label-sm text-outline ms-1">(\)</span>
                    </div>
                </div>
            </article>
        </div>
        \;
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
