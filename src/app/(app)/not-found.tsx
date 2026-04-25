import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AppNotFound() {
  return (
    <div className="p-12 max-w-xl mx-auto text-center space-y-4">
      <span className="font-mono text-sm text-muted-foreground">404</span>
      <h1 className="font-heading text-2xl font-semibold">해당 항목을 찾을 수 없어요</h1>
      <Button asChild>
        <Link href="/library">라이브러리로</Link>
      </Button>
    </div>
  );
}
