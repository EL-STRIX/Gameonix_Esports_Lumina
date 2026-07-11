// about.js - Dynamic Statistics

var oldOnloadAbout = window.onload;
window.onload = function() {
    if (typeof oldOnloadAbout === 'function') {
        oldOnloadAbout();
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/books.json', true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var books = JSON.parse(xhr.responseText);
            if (books && books.length > 0) {
                var statBooks = document.getElementById('statBooks');
                if (statBooks) {
                    statBooks.innerHTML = books.length;
                }
                
                var authors = [];
                var genres = [];
                
                for (var i = 0; i < books.length; i++) {
                    var authorExists = false;
                    for (var j = 0; j < authors.length; j++) {
                        if (authors[j] === books[i].author) {
                            authorExists = true;
                            break;
                        }
                    }
                    if (!authorExists) {
                        authors.push(books[i].author);
                    }
                    
                    var genreExists = false;
                    for (var k = 0; k < genres.length; k++) {
                        if (genres[k] === books[i].genre) {
                            genreExists = true;
                            break;
                        }
                    }
                    if (!genreExists) {
                        genres.push(books[i].genre);
                    }
                }
                
                var statAuthors = document.getElementById('statAuthors');
                if (statAuthors) {
                    statAuthors.innerHTML = authors.length;
                }
                
                var statGenres = document.getElementById('statGenres');
                if (statGenres) {
                    statGenres.innerHTML = genres.length;
                }
            }
        } else {
            console.error("Failed to load books.json for stats.");
        }
    };
    xhr.onerror = function() {
        console.error("Failed to load books.json for stats.");
    };
    xhr.send();
};
