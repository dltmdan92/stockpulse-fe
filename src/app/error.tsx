'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Frontend Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[var(--negative)]/10 flex items-center justify-center mb-2">
        <AlertTriangle className="w-8 h-8 text-[var(--negative)]" />
      </div>
      
      <h2 className="text-2xl font-bold">오류가 발생했습니다</h2>
      <p className="text-[var(--text-muted)] max-w-md">
        페이지를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>

      {/* Tech Details (Dev Only - Optional) */}
      <div className="text-xs text-[var(--text-muted)] bg-black/20 p-2 rounded max-w-lg overflow-auto">
        {error.message}
      </div>

      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-xl transition-colors font-medium mt-4"
      >
        <RefreshCcw className="w-4 h-4" />
        다시 시도
      </button>
    </div>
  );
}
