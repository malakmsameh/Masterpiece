# Testing Sahtein in the browser and Postman

## Open the admin pages

Laravel serves the API from port `8000`. The plain HTML frontend is a separate project and must be served separately. The frontend server is currently available at:

`http://127.0.0.1:5500/pages/admin-login.html`

Use that URL instead of `http://127.0.0.1:8000/pages/admin-login.html`. The latter asks Laravel for a static file it does not serve, so the 404 in the screenshot is expected. If port `5500` is not running later, open the `frontend` folder in VS Code, start Live Server, and visit its `/pages/admin-login.html` address.

After signing in, walk through Dashboard, Recipes, Ingredients, Users, Categories/Meal Types/Dietary Preferences, Tags & Allergies, AI Recipes, and Profile. Create or edit a test record, verify the list refreshes, then remove test data you no longer need. Check that the browser network tab shows calls to `http://127.0.0.1:8000/api/...` and that tables show ten records at most per page.

## Run the Postman smoke collection

1. In Postman, choose **Import** and select `Sahtein_Admin_API.postman_collection.json`.
2. Open the collection's **Variables** tab. Set `adminEmail` and `adminPassword` to your local admin account. Keep `baseUrl` as `http://127.0.0.1:8000/api`.
3. Open **Run collection** and run it from top to bottom. The login request saves `access_token` into the `token` collection variable. The protected GET requests use `Authorization: Bearer {{token}}`. The final Logout request revokes the token and clears the variable.
4. Check that all requests pass. A failed login means the remaining protected requests will fail too. If login is throttled, wait one minute before retrying.

The collection checks login, authenticated admin identity, dashboard stats, paginated lists for all admin-managed resources, filtering examples, and public lookup lists. It is read-only apart from login and logout, so it does not create or delete database records.

## What the current local check showed

- The static frontend server returned HTTP 200 for the admin login page.
- The API lookup endpoint returned HTTP 200, but all lookup arrays were empty at the time of the check. That means the API is reachable, but the visible data is not populated yet; recipe creation will need at least one category and one ingredient.
- `GET /api/admin/me` without an Authorization header returned HTTP 401 when `Accept: application/json` was sent, which is the expected protected-route response.

If a page shows an empty list, first check whether its table has data through the matching Postman GET request. If it is empty there too, seed/create records. If the Postman request returns data while the page remains empty, check the browser console and the request's response in DevTools.
