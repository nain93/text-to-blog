"use client";

import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertTitle>요청을 처리하지 못했어요</AlertTitle>
        <AlertDescription className="space-y-3">
          <p>잠시 후 다시 시도해 주세요. LLM 호출 한도에 걸렸을 수 있습니다.</p>
          <Button onClick={reset} variant="outline" size="sm">
            다시 시도
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
