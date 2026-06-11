const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Stripe checkout: find buttons with .stripe-pay and POST to server to create a Checkout Session
async function startStripeCheckout(planName, amountCents) {
  try {
    const serverEndpoint = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:4242/create-checkout-session'
      : '/api/create-checkout-session';

    const resp = await fetch(serverEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: planName, amount: amountCents })
    });

    if (!resp.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await resp.json();
    if (data.url) {
      window.location = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    alert('Could not start Stripe checkout. See console for details.');
    console.error(err);
  }
}

// Attach handlers to any stripe-pay buttons on the page and wire contact form
document.addEventListener('DOMContentLoaded', () => {
  const stripeButtons = document.querySelectorAll('.stripe-pay');
  stripeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const plan = btn.getAttribute('data-plan') || 'Service';
      const amount = parseInt(btn.getAttribute('data-amount') || '0', 10);
      startStripeCheckout(plan, amount);
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (successMessage) {
        successMessage.style.display = 'none';
      }
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/builtbykyree@gmail.com', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to send request');
        }

        contactForm.reset();
        if (successMessage) {
          successMessage.style.display = 'block';
        }
      } catch (error) {
        if (errorMessage) {
          errorMessage.style.display = 'block';
        }
      }
    });
  }

  // Reveal animations for hero and pricing cards
  try {
    const revealSelector = '.hero-content h1, .hero-content p, .pricing-card, .pricing-card h3, .pricing-card .price, .pricing-card .price-features li';
    const revealTargets = document.querySelectorAll(revealSelector);
    revealTargets.forEach(el => el.classList.add('reveal'));

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => io.observe(el));
  } catch (err) {
    console.error('Reveal observer failed', err);
  }
});
