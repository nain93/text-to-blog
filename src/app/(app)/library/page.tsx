import Link from "next/link";
import { FileText, ImagePlus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ITEMS = [
  {
    id: "1",
    kind: "figure" as const,
    title: "Self-Attention 다이어그램",
    updatedAt: "2시간 전",
    tag: "Transformer",
  },
  {
    id: "2",
    kind: "post" as const,
    title: "ffmpeg libx265 dylib 오류 해결",
    updatedAt: "어제",
    tag: "Trouble Shooting",
  },
  {
    id: "3",
    kind: "figure" as const,
    title: "Diffusion Sampling Pipeline",
    updatedAt: "지난 주",
    tag: "Diffusion",
  },
];

export default function LibraryPage() {
  return (
    <div className="p-6 space-y-7">
      <header className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-[-0.025em] text-foreground">
            Library
          </h1>
          <p className="text-sm text-muted-foreground">
            생성한 그림과 블로그 초안을 한 자리에서 검색·재편집
          </p>
        </div>
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            strokeWidth={1.5}
          />
          <Input placeholder="제목·태그·내용 검색" className="pl-9" />
        </div>
      </header>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="figures">그림</TabsTrigger>
          <TabsTrigger value="posts">블로그</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => (
          <Link key={item.id} href={`/library/${item.id}`} className="group">
            <Card className="border-border h-full transition-colors group-hover:border-foreground/40">
              <CardContent className="p-4 space-y-3">
                <div className="aspect-video rounded-lg border border-border bg-foreground/[0.03] grid place-items-center text-foreground/60">
                  {item.kind === "figure" ? (
                    <ImagePlus className="size-6" strokeWidth={1.5} />
                  ) : (
                    <FileText className="size-6" strokeWidth={1.5} />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-[14px] leading-tight tracking-[-0.005em] line-clamp-2 text-foreground">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex h-5 items-center rounded-full border border-border bg-background px-2 text-[11px] font-medium text-muted-foreground">
                      {item.tag}
                    </span>
                    <span>{item.updatedAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
