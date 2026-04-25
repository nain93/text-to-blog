import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border bg-background sticky top-0 z-30">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-[15px] font-semibold tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-[11px] font-medium shadow-button-inset">
              t2i
            </span>
            text-to-image
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-foreground/[0.82]">
            <Link href="/#features" className="hover:opacity-80">
              기능
            </Link>
            <Link href="/#workflow" className="hover:opacity-80">
              워크플로
            </Link>
            <Link href="/#pricing" className="hover:opacity-80">
              가격
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/paper-to-figure">로그인</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/paper-to-figure">바로 시작</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-10 text-sm text-muted-foreground">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
          <span>© {new Date().getFullYear()} text-to-image</span>
          <div className="flex gap-6">
            <Link href="/#features" className="hover:text-foreground">
              Product
            </Link>
            <Link href="/#pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/#" className="hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
