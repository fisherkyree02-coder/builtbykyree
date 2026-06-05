const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4242;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET) {
  console.error('STRIPE_SECRET_KEY is not set. Set it in environment variables or a .env file.');
  console.error('See server/.env.example for an example. Exiting.');
  process.exit(1);
}

const stripe = Stripe(STRIPE_SECRET);

app.post('/create-checkout-session', async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe secret key not configured on server.' });
  }

  const { plan = 'Service', amount = 20000 } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: plan },
          unit_amount: amount
        },
        quantity: 1
      }],
      success_url: 'https://fisherkyree02-coder.github.io/builtbykyree/thank-you.html',
      cancel_url: 'https://fisherkyree02-coder.github.io/builtbykyree/plans.html'
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe session creation failed:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.listen(PORT, () => {
  console.log(`Stripe checkout server listening on port ${PORT}`);
});
