// main.js - Global Logic

// Ensure jQuery is loaded
if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded!');
}

const GlobalApp = {
    init: function() {
        this.setupPremiumUI();
        this.setupSearch();
    },

    showToast: function(title, message, isSuccess = true) {
        $('#toastTitle').text(title);
        $('#toastMessage').text(message);
        
        const toastEl = document.getElementById('globalToast');
        toastEl.classList.remove('bg-success', 'bg-danger', 'text-white');
        
        if (isSuccess) {
            toastEl.classList.add('bg-success', 'text-white');
        } else {
            toastEl.classList.add('bg-danger', 'text-white');
        }

        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    },

    isPremium: function() {
        return sessionStorage.getItem('premium') === 'true';
    },

    setupPremiumUI: function() {
        if (this.isPremium()) {
            $('#premiumNavBadge').html('<span class="badge bg-success fs-6"><span class="material-symbols-outlined align-middle fs-5 me-1">workspace_premium</span>Premium Member</span>');
        }
    },

    setupSearch: function() {
        $('#navSearchForm').on('submit', function(e) {
            e.preventDefault();
            const query = $('#navSearchInput').val().trim();
            if (query) {
                // Determine root based on script tag
                let isRoot = true;
                $('script').each(function() {
                    if ($(this).attr('src') && $(this).attr('src').includes('../js/main.js')) {
                        isRoot = false;
                    }
                });
                
                const searchUrl = isRoot ? `pages/books.html?q=${encodeURIComponent(query)}` : `books.html?q=${encodeURIComponent(query)}`;
                window.location.href = searchUrl;
            }
        });
    }
};

$(document).ready(function() {
    GlobalApp.init();
});
