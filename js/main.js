// main.js - Global Logic

var GlobalApp = {
    init: function() {
        this.setupPremiumUI();
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
    }
};

window.onload = function() {
    GlobalApp.init();
};
