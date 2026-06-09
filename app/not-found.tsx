import Link from "next/link";

const SUGGESTIONS = [
  { name: "Unix Timestamp Converter", href: "/tools/unix-timestamp-converter" },
  { name: "Timestamp to Date", href: "/tools/timestamp-to-date" },
  { name: "Timezone Converter", href: "/tools/timezone-converter" },
];

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-4" aria-hidden="true">⏱</div>
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-1">页面未找到 / Page not found</p>
        <p className="text-muted-foreground mb-8 text-sm">您访问的页面不存在或已被移动。</p>
        <Link href="/" className="inline-block px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90">返回首页 / Back to Home</Link>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">试试我们的工具 / Try our tools</p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center text-sm">
            {SUGGESTIONS.map((s) => (
              <Link key={s.href} href={s.href} className="text-muted-foreground hover:text-foreground">{s.name}</Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">ShuttleLab 旗下产品 / Also from ShuttleLab</p>
          <div className="flex flex-col gap-2 items-center">
            <a
              href="https://note.shuttlelab.org"
              rel="noopener"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Note Shuttle — Markdown editor &amp; sharing
            </a>
            <a
              href="https://status.shuttlelab.org"
              rel="noopener"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Status Shuttle — Uptime monitoring &amp; alerts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
