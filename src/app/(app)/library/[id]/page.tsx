import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function LibraryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6 space-y-5 max-w-4xl">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link href="/library">
          <ArrowLeft className="size-4" strokeWidth={1.5} /> Library
        </Link>
      </Button>
      <Card className="border-border">
        <CardContent className="p-6 space-y-4">
          <p className="text-xs font-mono text-muted-foreground">id: {id}</p>
          <h1 className="text-2xl font-semibold tracking-[-0.025em] text-foreground">
            아이템 상세
          </h1>
          <p className="text-muted-foreground leading-[1.55]">
            라이브러리 아이템의 본문·그림·메타데이터가 여기에 표시됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
