Local development and testing
============================

Start the checkout server in mock mode (no Stripe key needed):

Windows (PowerShell):

```powershell
cd server
npm install
# mock mode enabled by default when STRIPE_SECRET_KEY is not set or set to sk_test_example
npm start
```

Start the server with a real/test Stripe key (use a test key):

```powershell
cd server
$env:STRIPE_SECRET_KEY = 'sk_test_your_test_key_here'
npm start
```

Serve the frontend locally (simple static server):

```powershell
# from repo root
npx http-server -c-1 . -p 8080
# then open http://localhost:8080 in your browser
```

Run the mock creators (already added):

```powershell
cd server
node create_stripe_products_mock.js
node create_stripe_links_mock.js
```

Automated test POST (already provided):

```powershell
cd server
node test_post.js
```
