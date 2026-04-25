"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function MarketingError({
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
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
      <h1 className="font-heading text-2xl font-semibold">페이지를 불러올 수 없어요</h1>
      <p className="text-muted-foreground">잠시 후 다시 시도해 주세요. 문제가 계속되면 새로고침해 보세요.</p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
