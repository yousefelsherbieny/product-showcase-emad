import { Suspense } from "react";
import DownloadPage from "./DownloadClient";

export default function Page() {
  return (
    <Suspense fallback={<div>جارٍ التحميل...</div>}>
      <DownloadPage />
    </Suspense>
  );
}
