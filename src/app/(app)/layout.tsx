import Link from "next/link";
import { FileText, ImagePlus, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const NAV = [
  { href: "/paper-to-figure", label: "Paper → Figure", icon: ImagePlus },
  { href: "/blog-writer", label: "Dev Log → Blog", icon: FileText },
  { href: "/library", label: "Library", icon: Library },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background">
        <aside className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 h-14 border-b border-sidebar-border font-heading text-[15px] font-semibold tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground text-[11px] font-medium shadow-button-inset">
              t2i
            </span>
            text-to-image
          </Link>
          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                asChild
                variant="ghost"
                className="w-full justify-start gap-2 text-foreground/[0.82] hover:bg-foreground/[0.04] hover:text-foreground"
              >
                <Link href={href}>
                  <Icon className="size-4" strokeWidth={1.5} />
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
          <Separator className="bg-sidebar-border" />
          <div className="p-3 text-xs text-muted-foreground">
            <p className="px-3 py-2">베타 사용자 · 무료</p>
          </div>
        </aside>
        <div className="flex flex-col">
          <header className="h-14 border-b border-border bg-background sticky top-0 z-20 flex items-center justify-between px-6">
            <h1 className="text-[13px] font-medium text-muted-foreground">
              Workspace
            </h1>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/library">라이브러리</Link>
              </Button>
              <Button size="sm">새 변환</Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-background">{children}</main>
        </div>
      </div>
      <Toaster richColors closeButton position="bottom-right" />
    </TooltipProvider>
  );
}
