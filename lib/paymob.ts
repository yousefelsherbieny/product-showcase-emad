/* eslint‑disable @typescript-eslint/no‑unsafe‑assignment */
import "server-only";

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY!; // your secret key
const PAYMOB_INTEGRATION_ID = process.env.PAYMOB_INTEGRATION_ID!; // “card” integration ID
const PAYMOB_IFRAME_ID = process.env.PAYMOB_IFRAME_ID!; // the iframe number returned from dashboard

type Course = {
  id: string;
  title: string;
  priceCents: number; // 750000 == 7 500 EGP
};

// you use a DB in real projects –  hard‑coded here for demo
export const COURSES: Course[] = [
  { id: "1", title: "Product Modelling in Blender", priceCents: 750000 },
  { id: "2", title: "Magic of VFX", priceCents: 500000 },
  { id: "3", title: "CGI & VFX Bundle", priceCents: 810000 },
];

export async function createPaymobCheckout(course: Course, email: string) {
  /* 1) auth */
  const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: PAYMOB_API_KEY }),
  }).then((r) => r.json());

  const token = authRes.token as string;

  /* 2) order */
  const orderRes = await fetch(
    "https://accept.paymob.com/api/ecommerce/orders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: "false",
        amount_cents: course.priceCents,
        currency: "EGP",
        items: [
          { name: course.title, amount_cents: course.priceCents, quantity: 1 },
        ],
      }),
    }
  ).then((r) => r.json());

  /* 3) payment‑key */
  const payKeyRes = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: course.priceCents,
        expiration: 3600,
        order_id: orderRes.id,
        billing_data: {
          email,
          first_name: "SWAGIFYY",
          last_name: "Student",
          phone_number: "+201111234567",
          apartment: "NA",
          floor: "NA",
          street: "NA",
          building: "NA",
          city: "NA",
          country: "NA",
          state: "NA",
        },
        currency: "EGP",
        integration_id: Number(PAYMOB_INTEGRATION_ID),
      }),
    }
  ).then((r) => r.json());

  const paymentKey = payKeyRes.token as string;

  /* 4) compose final iframe link */
  const iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;

  return iframeURL;
}
