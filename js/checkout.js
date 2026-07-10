// checkout.js

$(document).ready(function() {
    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        
        const btn = $('#checkoutSubmitBtn');
        const originalText = btn.html();
        
        // Validation is handled by HTML5, if we reach here, basic pattern matched.
        // Simulate loading state
        btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Processing...');
        
        // Simulate network delay
        setTimeout(() => {
            // Simulate random failure (10% chance) just to show error state, or just force success.
            // PRD says simulate payment with success/failure states. Let's do 100% success for ease of use, 
            // but we can simulate failure if the card number is exactly '0000000000000000'
            const ccNum = $('#cc-number').val().replace(/\s+/g, '');
            if (ccNum === '0000000000000000') {
                // Failure State
                showToast("Payment failed. Please try a different card.", "danger");
                btn.prop('disabled', false).html(originalText);
            } else {
                // Success State
                sessionStorage.setItem('premium', 'true');
                btn.removeClass('bg-primary').addClass('bg-success').html('<span class="material-symbols-outlined me-2">check_circle</span> Success');
                showToast("Premium Activated Successfully!", "success");
                
                // Redirect correctly after 2 seconds
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 2000);
            }
        }, 1500);
    });
    
    function showToast(message, type) {
        const toastEl = $('#checkoutToast');
        const toastMsg = $('#checkoutToastMsg');
        
        toastEl.removeClass('bg-primary bg-success bg-danger').addClass('bg-' + type);
        toastMsg.text(message);
        
        const toast = new bootstrap.Toast(toastEl[0]);
        toast.show();
    }
});
