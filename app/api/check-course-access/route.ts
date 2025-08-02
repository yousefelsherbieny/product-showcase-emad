// app/api/check-course-access/route.ts

import { NextRequest, NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, "base64").toString(
    "utf-8"
  )
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");
  const courseId = searchParams.get("courseId");

  if (!uid || !courseId) {
    return NextResponse.json(
      { error: "Missing uid or courseId" },
      { status: 400 }
    );
  }

  const snapshot = await db
    .collection("users")
    .doc(uid)
    .collection("courses")
    .doc(courseId)
    .get()
    .limit(1)
    .get();

  if (snapshot.empty) {
    return NextResponse.json({ error: "Access Denied" }, { status: 403 });
  }

  return NextResponse.json({ access: true });
}
