/* =========================================================================
   Sahtein — login.js
   Only loaded on login.html.
   - Tab switching between Sign in / Sign up.
   - Preference chip toggle.
   - Live password validation (8+ chars, 1 number, 1 special, match).
   - On submit: set a demo "logged in" flag and redirect to ?return=.
   - Works whether pages live at the site root or inside /pages/.
   ========================================================================= */

(function () {
    'use strict';

    /* ---------- Helpers ---------- */
    const $ = function (id) { return document.getElementById(id); };

    function isInPagesFolder() {
        return /\/pages\//.test(window.location.pathname);
    }

    function rootPrefix() {
        return isInPagesFolder() ? '../' : '';
    }

    function saveUserProfile(data) {
        try {
            localStorage.setItem('sahtein_user', JSON.stringify(data));
        } catch (err) {}
    }

    function loadUserProfile() {
        try {
            return JSON.parse(localStorage.getItem('sahtein_user')) || null;
        } catch (err) {
            return null;
        }
    }

    function toast(msg, isError) {
        if (window.showToast) window.showToast(msg, isError);
        else alert(msg);
    }

    /* ---------- Tab switching ---------- */
    const tabs       = document.querySelectorAll('.auth-tab');
    const signinForm = $('signinForm');
    const signupForm = $('signupForm');

    function showForm(name) {
        tabs.forEach(function (tab) {
            tab.classList.toggle('active', tab.dataset.tab === name);
        });
        if (signinForm) signinForm.classList.toggle('active', name === 'signin');
        if (signupForm) signupForm.classList.toggle('active', name === 'signup');
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            showForm(tab.dataset.tab);
        });
    });

    document.querySelectorAll('[data-switch]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showForm(link.dataset.switch);
        });
    });

    /* ---------- Preference chips ---------- */
    document.querySelectorAll('.pref-chip').forEach(function (chip) {
        chip.addEventListener('click', function () {
            chip.classList.toggle('selected');
            if (chip.style.background) {
                chip.style.background  = '';
                chip.style.color       = '';
                chip.style.borderColor = '';
            } else {
                chip.style.background  = 'var(--accent-green)';
                chip.style.color       = '#fff';
                chip.style.borderColor = 'var(--accent-green)';
            }
        });
    });

    /* ---------- Read ?return= safely ---------- */
    /* Accepts: "profile.html", "recipe-detail.html?id=5",
       "../index.html", "pages/profile.html". Rejects protocols,
       absolute URLs, and anything with "://" to prevent open redirects. */
    function getReturnTarget() {
        const params = new URLSearchParams(window.location.search);
        const target = (params.get('return') || '').trim();

        if (!target) return rootPrefix() + 'index.html';
        if (/:\/\//.test(target)) return rootPrefix() + 'index.html';
        if (/^javascript:/i.test(target)) return rootPrefix() + 'index.html';
        if (/^\/\//.test(target)) return rootPrefix() + 'index.html';

        // must end in .html (optionally followed by query/hash)
        if (!/\.html([?#].*)?$/i.test(target)) {
            return rootPrefix() + 'index.html';
        }
        return target;
    }

    /* ---------- Live password validation ---------- */
    const pwInput   = $('signup-password');
    const pwConfirm = $('signup-confirm');
    const checklist = $('pwChecklist');
    const matchEl   = $('pwMatch');

    const RULES = {
        length:  function (v) { return v.length >= 8; },
        number:  function (v) { return /\d/.test(v); },
        special: function (v) { return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v); }
    };

    function validatePassword() {
        if (!pwInput) return { allOk: false, matches: false };
        const v = pwInput.value;

        let allOk = true;
        if (checklist) {
            checklist.querySelectorAll('li').forEach(function (li) {
                const rule = li.dataset.rule;
                const ok = RULES[rule] ? RULES[rule](v) : false;
                li.classList.toggle('ok', ok);
                if (!ok) allOk = false;
            });
        }

        let matches = false;
        if (pwConfirm) {
            matches = v.length > 0 && v === pwConfirm.value;
        }
        if (matchEl) {
            matchEl.classList.toggle('ok', matches);
        }

        // Highlight inputs
        if (pwInput) {
            pwInput.classList.toggle('pw-valid', allOk && v.length > 0);
            pwInput.classList.toggle('pw-invalid', v.length > 0 && !allOk);
        }
        if (pwConfirm) {
            pwConfirm.classList.toggle('pw-valid', matches);
            pwConfirm.classList.toggle('pw-invalid', pwConfirm.value.length > 0 && !matches);
        }

        return { allOk: allOk && v.length > 0, matches: matches };
    }

    if (pwInput)   pwInput.addEventListener('input', validatePassword);
    if (pwConfirm) pwConfirm.addEventListener('input', validatePassword);

    /* ---------- Sign in submit ---------- */
    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!loadUserProfile()) {
                const emailField = $('signin-email');
                saveUserProfile({
                    firstName: 'Demo',
                    lastName:  'User',
                    username:  'demo_user',
                    email:     (emailField && emailField.value.trim()) || 'demo@example.com',
                    phone:     '',
                    avatar:    '',
                    role:      'member'
                });
            }

            try { localStorage.setItem('sahtein_logged_in', 'true'); } catch (err) {}
            window.location.href = getReturnTarget();
        });
    }

    /* ---------- Sign up submit ---------- */
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const firstName = ($('signup-firstname') && $('signup-firstname').value.trim()) || '';
            const lastName  = ($('signup-lastname')  && $('signup-lastname').value.trim())  || '';
            const username  = ($('signup-username')  && $('signup-username').value.trim())  || '';
            const email     = ($('signup-email')     && $('signup-email').value.trim())     || '';

            if (!firstName || !lastName || !username || !email) {
                toast('Please fill in all fields.', true);
                return;
            }

            const check = validatePassword();

            if (!check.allOk) {
                toast('Password does not meet the requirements.', true);
                return;
            }
            if (!check.matches) {
                toast("Passwords don't match.", true);
                return;
            }

            saveUserProfile({
                firstName: firstName,
                lastName:  lastName,
                username:  username,
                email:     email,
                phone:     '',
                avatar:    '',
                role:      'member'
            });

            try { localStorage.setItem('sahtein_logged_in', 'true'); } catch (err) {}
            window.location.href = getReturnTarget();
        });
    }
})();