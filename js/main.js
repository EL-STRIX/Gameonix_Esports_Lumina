// main.js - Global Logic

var GlobalApp = {
    init: function() {
        this.setupPremiumUI();
        this.setupSearch();
    },

    isPremium: function() {
        return sessionStorage.getItem('premium') === 'true';
    },

    setupPremiumUI: function() {
        if (this.isPremium()) {
            var badgeContainer = document.getElementById('premiumNavBadge');
            if (badgeContainer) {
                badgeContainer.innerHTML = '<span style="background-color: var(--green); color: white; padding: 4px 8px; border-radius: 4px;"><span>💎</span>Premium Member</span>';
            }
        }
    },

    setupSearch: function() {
        var form = document.getElementById('navSearchForm');
        if (form) {
            form.onsubmit = function(e) {
                e.preventDefault();
                var searchInput = document.getElementById('navSearchInput');
                if (searchInput) {
                    var query = searchInput.value.trim();
                    if (query !== '') {
                        var isRoot = true;
                        var scripts = document.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('../js/main.js') !== -1) {
                                isRoot = false;
                            }
                        }
                        
                        var searchUrl = isRoot ? 'pages/books.html?q=' + encodeURIComponent(query) : 'books.html?q=' + encodeURIComponent(query);
                        window.location.href = searchUrl;
                    }
                }
            };
        }
    }
};

window.onload = function() {
    GlobalApp.init();
};
