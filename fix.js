const fs = require('fs');
['js/books.js', 'js/details.js'].forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/\\\`/g, '`');
    c = c.replace(/<li class=/g, "'<li class=");
    c = c.replace(/<\/li>\)/g, "</li>')");
    fs.writeFileSync(f, c);
});
