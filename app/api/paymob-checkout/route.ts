import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.PAYMOB_API_KEY!;
const INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID!;
const IFRAME_ID = process.env.PAYMOB_IFRAME_ID!;

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json();

    const amount_cents = Math.round(
      cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) * 100
    );

    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY }),
    });

    const authData = await authRes.json();
    const auth_token = authData.token;

    const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        delivery_needed: false,
        amount_cents,
        currency: "EGP",
        items: [],
      }),
    });

    const orderData = await orderRes.json();
    const order_id = orderData.id;

    const paymentKeyRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        amount_cents,
        expiration: 3600,
        order_id,
        billing_data: {
          apartment: "NA",
          email: "test@example.com",
          floor: "NA",
          first_name: "Test",
          street: "NA",
          building: "NA",
          phone_number: "+201234567890",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: "User",
          state: "NA",
        },
        currency: "EGP",
        integration_id: INTEGRATION_ID,
      }),
    });

    const paymentKeyData = await paymentKeyRes.json();
    const payment_token = paymentKeyData.token;

    const payment_url = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${payment_token}`;

    return NextResponse.json({ payment_url });
  } catch (error) {
    console.error("Paymob Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
