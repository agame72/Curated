const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const qp = event.queryStringParameters || {};
    const body = event.body ? JSON.parse(event.body) : {};
    const session_id = qp.session_id || body.session_id;

    if (!session_id) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing session_id' }) };
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['line_items'] });

    if (session.payment_status !== 'paid') {
      return { statusCode: 200, body: JSON.stringify({ paid: false }) };
    }

    const line = session.line_items?.data?.[0];
    const priceId = line?.price?.id || '';

    const entitlements =
      priceId === process.env.STRIPE_PRICE_STYLE
        ? { maxRecommendations: 100, maxAccessories: 5 }
        : { maxRecommendations: 50,  maxAccessories: 0 };

    return { statusCode: 200, body: JSON.stringify({ paid: true, entitlements }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
