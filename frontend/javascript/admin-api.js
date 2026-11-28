(function () {
    'use strict';
    const base = (window.SAHTEIN_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
    const tokenKey = 'sahtein_admin_token';
    function token() { return sessionStorage.getItem(tokenKey); }
    async function request(path, options = {}) {
        const headers = { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) };
        if (token()) headers.Authorization = 'Bearer ' + token();
        const response = await fetch(base + path, { ...options, headers, body: options.body && typeof options.body !== 'string' ? JSON.stringify(options.body) : options.body });
        const payload = response.status === 204 ? {} : await response.json().catch(() => ({}));
        if (!response.ok) {
            if (response.status === 401) { sessionStorage.removeItem(tokenKey); sessionStorage.removeItem('sahtein_admin_user'); if (!path.includes('/admin/login')) location.replace('admin-login.html'); }
            const error = new Error(payload.message || 'The API request failed.');
            error.status = response.status; error.errors = payload.errors || {}; throw error;
        }
        return payload;
    }
    window.AdminApi = {
        token,
        request,
        get: path => request(path),
        post: (path, body) => request(path, { method: 'POST', body }),
        put: (path, body) => request(path, { method: 'PUT', body }),
        patch: (path, body) => request(path, { method: 'PATCH', body }),
        delete: path => request(path, { method: 'DELETE' }),
        async login(email, password) {
            const data = await request('/admin/login', { method: 'POST', body: { email, password } });
            const accessToken = data.access_token || data.token;
            if (!accessToken) throw new Error('Login succeeded but the API did not return a token.');
            sessionStorage.setItem(tokenKey, accessToken);
            sessionStorage.setItem('sahtein_admin_user', JSON.stringify(data.admin || data.user || {}));
            return data;
        },
        async logout() {
            try { if (token()) await request('/admin/logout', { method: 'POST' }); }
            finally { sessionStorage.removeItem(tokenKey); sessionStorage.removeItem('sahtein_admin_user'); }
        },
        async requireAdmin() {
            if (!token()) { location.replace('admin-login.html?return=' + encodeURIComponent(location.pathname.split('/').pop())); return null; }
            try { return await request('/admin/me'); }
            catch (_) { location.replace('admin-login.html'); return null; }
        }
    };
})();
