/* =========================================================================
   Sahtein — auth-guard.js
   Loaded on every page (right before </body>).

   What it does (buttons only):
   1. Any element with data-requires-login="true" → if not logged in,
      redirect to login.html?return=<current page>.
   2. If logged in and the button is a NAVIGATION action (favorites,
      profile, meal-planner, ai-recipe, healthy-day, community, admin,
      sign-out), redirect to the right page.

   No other app logic. No toast. No data storage.
   ========================================================================= */

(function () {
    'use strict';

    /* ---------- Login flag ---------- */
    function isLoggedIn() {
        try {
            return localStorage.getItem('sahtein_logged_in') === 'true';
        } catch (err) {
            return false;
        }
    }

    /* ---------- Current page (for ?return=) ---------- */
    function currentPage() {
        const parts = window.location.pathname.split('/');
        return parts[parts.length - 1] || 'index.html';
    }

    /* ---------- Where each navigation action should go ---------- */
    const NAVIGATION = {
        'favorites':    'favorites.html',
        'profile':      'profile.html',
        'meal-planner': 'meal-planner.html',
        'healthy-day':  'healthy-day.html',
        'community':    'community.html',
        'ai-recipe':    'ai-recipe.html',
        'admin':        'admin-dashboard.html'
    };

    /* ---------- Global click handler ---------- */
    document.addEventListener('click', function (event) {
        const el = event.target.closest('[data-action]');
        if (!el) return;

        const action   = el.dataset.action;
        const requires = el.dataset.requiresLogin === 'true';

        /* --- Not logged in + login required → go to login --- */
        if (requires && !isLoggedIn()) {
            event.preventDefault();
            const returnTo = encodeURIComponent(currentPage());
            window.location.href = 'login.html?return=' + returnTo;
            return;
        }

        /* --- Sign out --- */
        if (action === 'sign-out') {
            event.preventDefault();
            try { localStorage.removeItem('sahtein_logged_in'); } catch (err) {}
            window.location.href = 'index.html';
            return;
        }

        /* --- Navigation actions (only run if user is logged in for
               those that required it; otherwise plain navigation) --- */
        if (NAVIGATION[action]) {
            if (requires && !isLoggedIn()) {
                // already handled above, but be safe:
                event.preventDefault();
                const returnTo = encodeURIComponent(currentPage());
                window.location.href = 'login.html?return=' + returnTo;
                return;
            }
            event.preventDefault();
            window.location.href = NAVIGATION[action];
        }
    });
})();