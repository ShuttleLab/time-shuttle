import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

const BASE_URL = "https://time.shuttlelab.org";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") {
    return {
      title: "时间戳转日期（在线）– 免费时间戳转换器",
      description: "输入 Unix 时间戳，即时查看对应的日期和时间。支持秒和毫秒格式，完全私密。",
      alternates: { canonical: `/${locale}/tools/timestamp-to-date`, languages: { en: "/tools/timestamp-to-date", zh: `/${locale}/tools/timestamp-to-date`, "x-default": "/tools/timestamp-to-date" } },
      openGraph: { title: "时间戳转日期（在线）– 免费时间戳转换器", description: "输入 Unix 时间戳，即时查看对应的日期和时间。支持秒和毫秒格式，完全私密。", siteName: "Time Shuttle", type: "website", locale: "zh_CN", alternateLocale: ["en_US"] },
      twitter: { card: "summary_large_image", title: "时间戳转日期（在线）– 免费时间戳转换器", description: "输入 Unix 时间戳，即时查看对应的日期和时间。支持秒和毫秒格式，完全私密。" },
    };
  }
  return {
    title: "Timestamp to Date Online – Free Converter Tool",
    description: "Convert any Unix timestamp to a human-readable date instantly. Free online timestamp-to-date converter with multi-format output and timezone support.",
    alternates: { canonical: "/tools/timestamp-to-date", languages: { en: "/tools/timestamp-to-date", zh: "/zh/tools/timestamp-to-date", "x-default": "/tools/timestamp-to-date" } },
    openGraph: { title: "Timestamp to Date Online – Free Converter Tool", description: "Convert any Unix timestamp to a human-readable date instantly. Free online timestamp-to-date converter.", siteName: "Time Shuttle", type: "website", locale: "en_US", alternateLocale: ["zh_CN"] },
    twitter: { card: "summary_large_image", title: "Timestamp to Date Online – Free Converter Tool", description: "Convert any Unix timestamp to a human-readable date instantly." },
  };
}

