const fs = require('fs'); 
const colors = ['#8A4B5E', '#334A53', '#6E3446', '#4B626B', '#6F585F', '#564148', '#27171D', '#847376', '#39091B', '#334A53']; 
for(let i=1; i<=10; i++) { 
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect width="400" height="600" fill="${colors[i-1]}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="40">Book ${i}</text></svg>`; 
    fs.writeFileSync(`Lumina/assets/images/books/book${i}.svg`, svg); 
}
