var booksData = [];
var isRootPage = true;

var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('../js/books.js') !== -1) {
        isRootPage = false;
    }
}

var dataUrl = isRootPage ? 'data/books.json' : '../data/books.json';
var pagesPath = isRootPage ? 'pages/' : '';
var rootPrefix = isRootPage ? '' : '../';

var currentSearch = '';
var currentGenre = 'All';
var currentSort = 'Recommended';

function loadBooks(isHome) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            booksData = JSON.parse(xhr.responseText);
            if (isHome) {
                renderFeatured(booksData);
            } else {
                renderCatalog(booksData); 
                setupFilters();
            }
        }
    };
    xhr.send();
}

function setupFilters() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('placeholder') && inputs[i].getAttribute('placeholder').indexOf('Search') !== -1) {
            inputs[i].oninput = function(e) {
                currentSearch = this.value.toLowerCase();
                applyFilters();
            };
        }
    }

    var genreFiltersContainer = document.querySelector('.genre-filters');
    if (genreFiltersContainer) {
        var buttons = genreFiltersContainer.getElementsByTagName('button');
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].onclick = function() {
                for (var k = 0; k < buttons.length; k++) {
                    buttons[k].className = 'genre-btn';
                }
                this.className = 'genre-btn active';
                currentGenre = this.innerHTML || this.innerText;
                applyFilters();
            };
        }
    }

    var selects = document.getElementsByTagName('select');
    for (var l = 0; l < selects.length; l++) {
        selects[l].onchange = function() {
            currentSort = this.value;
            applyFilters();
        };
    }
}

function applyFilters() {
    var filtered = [];
    for (var i = 0; i < booksData.length; i++) {
        var b = booksData[i];
        var titleMatches = b.title.toLowerCase().indexOf(currentSearch) !== -1;
        var authorMatches = b.author.toLowerCase().indexOf(currentSearch) !== -1;
        var genreMatches = b.genre.toLowerCase().indexOf(currentSearch) !== -1;
        
        var matchesSearch = titleMatches || authorMatches || genreMatches;
        var matchesGenre = currentGenre === 'All' || b.genre === currentGenre;
        
        if (matchesSearch && matchesGenre) {
            filtered.push(b);
        }
    }

    if (currentSort === 'Newest') {
        filtered.sort(function(a, b) {
            return b.publishedYear - a.publishedYear;
        });
    } else if (currentSort === 'Highest Rated') {
        filtered.sort(function(a, b) {
            return b.rating - a.rating;
        });
    }

    renderCatalog(filtered);
}

function renderFeatured(books) {
    var featured = [];
    for (var i = 0; i < books.length; i++) {
        if (books[i].featured) {
            featured.push(books[i]);
            if (featured.length === 4) break;
        }
    }
    
    if (featured.length < 4) return;
    
    var largeBook = featured[0];
    var smallBooks = [];
    for (var j = 1; j < 4; j++) {
        smallBooks.push(featured[j]);
    }

    var html = '';
    html += '<div class="featured-large-card" onclick="window.location.href=\'' + pagesPath + 'book-details.html?id=' + largeBook.id + '\'" style="cursor: pointer;">';
    html += '  <div class="featured-large-image">';
    html += '    <img class="book-cover" src="' + rootPrefix + largeBook.coverImage + '" alt="' + largeBook.title + '"/>';
    html += '  </div>';
    html += '  <div class="featured-large-content">';
    html += '    <div class="badge">Editor\'s Choice</div>';
    html += '    <h3 style="font-size: 20px; margin-bottom: 8px;">' + largeBook.title + '</h3>';
    html += '    <p style="color: var(--text-muted); margin-bottom: 16px;">by ' + largeBook.author + '</p>';
    html += '    <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 14px;">' + largeBook.summary + '</p>';
    html += '    <button class="btn btn-outline" style="align-self: flex-start;">Read Extract</button>';
    html += '  </div>';
    html += '</div>';
    html += '<div class="featured-small-grid">';

    for (var k = 0; k < smallBooks.length; k++) {
        var b = smallBooks[k];
        html += '<div class="featured-small-card" onclick="window.location.href=\'' + pagesPath + 'book-details.html?id=' + b.id + '\'" style="cursor: pointer;">';
        html += '  <div class="featured-small-image">';
        html += '    <img class="book-cover" src="' + rootPrefix + b.coverImage + '" alt="' + b.title + '"/>';
        html += '  </div>';
        html += '  <div>';
        html += '    <h4 style="font-size: 16px; margin-bottom: 4px;">' + b.title + '</h4>';
        html += '    <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">by ' + b.author + '</p>';
        html += '    <div style="font-size: 12px; font-weight: 500; color: var(--primary); display: flex; align-items: center; gap: 4px;">';
        html += '      <span>⭐</span> ' + b.rating;
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }

    html += '</div>';
    
    var featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        featuredGrid.innerHTML = html;
    }
}

function renderCatalog(books) {
    var container = document.getElementById('catalogGrid');
    if (!container) return;
    
    container.innerHTML = '';
    var html = '';
    
    for (var i = 0; i < books.length; i++) {
        var b = books[i];
        var badge = '';
        if (b.bestseller) {
            badge = '<div class="book-badge">Bestseller</div>';
        } else if (b.featured) {
            badge = '<div class="book-badge" style="background: var(--primary); color: white;">Featured</div>';
        }
        
        var randomReviews = Math.floor(Math.random() * 200) + 10;
        
        html += '<article class="book-card" onclick="window.location.href=\'' + pagesPath + 'book-details.html?id=' + b.id + '\'">';
        html += '  <div class="book-cover-container">';
        html += '    <img class="book-cover" src="' + rootPrefix + b.coverImage + '" alt="' + b.title + '"/>';
        html += '    ' + badge;
        html += '  </div>';
        html += '  <div class="book-info">';
        html += '    <h3 class="book-title">' + b.title + '</h3>';
        html += '    <p class="book-author">' + b.author + '</p>';
        html += '    <div class="book-rating">';
        html += '      <span>⭐</span>';
        html += '      <span>' + b.rating + '</span>';
        html += '      <span style="color: var(--text-muted); margin-left: 4px; font-size: 12px;">(' + randomReviews + ')</span>';
        html += '    </div>';
        html += '  </div>';
        html += '</article>';
    }
    container.innerHTML = html;
}

var oldOnload = window.onload;
window.onload = function() {
    if (typeof oldOnload === 'function') {
        oldOnload();
    }
    
    if (document.getElementById('featuredGrid')) {
        loadBooks(true);
    } else if (document.getElementById('catalogGrid')) {
        loadBooks(false);
    }
};
