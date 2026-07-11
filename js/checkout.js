// checkout.js

var oldOnloadCheckout = window.onload;
window.onload = function() {
    if (typeof oldOnloadCheckout === 'function') {
        oldOnloadCheckout();
    }

    // Modal logic
    var modal = document.getElementById('checkoutModal');
    var upgradeBtn = document.getElementById('upgradeBtn');
    
    // Some pages might not have a close btn with class btn-close, they use standard buttons or x
    var closeBtns = document.getElementsByClassName('btn-close');
    var closeBtn = closeBtns.length > 0 ? closeBtns[0] : null;

    if (upgradeBtn && modal) {
        upgradeBtn.onclick = function() {
            modal.style.display = 'flex';
        };
    }

    if (closeBtn && modal) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }

    window.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    var checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.onsubmit = function(e) {
            e.preventDefault();
            
            var btn = document.getElementById('checkoutSubmitBtn');
            var originalText = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = 'Processing...';
            
            setTimeout(function() {
                var ccNumberInput = document.getElementById('cc-number');
                var ccNum = ccNumberInput ? ccNumberInput.value.replace(/\s+/g, '') : '';
                
                if (ccNum === '0000000000000000') {
                    alert("Payment failed. Please try a different card.");
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                } else {
                    sessionStorage.setItem('premium', 'true');
                    btn.style.backgroundColor = 'var(--green)';
                    btn.style.borderColor = 'var(--green)';
                    btn.innerHTML = 'Success';
                    alert("Premium Activated Successfully!");
                    
                    setTimeout(function() {
                        window.location.href = '../index.html';
                    }, 1000);
                }
            }, 1500);
        };
    }
};
