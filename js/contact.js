// contact.js

var oldOnloadContact = window.onload;
window.onload = function() {
    if (typeof oldOnloadContact === 'function') {
        oldOnloadContact();
    }

    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            alert("Message Sent Successfully! We will be in touch.");
            contactForm.reset();
        };
    }
};