export default async function TimestampToDatePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations("toolPages");
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{t("timestampToDate.title")}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t("timestampToDate.subtitle")}</p>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-base font-medium">在首页打开时间戳转换工具，立即开始转换。</p>
            <Link href="/zh/#tool" className="inline-flex items-center justify-center h-10 gap-1.5 rounded-lg bg-primary text-primary-foreground px-5 text-sm font-medium hover:bg-primary/80 transition-colors">
              <ArrowRight className="size-4 mr-1.5" />{t("openTool")}
            </Link>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-10">
          <Link href="/tools/timestamp-to-date" className="underline hover:text-foreground transition-colors">{t("fullGuide")}</Link>
        </p>
      </div>
    );
  }

  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }, { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/#tool` }, { "@type": "ListItem", position: 3, name: "Timestamp to Date" }] };
  const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Convert a Timestamp to a Date", description: "Convert any Unix timestamp to a human-readable date format.", step: [{ "@type": "HowToStep", name: "Enter the timestamp", text: "Paste or type the Unix timestamp into the input field on Time Shuttle." }, { "@type": "HowToStep", name: "View the date", text: "The tool instantly shows the corresponding date in ISO 8601, UTC, localized, and relative formats." }, { "@type": "HowToStep", name: "Copy the result", text: "Click the Copy button next to your preferred format." }] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "How do I convert a timestamp to a date?", acceptedAnswer: { "@type": "Answer", text: "Paste the Unix timestamp into Time Shuttle's input field. The tool auto-detects seconds vs milliseconds and instantly shows the date in multiple formats." } },
    { "@type": "Question", name: "What format does the output use?", acceptedAnswer: { "@type": "Answer", text: "Time Shuttle shows the date in ISO 8601, RFC 2822, UTC string, localized format, and relative time. You can copy any format with one click." } },
    { "@type": "Question", name: "Can I convert dates back to timestamps?", acceptedAnswer: { "@type": "Answer", text: "Yes. Switch to 'Date → Timestamp' mode and enter a date in any standard format. The tool shows the corresponding Unix timestamp in both seconds and milliseconds." } },
    { "@type": "Question", name: "Does it handle different timezones?", acceptedAnswer: { "@type": "Answer", text: "Yes. The default output uses your local timezone. The timezone converter tab lets you convert between any IANA timezones." } },
    { "@type": "Question", name: "Is this tool free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no limits, no signup, and no ads." } },
    { "@type": "Question", name: "Is my data private?", acceptedAnswer: { "@type": "Answer", text: "Yes. All processing happens in your browser using native JavaScript APIs. Nothing is sent to any server." } },
  ] };
  const techArticleSchema = { "@context": "https://schema.org", "@type": "TechArticle", headline: "Timestamp to Date Online – Free Converter Tool", description: "A guide to converting Unix timestamps to human-readable dates, including seconds vs milliseconds, timezone handling, and batch conversion.", author: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL }, publisher: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL }, datePublished: "2026-01-01", dateModified: "2026-06-09", url: `${BASE_URL}/tools/timestamp-to-date`, about: { "@type": "Thing", name: "Timestamp Conversion" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Timestamp to Date Online – Free Converter</h1>
        <p className="text-lg text-muted-foreground mb-8">Paste any Unix timestamp and instantly see the corresponding human-readable date. Time Shuttle runs entirely in your browser — your data never leaves your device.</p>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">How to Convert a Timestamp to a Date</h2><ol className="list-decimal pl-6 space-y-3"><li><strong>Enter the timestamp:</strong> Paste or type the Unix timestamp into the input field. Time Shuttle auto-detects whether it is in seconds or milliseconds.</li><li><strong>View all formats:</strong> The date appears instantly in ISO 8601, RFC 2822, UTC string, localized format, and relative time.</li><li><strong>Copy the result:</strong> Click the Copy button next to your preferred format to save it to your clipboard.</li></ol></section>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">Supported Output Formats</h2><ul className="list-disc pl-6 space-y-2"><li><strong>Unix (seconds):</strong> The traditional 10-digit Unix timestamp.</li><li><strong>Unix (milliseconds):</strong> The 13-digit timestamp used by JavaScript.</li><li><strong>ISO 8601:</strong> The international standard date format (e.g., 2023-11-14T22:13:20.000Z).</li><li><strong>RFC 2822:</strong> The date format used in email headers.</li><li><strong>UTC string:</strong> The date in Coordinated Universal Time.</li><li><strong>Localized:</strong> The date formatted for your locale and timezone.</li><li><strong>Relative time:</strong> How long ago or from now (e.g., &quot;3 hours ago&quot;).</li></ul></section>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">Why Use Time Shuttle?</h2><p className="mb-4">Unlike other online converters that send your data to remote servers, Time Shuttle performs all conversions in your browser using native JavaScript Date and Intl APIs. Your timestamps — whether from API responses, database records, or log files — never leave your device.</p><p>Time Shuttle also supports batch conversion: paste multiple timestamps (one per line) and convert them all at once. This is especially useful for analyzing log files or processing large datasets.</p></section>
        <section className="mb-12"><h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2><div className="space-y-6"><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">How do I convert a timestamp to a date?</h3><p className="text-muted-foreground">Paste the Unix timestamp into Time Shuttle. It auto-detects seconds vs milliseconds and shows the date in multiple formats instantly.</p></CardContent></Card><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">What format does the output use?</h3><p className="text-muted-foreground">ISO 8601, RFC 2822, UTC string, localized format, and relative time. Copy any format with one click.</p></CardContent></Card><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Can I convert dates back to timestamps?</h3><p className="text-muted-foreground">Yes. Switch to Date → Timestamp mode and enter any standard date format.</p></CardContent></Card><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Is this tool free and private?</h3><p className="text-muted-foreground">Yes. Completely free, no signup, no ads. All processing is client-side — nothing is sent to any server.</p></CardContent></Card></div></section>
        <div className="text-center mt-12"><Link href="/" className="inline-flex items-center justify-center h-9 gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 text-sm font-medium hover:bg-primary/80 transition-colors"><ArrowRight className="size-4 mr-2" />Try Time Shuttle Free</Link></div>
      </div>
    </>
  );
}
