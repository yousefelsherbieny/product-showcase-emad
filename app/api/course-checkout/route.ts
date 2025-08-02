import { NextRequest, NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, "base64").toString("utf-8")
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

const API_KEY = process.env.PAYMOB_API_KEY!;
const IFRAME_ID = process.env.PAYMOB_IFRAME_ID!;
const INTEGRATION_ID_CARD = process.env.PAYMOB_INTEGRATION_ID_CARD!;
const INTEGRATION_ID_WALLET = process.env.PAYMOB_INTEGRATION_ID_WALLET!;

export async function POST(req: NextRequest) {
  try {
    const { courseId, uid, price, paymentMethod, customer } = await req.json();

    if (!courseId || !uid || !price) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const amount_cents = Math.round(Number(price) * 100);
    const redirectUrl = `https://www.swagifyy.com/courses/${courseId}/learn`;

    // Step 1: Auth Token
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY }),
    });

    const authData = await authRes.json();
    const auth_token = authData.token;

    if (!auth_token) {
      console.error("Paymob Auth Error:", authData);
      return NextResponse.json({ error: "Failed to get auth token" }, { status: 500 });
    }

    // Step 2: Order
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

    if (!order_id) {
      console.error("Paymob Order Error:", orderData);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Step 3: Integration ID
    const integration_id =
      paymentMethod === "mobile_wallets" ? INTEGRATION_ID_WALLET : INTEGRATION_ID_CARD;

    // Step 4: Payment Key
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
          email: customer?.email || "test@example.com",
          floor: "NA",
          first_name: customer?.firstName || "Test",
          street: "NA",
          building: "NA",
          phone_number: customer?.phone ? "+2" + customer.phone : "+201234567890",
          shipping_method: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: customer?.lastName || "User",
          state: "NA",
        },
        currency: "EGP",
        integration_id,
        callback_url: redirectUrl,
      }),
    });

    const paymentKeyData = await paymentKeyRes.json();
    const payment_token = paymentKeyData.token;

    if (!payment_token) {
      console.error("Paymob Payment Key Error:", paymentKeyData);
      return NextResponse.json(
        { error: "Failed to get payment token", details: paymentKeyData },
        { status: 500 }
      );
    }

    // Step 5: Save course purchase in Firestore
    await db
      .collection("users")
      .doc(uid)
      .collection("courses")
      .add({
        courseId,
        timestamp: new Date(),
      });

    // Step 6: Return iframe link
    const payment_url = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${payment_token}`;

    return NextResponse.json({ payment_url });
  } catch (error) {
    console.error("Course Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
