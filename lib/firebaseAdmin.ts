import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, "base64").toString("utf-8")
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "swagifyy-ef1c0.appspot.com", // ✅ يجب أن يكون بنفس الاسم الظاهر في Firebase
  });
}

const bucket = getStorage().bucket("swagifyy-ef1c0.appspot.com"); // ✅ لا تعتمد على القيمة الافتراضية
const db = getFirestore();

export { bucket, db };
