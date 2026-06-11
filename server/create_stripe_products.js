const Stripe = require('stripe');
require('dotenv').config();

const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY not set. Create a .env with your key or set the env var and retry.');
  process.exit(1);
}

const stripe = Stripe(stripeKey);

async function createProduct(name, amountCents) {
  try {
    const product = await stripe.products.create({ name });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amountCents,
      currency: 'usd'
    });

    console.log(`${name}: product id=${product.id}, price id=${price.id}, amount=${amountCents}`);
    return { product, price };
  } catch (err) {
    console.error('Failed to create product/price for', name, err);
    throw err;
  }
}

async function main() {
  console.log('Creating products/prices on Stripe (test mode expected).');
  await createProduct('Launch Package', 20000);
  await createProduct('Domain Setup', 30000);
  console.log('Done. Keep the generated price IDs for use in hosted Checkout or Links.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
