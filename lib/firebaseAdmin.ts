// lib/firebaseAdmin.ts
import {
  initializeApp,
  cert,
  getApps,
  app as adminApp,
} from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64!, "base64").toString(
    "utf-8"
  )
);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "swagifyy-ef1c0", // ✅ الصحيح بدون .appspot.com
  });
}

const bucket = getStorage().bucket();
const db = getFirestore();

export { bucket, db };
