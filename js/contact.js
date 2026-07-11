// contact.js

$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        // Validation is handled by HTML5 'required' attributes.
        // If we reach here, the form is valid.
        
        alert("Message Sent Successfully! We will be in touch.");
        
        // Reset the form after sending
        $('#contactForm')[0].reset();
    });
});
