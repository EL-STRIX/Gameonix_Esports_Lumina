// checkout.js - Mock Checkout system

$(document).ready(function() {
    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        
        // Hide form, show loader
        $('#checkoutForm').hide();
        $('#loadingOverlay').removeClass('d-none');
        
        // Simulate network processing
        setTimeout(() => {
            $('#loadingOverlay').addClass('d-none');
            
            // Mock success
            sessionStorage.setItem('premium', 'true');
            
            $('.card-body').html(`
                <div class="text-center">
                    <span class="material-symbols-outlined display-1 text-success mb-3">check_circle</span>
                    <h2 class="text-success mb-3">Payment Successful!</h2>
                    <p class="lead">Welcome to LuminaBooks Premium.</p>
                    <p class="text-muted mb-4">You now have unlimited access to download classic ebooks during this session.</p>
                    <a href="../index.html" class="btn btn-primary btn-lg">Start Reading</a>
                </div>
            `);
            
            GlobalApp.showToast("Success", "Premium activated!", true);
            GlobalApp.setupPremiumUI();
            
        }, 2000);
    });
});
