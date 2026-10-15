/* =========================================================================
   Sahtein — shared.js
   Loaded on every page (right before </body>).
   - Highlights the current nav link.
   - Wires up the mobile hamburger menu.
   - Provides a global showToast() to replace alert().
   ========================================================================= */
(function () {
    'use strict';

    /* ---------- Highlight the current nav link ---------- */
    const here = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        const target = (link.getAttribute('href') || '').toLowerCase();
        if (target && target === here) {
            link.classList.add('active');
        }
    });

    /* ---------- Styled header icon tooltips ---------- */
    function isLoggedIn() {
        try {
            return localStorage.getItem('sahtein_logged_in') === 'true';
        } catch (err) {
            return false;
        }
    }

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
})();