import Link from "next/link";
import { ArrowRight, FileText, ImagePlus, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:py-28 space-y-28 sm:space-y-32">
      <section className="grid gap-14 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex h-7 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground/[0.82]">
            Research → Visual · Dev → Blog
          </span>
          <h1 className="text-5xl sm:text-6xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground">
            논문은 그림으로,
            <br />
            트러블슈팅은 블로그로.
          </h1>
          <p className="text-[18px] leading-[1.45] text-muted-foreground max-w-xl">
            긴 논문을 figure·다이어그램으로, 흩어진 개발 기록과 에러 로그를
            구조화된 한국어 기술 블로그 초안으로 자동 변환합니다.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild size="lg">
              <Link href="/paper-to-figure">
                무료로 시작하기 <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#workflow">데모 보기</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            결제 정보 없이 시작 · 한국어·영어 논문 모두 지원
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-2">
              Input · 논문 발췌
            </p>
            <p className="text-sm leading-[1.55] text-foreground/[0.82]">
              &ldquo;Self-Attention computes a weighted sum of values, where the
              weight assigned to each value is computed by a compatibility
              function...&rdquo;
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-3">
              Output · 다이어그램
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Q", opacity: "bg-foreground/[0.08]" },
                { label: "K", opacity: "bg-foreground/[0.12]" },
                { label: "V", opacity: "bg-foreground/[0.16]" },
              ].map(({ label, opacity }) => (
                <div
                  key={label}
                  className={`aspect-square rounded-lg border border-border ${opacity} grid place-items-center font-mono text-[13px] font-semibold text-foreground`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="space-y-12">
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            두 개의 워크스페이스,
            <br />
            하나의 워크플로
          </h2>
          <p className="text-[17px] leading-[1.5] text-muted-foreground pt-2">
            논문을 시각화하고, 개발 기록을 글로 쓰는 두 가지 작업을 같은
            라이브러리에서 관리합니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: ImagePlus,
              title: "Paper → Figure",
              desc: "PDF나 발췌 텍스트를 붙여 넣으면 핵심 개념을 추출해 다이어그램·아이소메트릭 일러스트로 변환합니다.",
            },
            {
              icon: FileText,
              title: "Dev Log → Blog",
              desc: "에러 메시지·터미널 로그·커밋 기록을 SEO와 가독성을 갖춘 한국어 기술 블로그 초안으로 자동 정리합니다.",
            },
            {
              icon: Wand2,
              title: "Reusable Library",
              desc: "생성된 그림과 글은 한 라이브러리에 자동 누적. 태그·검색·재편집까지 하나의 화면에서 처리합니다.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-foreground">
                    <Icon className="size-[18px]" strokeWidth={1.5} />
                  </span>
                  <CardTitle className="text-[17px] font-semibold tracking-[-0.01em]">
                    {title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[14px] leading-[1.55] text-muted-foreground">
                  {desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="workflow" className="space-y-12">
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
            3단계로 끝나는
            <br />
            변환 워크플로
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "원본 입력",
              desc: "논문 PDF · 발췌 · 터미널 로그 · 커밋 메시지를 그대로 붙여 넣기",
            },
            {
              step: "02",
              title: "AI 정제",
              desc: "핵심 개념·인과 관계·전후 맥락을 추출해 결과 형태에 맞게 재구성",
            },
            {
              step: "03",
              title: "라이브러리 저장",
              desc: "그림·블로그 초안을 자동으로 보관, 언제든 재편집·내보내기",
            },
          ].map(({ step, title, desc }) => (
            <Card key={step} className="border-border">
              <CardHeader>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  STEP {step}
                </span>
                <CardTitle className="pt-1 text-[17px] font-semibold tracking-[-0.01em]">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[14px] leading-[1.55] text-muted-foreground">
                {desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="rounded-2xl border border-border bg-card px-8 py-14 text-center space-y-5"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-foreground">
          지금은 베타, 무료로 사용 가능
        </h2>
        <p className="text-[17px] leading-[1.5] text-muted-foreground max-w-xl mx-auto">
          베타 기간 동안은 모든 기능을 무료로 제공합니다. 정식 출시 시 합리적인
          사용량 기반 요금제를 안내드립니다.
        </p>
        <div className="pt-2">
          <Button asChild size="lg">
            <Link href="/paper-to-figure">
              지금 시작하기 <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
