// app/api/paymob/checkout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseId } = await req.json();

  // (1) look up your course & its price
  const courses = [
    { id: "1", priceCents: 7500 * 100 },
    { id: "2", priceCents: 5000 * 100 },
    { id: "3", priceCents: 8100 * 100 },
  ];
  const course = courses.find((c) => c.id === courseId);
  if (!course)
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });

  // (2) get Paymob auth token
  const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: process.env.PAYMOB_API_KEY }),
  });
  const { token: authToken } = await authRes.json();

  // (3) create an order
  const orderRes = await fetch(
    "https://accept.paymob.com/api/ecommerce/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: course.priceCents,
        currency: "EGP",
        items: [],
      }),
    }
  );
  const { id: orderId } = await orderRes.json();

  // (4) request a payment key
  const paymentKeyRes = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: authToken,
        amount_cents: course.priceCents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          first_name: "Customer",
          email: "customer@example.com",
          phone_number: "0000000000",
          apartment: "NA",
          city: "NA",
          country: "EG",
          state: "NA",
          street: "NA",
          building: "NA",
          floor: "NA",
        },
        currency: "EGP",
        integration_id: parseInt(process.env.PAYMOB_INTEGRATION_ID!),
      }),
    }
  );
  const { token: paymentToken } = await paymentKeyRes.json();

  // (5) build the iframe URL and send it back
  const iframeId = process.env.PAYMOB_IFRAME_ID;
  const paymentUrl = `https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`;
  return NextResponse.json({ paymentUrl });
}
