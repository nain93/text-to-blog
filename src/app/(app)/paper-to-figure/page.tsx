import { Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function PaperToFigurePage() {
  return (
    <div className="grid gap-5 p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[17px] font-semibold tracking-[-0.01em]">
              논문 입력
            </CardTitle>
            <span className="inline-flex h-6 items-center rounded-full border border-border bg-background px-2.5 text-[11px] font-medium text-muted-foreground">
              Research
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="size-4 mr-2" strokeWidth={1.5} />
              PDF 업로드 또는 끌어서 놓기
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">
              최대 30MB · 영어·한국어 논문 지원
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="abstract">또는 발췌·초록을 붙여넣기</Label>
            <Textarea
              id="abstract"
              rows={12}
              placeholder="논문의 초록 또는 시각화하고 싶은 단락을 붙여 넣으세요. 모델이 핵심 개념과 인과 관계를 추출해 다이어그램을 제안합니다."
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              목표 형식: 다이어그램 / 아이소메트릭 일러스트
            </p>
            <Button>
              <Sparkles className="size-4 mr-1" strokeWidth={1.5} />
              그림 생성
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-[17px] font-semibold tracking-[-0.01em]">
            결과 미리보기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="diagram">
            <TabsList>
              <TabsTrigger value="diagram">Diagram</TabsTrigger>
              <TabsTrigger value="markdown">Caption</TabsTrigger>
              <TabsTrigger value="raw">Raw JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="diagram" className="mt-4">
              <div className="aspect-[4/3] rounded-xl border border-dashed border-border bg-foreground/[0.03] grid place-items-center text-sm text-muted-foreground">
                생성된 다이어그램이 여기 표시됩니다
              </div>
            </TabsContent>
            <TabsContent value="markdown" className="mt-4">
              <pre className="rounded-xl border border-border bg-foreground/[0.03] p-4 text-xs leading-6 overflow-auto text-foreground/[0.82]">
                {`# Figure 1. Self-Attention\n\n핵심 개념: ...\n인과 관계: ...`}
              </pre>
            </TabsContent>
            <TabsContent value="raw" className="mt-4">
              <pre className="rounded-xl border border-border bg-foreground/[0.03] p-4 text-xs leading-6 overflow-auto text-foreground/[0.82]">
                {`{ "concepts": [], "edges": [] }`}
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
