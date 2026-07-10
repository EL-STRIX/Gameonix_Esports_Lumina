// about.js - Dynamic Statistics

$(document).ready(function() {
    $.getJSON('../data/books.json', function(books) {
        if(books && books.length > 0) {
            $('#statBooks').text(books.length);
            
            const authors = new Set(books.map(b => b.author));
            $('#statAuthors').text(authors.size);
            
            const genres = new Set(books.map(b => b.genre));
            $('#statGenres').text(genres.size);
        }
    }).fail(function() {
        console.error("Failed to load books.json for stats.");
    });
});

