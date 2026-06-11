const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4242;
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

const MOCK_STRIPE = !STRIPE_SECRET || STRIPE_SECRET === 'sk_test_example' || process.env.MOCK_STRIPE === '1';

if (!STRIPE_SECRET && !MOCK_STRIPE) {
  console.error('STRIPE_SECRET_KEY is not set. Set it in environment variables or a .env file.');
  console.error('See server/.env.example for an example. Exiting.');
  process.exit(1);
}

let stripe = null;
if (!MOCK_STRIPE) {
  stripe = Stripe(STRIPE_SECRET);
} else {
  console.warn('Running in MOCK_STRIPE mode — Stripe network calls will be skipped.');
}

app.post('/create-checkout-session', async (req, res) => {
  const { plan = 'Service', amount = 20000 } = req.body;

  try {
    if (MOCK_STRIPE) {
      const fakeUrl = `https://example.com/checkout/session_mock_${Date.now()}`;
      console.log('Mock session created for', plan, amount, fakeUrl);
      return res.json({ url: fakeUrl });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe secret key not configured on server.' });
    }

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
