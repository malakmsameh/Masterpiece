/* =========================================================================
   Sahtein — auth-guard.js
   Loaded on every page (right before </body>).

   What it does:
   1. Any element with data-requires-login="true" → if not logged in,
      redirect to login.html?return=<current page>.
   2. Handles sign-out, exit-admin, and NAVIGATION actions.
   3. Works whether pages are at the site root OR inside /pages/.
   ========================================================================= */

(function () {
    'use strict';

    /* ---------- Where is the site root relative to this page? ---------- */
    /* If we're inside /pages/, links to index.html need "../index.html".  */
    /* If we're at the root, they need "index.html".                      */
    function isInPagesFolder() {
        return /\/pages\//.test(window.location.pathname);
    }

    function rootPrefix() {
        return isInPagesFolder() ? '../' : '';
    }

    /* ---------- Login flag ---------- */
    function isLoggedIn() {
        try {
            return localStorage.getItem('sahtein_logged_in') === 'true';
        } catch (err) {
            return false;
        }
    }

    /* ---------- Current page (for ?return=) ---------- */
    /* Returns just the filename, e.g. "profile.html" or "index.html". */
    function currentPage() {
        const parts = window.location.pathname.split('/');
        return parts[parts.length - 1] || 'index.html';
    }

    /* ---------- Where each navigation action should go ---------- */
    /* All sibling pages live next to auth-guard's callers (in /pages/),  */
    /* so relative filenames are enough. index.html is one level up.     */
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
            window.location.href = rootPrefix() + 'index.html';
            return;
        }

        /* --- Exit admin (leaves admin workspace, back to home) --- */
        if (action === 'exit-admin') {
            event.preventDefault();
            window.location.href = rootPrefix() + 'index.html';
            return;
        }

        /* --- Navigation actions --- */
        if (NAVIGATION[action]) {
            event.preventDefault();
            window.location.href = NAVIGATION[action];
        }
    });
})();