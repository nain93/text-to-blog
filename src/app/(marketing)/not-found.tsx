import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-6 py-32 text-center">
      <span className="font-mono text-sm text-muted-foreground">404</span>
      <h1 className="font-heading text-2xl font-semibold">존재하지 않는 페이지예요</h1>
      <p className="text-muted-foreground">랜딩으로 돌아가 다시 둘러보세요.</p>
      <Button asChild>
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  );
}
