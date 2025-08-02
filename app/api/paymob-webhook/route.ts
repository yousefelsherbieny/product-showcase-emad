// app/api/paymob-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as crypto from "crypto";

if (!getApps().length) {
  initializeApp({
    credential: cert(
      JSON.parse(
        Buffer.from(
          process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!,
          "base64"
        ).toString("utf-8")
      )
    ),
  });
}
const db = getFirestore();

/* helper – rebuild Paymob HMAC string exactly as docs require */
function paymobHmacValid(body: any) {
  const ordered = [
    "amount_cents",
    "created_at",
    "currency",
    "error_occured",
    "has_parent_transaction",
    "id",
    "integration_id",
    "is_3d_secure",
    "is_auth",
    "is_capture",
    "is_refunded",
    "is_standalone_payment",
    "is_voided",
    "order",
    "owner",
    "pending",
    "source_data_pan",
    "source_data_sub_type",
    "source_data_type",
    "success",
  ]
    .map((k) => body[k])
    .join("");

  const hmac = crypto
    .createHmac("sha512", process.env.PAYMOB_HMAC!)
    .update(ordered)
    .digest("hex");

  return hmac === body.hmac;
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  /* 1. basic checks */
  if (!body.success) return NextResponse.json({ ok: true }); // unpaid / cancelled

  if (!paymobHmacValid(body)) {
    console.error("⚠️  Paymob HMAC mismatch");
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 400 });
  }

  /* 2. extract what we stored inside the order-object earlier */
  const courseId = body.order.merchant_order_id?.split("|")[0]; // adapt if you stored it differently
  const uid = body.order.merchant_order_id?.split("|")[1];

  if (!courseId || !uid) {
    console.error("Missing uid or courseId in webhook");
    return NextResponse.json({ ok: true }); // don’t crash Paymob retry mechanism
  }

  /* 3. unlock course for that user */
  await db
    .collection("users")
    .doc(uid)
    .collection("courses")
    .doc(courseId)
    .set({ paid: true, at: new Date() });

  return NextResponse.json({ ok: true });
}
