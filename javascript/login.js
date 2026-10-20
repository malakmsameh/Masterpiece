/* =========================================================================
   Sahtein — login.js
   Only loaded on login.html.
   - Tab switching between Sign in / Sign up.
   - Preference chip toggle.
   - Live password validation (8+ chars, 1 number, 1 special, match).
   - On submit: set a demo "logged in" flag and redirect to ?return=.
   ========================================================================= */

/* ---------- Save demo user profile ---------- */
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

(function () {
    'use strict';

    /* ---------- Tab switching ---------- */
    const tabs       = document.querySelectorAll('.auth-tab');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

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
    function getReturnTarget() {
        const params = new URLSearchParams(window.location.search);
        const target = params.get('return');
        if (target && /^[a-zA-Z0-9._-]+\.html$/.test(target)) {
            return target;
        }
        return 'index.html';
    }

    /* ---------- Live password validation ---------- */
    const pwInput      = document.getElementById('signup-password');
    const pwConfirm    = document.getElementById('signup-confirm');
    const checklist    = document.getElementById('pwChecklist');
    const matchEl      = document.getElementById('pwMatch');

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
            pwInput.classList.toggle('pw-valid', allOk);
            pwInput.classList.toggle('pw-invalid', v.length > 0 && !allOk);
        }
        if (pwConfirm) {
            pwConfirm.classList.toggle('pw-valid', matches);
            pwConfirm.classList.toggle('pw-invalid', pwConfirm.value.length > 0 && !matches);
        }

        return { allOk: allOk, matches: matches };
    }

    if (pwInput)   pwInput.addEventListener('input', validatePassword);
    if (pwConfirm) pwConfirm.addEventListener('input', validatePassword);

    /* ---------- Sign in submit ---------- */
    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!loadUserProfile()) {
                saveUserProfile({
                    firstName: 'Demo',
                    lastName:  'User',
                    username:  'demo_user',
                    email:     document.getElementById('signin-email').value.trim() || 'demo@example.com',
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

            const firstName = document.getElementById('signup-firstname').value.trim();
            const lastName  = document.getElementById('signup-lastname').value.trim();
            const username  = document.getElementById('signup-username').value.trim();
            const email     = document.getElementById('signup-email').value.trim();

            if (!firstName || !lastName || !username || !email) {
                if (window.showToast) window.showToast('Please fill in all fields.', true);
                return;
            }

            const check = validatePassword();

            if (!check.allOk) {
                if (window.showToast) window.showToast('Password does not meet the requirements.', true);
                return;
            }
            if (!check.matches) {
                if (window.showToast) window.showToast("Passwords don't match.", true);
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