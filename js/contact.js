// contact.js - Contact form submission logic

$(document).ready(function() {
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Form is natively validated by HTML5 'required' attributes before this triggers
        
        const name = $('#contactName').val();
        
        // Mock sending message
        const btn = $(this).find('button[type="submit"]');
        const originalText = btn.text();
        btn.prop('disabled', true).text('Sending...');
        
        setTimeout(() => {
            btn.prop('disabled', false).text(originalText);
            
            // Clear form
            this.reset();
            
            // Show toast
            GlobalApp.showToast("Message Sent", `Thank you ${name}, we have received your message and will get back to you soon.`, true);
        }, 1200);
    });
});
