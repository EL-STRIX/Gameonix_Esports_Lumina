// checkout.js

$(document).ready(function() {
    // Modal logic
    const modal = document.getElementById('checkoutModal');
    const upgradeBtn = document.getElementById('upgradeBtn');
    const closeBtn = document.querySelector('.btn-close');

    if(upgradeBtn) {
        upgradeBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    $('#checkoutForm').on('submit', function(e) {
        e.preventDefault();
        
        const btn = $('#checkoutSubmitBtn');
        const originalText = btn.html();
        
        btn.prop('disabled', true).html('Processing...');
        
        setTimeout(() => {
            const ccNum = $('#cc-number').val().replace(/\s+/g, '');
            if (ccNum === '0000000000000000') {
                alert("Payment failed. Please try a different card.");
                btn.prop('disabled', false).html(originalText);
            } else {
                sessionStorage.setItem('premium', 'true');
                btn.css('background-color', 'var(--green)');
                btn.html('Success');
                alert("Premium Activated Successfully!");
                
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            }
        }, 1500);
    });
});
