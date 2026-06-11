const fs = require('fs');

const prices = JSON.parse(fs.readFileSync('./stripe_prices.json', 'utf8'));
const output = {};

for (const [label, priceId] of Object.entries(prices)) {
  const url = `https://example.com/pay/${priceId}`;
  output[label] = { priceId, url };
  console.log(`${label}: ${url}`);
}

fs.writeFileSync('./stripe_payment_links.json', JSON.stringify(output, null, 2));
console.log('Wrote stripe_payment_links.json with mock links.');
