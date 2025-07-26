import { Suspense } from "react";
import DownloadPage from "./DownloadClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <span className="text-lg animate-pulse">جارٍ تحميل الصفحة...</span>
        </div>
      }
    >
      <DownloadPage />
    </Suspense>
  );
}
