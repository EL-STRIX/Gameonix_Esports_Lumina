// contact.js

$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault(); // Prevent page reload
        
        // Validation is handled by HTML5 'required' attributes.
        // If we reach here, the form is valid.
        
        const toastEl = $('#contactToast');
        const toast = new bootstrap.Toast(toastEl[0]);
        toast.show();
        
        // Reset the form after sending
        $('#contactForm')[0].reset();
    });
});
