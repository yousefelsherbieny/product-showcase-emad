// app/api/getSignedUrl/route.ts
import { NextRequest, NextResponse } from "next/server";
import { bucket, db } from "@/lib/firebaseAdmin"; // ✅ استخدام الكود الموحد

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  const firebasePath = req.nextUrl.searchParams.get("path");

  if (!uid || !firebasePath) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const match = firebasePath.match(/course-(\d+)\.mp4/);
  const courseId = match?.[1];

  if (!courseId) {
    return NextResponse.json({ error: "Invalid course path" }, { status: 400 });
  }

  try {
    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("courses")
      .where("courseId", "==", courseId)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const file = bucket.file(firebasePath);
    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 ساعة
    });

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
