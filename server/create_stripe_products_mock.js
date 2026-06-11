const fs = require('fs');

const prices = {
  "Launch Package": "price_mock_launch_20000",
  "Domain Setup": "price_mock_domain_30000"
};

fs.writeFileSync('./stripe_prices.json', JSON.stringify(prices, null, 2));
console.log('Wrote stripe_prices.json with mock price IDs.');

// Also print them for convenience
for (const [k, v] of Object.entries(prices)) {
  console.log(`${k}: ${v}`);
}
