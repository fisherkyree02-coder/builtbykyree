const Stripe = require('stripe');
const fs = require('fs');
require('dotenv').config();

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY not set. Create a .env with your key or set the env var and retry.');
  process.exit(1);
}

const stripe = Stripe(stripeKey);

async function main() {
  const prices = JSON.parse(fs.readFileSync('./stripe_prices.json', 'utf8'));
  const output = {};

  for (const [label, priceId] of Object.entries(prices)) {
    try {
      const link = await stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
      });
      output[label] = { priceId, url: link.url };
      console.log(`${label}: ${link.url}`);
    } catch (err) {
      console.error('Failed to create payment link for', label, priceId, err.message || err);
    }
  }

  fs.writeFileSync('./stripe_payment_links.json', JSON.stringify(output, null, 2));
  console.log('Wrote stripe_payment_links.json');
}

main().catch(err => { console.error(err); process.exit(1); });
