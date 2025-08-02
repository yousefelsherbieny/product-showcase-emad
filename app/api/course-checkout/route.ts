// app/api/course-checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const { courseId, uid, price, paymentMethod, customer } = await req.json();

  if (!uid || !courseId || !price) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  /* ── 1. get Paymob auth token ───────────────────────────── */
  const { token: auth_token } = await fetch(
    "https://accept.paymob.com/api/auth/tokens",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
    }
  ).then((r) => r.json());

  /* ── 2. create order (ref appears in webhook later) ─────── */
  const order = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      auth_token,
      delivery_needed: false,
      amount_cents: Math.round(price * 100),
      currency: "EGP",
      merchant_order_id: randomUUID(), // anything you like
      items: [],
    }),
  }).then((r) => r.json());

  /* ── 3. payment-key for card / wallet ───────────────────── */
  const paymentKey = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token,
        amount_cents: Math.round(price * 100),
        expiration: 3600,
        order_id: order.id,
        billing_data: {
          first_name: customer.firstName ?? "User",
          last_name: customer.lastName ?? "Name",
          email: customer.email ?? "test@example.com",
          phone_number: customer.phone ?? "+201234567890",
          city: "Cairo",
          country: "EG",
          apartment: "NA",
          floor: "NA",
          street: "NA",
          postal_code: "NA",
          state: "NA",
          building: "NA",
          shipping_method: "NA",
        },
        currency: "EGP",
        integration_id:
          paymentMethod === "mobile_wallets"
            ? process.env.PAYMOB_INTEGRATION_ID_WALLET
            : process.env.PAYMOB_INTEGRATION_ID_CARD,
        /* the URL Paymob will hit after SUCCESS */
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paymob-webhook`,
      }),
    }
  ).then((r) => r.json());

  /* ── 4. send iframe link back to client ─────────────────── */
  return NextResponse.json({
    payment_url: `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentKey.token}`,
    order_id: order.id, // optional – useful for debugging
  });
}
