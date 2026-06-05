const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    console.error('STRIPE_SECRET_KEY is not set in environment');
    return res.status(500).json({ error: 'Stripe secret not configured' });
  }

  const stripe = Stripe(stripeSecret);
  const { plan = 'Service', amount = 20000 } = req.body || {};

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: plan },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: 'https://fisherkyree02-coder.github.io/builtbykyree/thank-you.html',
      cancel_url: 'https://fisherkyree02-coder.github.io/builtbykyree/plans.html',
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Error creating Stripe checkout session:', err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
