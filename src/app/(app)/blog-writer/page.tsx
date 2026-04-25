import { FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function BlogWriterPage() {
  return (
    <div className="grid gap-5 p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[17px] font-semibold tracking-[-0.01em]">
              개발 기록 입력
            </CardTitle>
            <span className="inline-flex h-6 items-center rounded-full border border-border bg-background px-2.5 text-[11px] font-medium text-muted-foreground">
              Dev Log
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">포스트 주제 (선택)</Label>
            <Textarea
              id="title"
              rows={2}
              placeholder="예: ffmpeg libx265 dylib 오류 해결"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logs">로그 · 에러 · 작업 노트</Label>
            <Textarea
              id="logs"
              rows={14}
              placeholder="터미널 로그, 에러 메시지, 디버깅 흔적, 커밋 메시지를 그대로 붙여 넣으세요. 모델이 시간순 흐름과 원인·해결을 정리한 한국어 기술 블로그 초안을 만들어 줍니다."
              className="font-mono text-xs"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              결과 형식: Markdown · 코드 블록 자동 감지
            </p>
            <Button>
              <Sparkles className="size-4 mr-1" strokeWidth={1.5} />
              블로그 초안 생성
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[17px] font-semibold tracking-[-0.01em]">
              초안 미리보기
            </CardTitle>
            <Button variant="outline" size="sm">
              <FileText className="size-4 mr-1" strokeWidth={1.5} />
              Markdown 복사
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="meta">SEO Meta</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4 space-y-4">
              <article className="prose prose-sm max-w-none text-foreground">
                <p className="text-muted-foreground">
                  생성된 글이 여기 표시됩니다.
                </p>
              </article>
            </TabsContent>
            <TabsContent value="markdown" className="mt-4">
              <pre className="rounded-xl border border-border bg-foreground/[0.03] p-4 text-xs leading-6 overflow-auto text-foreground/[0.82]">
                {`# 제목\n\n## 문제 상황\n\n## 원인\n\n## 해결\n`}
              </pre>
            </TabsContent>
            <TabsContent
              value="meta"
              className="mt-4 space-y-2 text-sm text-muted-foreground"
            >
              <p>title: …</p>
              <p>description: …</p>
              <p>tags: …</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
