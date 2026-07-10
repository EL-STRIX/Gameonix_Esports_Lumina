const fs = require('fs'); 
const colors = ['#8A4B5E', '#334A53', '#6E3446', '#4B626B', '#6F585F', '#564148', '#27171D', '#847376', '#39091B', '#334A53']; 
const titles = [
  "To Kill a Mockingbird",
  "1984",
  "The Lord of the Rings",
  "Pride and Prejudice",
  "The Great Gatsby",
  "The Book Thief",
  "The Hobbit",
  "Little Women",
  "Crime and Punishment",
  "Count of Monte Cristo"
];

for(let i=1; i<=10; i++) { 
    const titleLines = titles[i-1].match(/(.{1,15})(?:\s|$)/g) || [titles[i-1]];
    let textElements = '';
    titleLines.forEach((line, idx) => {
        textElements += `<text x="50%" y="${45 + (idx * 10)}%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="bold" font-size="32">${line.trim()}</text>`;
    });

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect width="400" height="600" fill="${colors[i-1]}"/>${textElements}</svg>`; 
    fs.writeFileSync(`assets/images/books/book${i}.svg`, svg); 
}
