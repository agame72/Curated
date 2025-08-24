const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { plan, email } = JSON.parse(event.body || '{}');

    const price =
      plan === 'style_guide'
        ? process.env.STRIPE_PRICE_STYLE
        : process.env.STRIPE_PRICE_STARTER;

    if (!price) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Unknown plan' }) };
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email || undefined,
      line_items: [{ price, quantity: 1 }],
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      success_url: `${process.env.PUBLIC_BASE_URL}/app?welcome=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_BASE_URL}/checkout?canceled=1`,
      metadata: { app_user_hint: email || '' },
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
