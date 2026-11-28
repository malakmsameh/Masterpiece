/* =========================================================================
   Sahtein — shared.js
   Loaded on every page (right before </body>).
   - Highlights the current nav link.
   - Wires up the mobile hamburger menu.
   - Provides a global showToast() to replace alert().
   - Provides a catch-all toast for unhandled data-action buttons.
   - Syncs the header avatar from localStorage.
   - Handles toggle-favorite globally (heart icon toggle on any card).
   ========================================================================= */
(function () {
    'use strict';

    /* ---------- Login flag (shared) ---------- */
    function isLoggedIn() {
        try {
            return localStorage.getItem('sahtein_logged_in') === 'true';
        } catch (err) {
            return false;
        }
    }

    /* ---------- Highlight the current nav link ---------- */
    /* Works whether pages live at the root OR inside /pages/. */
    const here = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        const raw = (link.getAttribute('href') || '').toLowerCase();
        if (!raw) return;

        // strip folder prefixes and .html so "index.html" matches both
        // "index.html" and "../index.html"
        const target = raw.split('/').pop();
        if (target === here) {
            link.classList.add('active');
        }
    });

    /* ---------- Styled header icon tooltips ---------- */
    document.querySelectorAll('.header-actions .icon-btn').forEach(function (button) {
        const action = button.dataset.action;
        let label = button.getAttribute('title');

        if (action === 'profile') {
            label = isLoggedIn() ? 'Your profile' : 'Sign in to view profile';
        } else if (action === 'favorites') {
            label = isLoggedIn() ? 'Saved recipes' : 'Sign in to save favorites';
        }

        if (!label) return;
        button.setAttribute('data-tooltip', label);
        button.setAttribute('aria-label', label);
        button.removeAttribute('title');
    });

    /* ---------- Mobile hamburger menu ---------- */
    const header = document.querySelector('.site-header');
    if (header) {
        let toggle = header.querySelector('.nav-toggle');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'nav-toggle';
            toggle.setAttribute('aria-label', 'Toggle menu');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

            const actions = header.querySelector('.header-actions');
            if (actions && actions.parentNode) {
                actions.parentNode.insertBefore(toggle, actions.nextSibling);
            } else {
                const inner = header.querySelector('.header-inner');
                if (inner) inner.appendChild(toggle);
            }
        }

        function setOpen(isOpen) {
            header.classList.toggle('nav-open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = isOpen
                    ? 'fa-solid fa-xmark'
                    : 'fa-solid fa-bars';
            }
        }

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            setOpen(!header.classList.contains('nav-open'));
        });

        header.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () { setOpen(false); });
        });

        document.addEventListener('click', function (e) {
            if (header.classList.contains('nav-open') && !header.contains(e.target)) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) setOpen(false);
        });
    }

    /* ---------- Global toast helper ---------- */
    function ensureToastElement() {
        let toast = document.getElementById('sahteinToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'sahteinToast';
            toast.className = 'sahtein-toast';
            toast.innerHTML = '<i class="fa-solid fa-circle-check"></i><span></span>';
            document.body.appendChild(toast);
        }
        return toast;
    }

    window.showToast = function (message, isError) {
        const toast = ensureToastElement();
        const msg = toast.querySelector('span');
        const icon = toast.querySelector('i');
        msg.textContent = message;
        toast.classList.toggle('error', !!isError);
        icon.className = isError
            ? 'fa-solid fa-circle-exclamation'
            : 'fa-solid fa-circle-check';
        toast.classList.add('show');

        clearTimeout(window.__sahteinToastTimer);
        window.__sahteinToastTimer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2800);
    };

    /* ---------- Global avatar sync ---------- */
    function getStoredProfile(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || {};
        } catch (err) {
            return {};
        }
    }

    function renderHeaderAvatars() {
        const user = getStoredProfile('sahtein_user');
        const admin = getStoredProfile('sahtein_admin');
        const src = isLoggedIn() ? (user.avatar || admin.avatar || '') : '';

        document.querySelectorAll('.header-actions .icon-btn[data-action="profile"]').forEach(function (btn) {
            if (src) {
                const image = document.createElement('img');
                image.src = src;
                image.alt = 'Profile';
                image.style.cssText = 'width:26px;height:26px;border-radius:50%;object-fit:cover;display:block;';
                btn.replaceChildren(image);
            } else {
                btn.innerHTML = '<i class="fa-regular fa-user"></i>';
            }
        });
    }

    window.renderHeaderAvatars = renderHeaderAvatars;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderHeaderAvatars);
    } else {
        renderHeaderAvatars();
    }

    /* ---------- Gate the "Admin workspace" quick-link (profile page) ---------- */
    /* The admin link is shown on profile.html. Hide it for non-admin users.  */
    document.querySelectorAll('[data-action="admin"]').forEach(function (el) {
        const admin = getStoredProfile('sahtein_admin');
        const hasAdmin = !!(admin && admin.username);
        if (!hasAdmin) {
            el.style.display = 'none';
            el.setAttribute('aria-hidden', 'true');
            el.setAttribute('tabindex', '-1');
        }
    });

    /* ---------- Global toggle-favorite handler ---------- */
    /* On any page with a recipe card heart, toggle the heart icon and      */
    /* show a toast. Pages with their own toggle-favorite handler (e.g.     */
    /* favorites.html, which removes the card) mark the event as handled    */
    /* by calling stopImmediatePropagation, so this won't run there.        */
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-action="toggle-favorite"]');
        if (!btn) return;
        if (e.defaultPrevented) return;

        // favorites.html handles its own removal — skip here
        if (window.__sahteinFavoriteHandledByPage) return;

        // If not logged in, let auth-guard handle the redirect
        if (!isLoggedIn()) return;

        e.preventDefault();
        e.stopPropagation();

        const icon = btn.querySelector('i');
        if (!icon) return;

        const isSaved = icon.classList.contains('fa-solid');
        if (isSaved) {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            if (window.showToast) window.showToast('Removed from favorites.');
        } else {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            if (window.showToast) window.showToast('Saved to favorites.');
        }
    });

    /* ---------- Catch-all toast for unhandled demo actions ---------- */
    /* Any button with data-action that isn't picked up by another handler  */
    /* (auth-guard.js or page-specific JS) gets a friendly toast instead    */
    /* of doing nothing. If another handler called preventDefault() or      */
    /* stopImmediatePropagation() first, we skip.                          */
    const HANDLED_ELSEWHERE = [
        // ---------- auth-guard.js ----------
        'sign-out', 'exit-admin',
        'favorites', 'profile', 'meal-planner', 'healthy-day',
        'community', 'ai-recipe', 'admin',

        // ---------- admin-dashboard.html ----------
        'export-activity',
        'approve-recipe', 'reject-recipe', 'view-recipe',
        'approve-publish', 'reject-with-reason',
        'filter-pending', 'open-guidelines',
        'view-post', 'view-thread', 'remove-post',
        'warn-user', 'dismiss-report',

        // ---------- admin-recipes.html ----------
        'open-add-recipe', 'edit-recipe', 'close-recipe-modal', 'save-recipe',
        'delete-recipe', 'close-delete-modal', 'confirm-delete-recipe',
        'filter-recipes', 'export-recipes', 'bulk-recipes',

        // ---------- admin-categories.html ----------
        'switch-category-tab', 'open-add-category', 'edit-category',
        'delete-category', 'close-category-modal', 'save-category',
        'close-delete-modal', 'confirm-delete-category',

        // ---------- admin-ai-recipes.html ----------
        'publish-ai', 'unpublish-ai', 'reject-ai', 'delete-ai',
        'review-ai', 'view-ai', 'view-ai-reason',
        'filter-ai-status', 'bulk-ai-actions', 'export-ai-report',

        // ---------- admin-users.html ----------
        'view-user', 'message-user', 'suspend-user', 'restore-user',
        'delete-user', 'search-users', 'export-users', 'bulk-users',

        // ---------- admin-ingredients.html ----------
        'add-ingredient', 'edit-ingredient', 'delete-ingredient',
        'filter-ingredients', 'export-ingredients', 'bulk-ingredients',

        // ---------- ai-recipe.html (inline) ----------
        'generate-recipe',

        // ---------- favorites.html (inline) ----------
        'toggle-favorite',

        // ---------- profile.html (inline) ----------
        'edit-preferences',

        // ---------- recipe-detail.html (inline) ----------
        'save-favorite', 'add-to-plan', 'write-review', 'submit-review',

        // ---------- pages with only a page-level handler on some actions ----------
        // These get a toast on pages that lack a handler, which is the
        // intended behavior. Add them here so they don't ALSO try to
        // trigger a second toast via this catch-all on top of the page's
        // own toast (defensive only — no real double-fire happens today).
        'add-recipe', 'create-post', 'edit-goals', 'edit-meal',
        'export-shopping-list', 'focus-post', 'join-community',
        'like-post', 'log-meal', 'personalised-plan', 'remove-meal',
        'reply-post', 'save-draft', 'save-nutrition-tips', 'share-post'
    ];

    document.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        if (e.defaultPrevented) return;

        const action = btn.dataset.action;
        if (!action) return;
        if (HANDLED_ELSEWHERE.indexOf(action) !== -1) return;

        // Only show a toast for genuinely unimplemented demo actions
        if (window.showToast) {
            window.showToast('This action is not available in the demo.');
        }
        e.preventDefault();
    });
})();