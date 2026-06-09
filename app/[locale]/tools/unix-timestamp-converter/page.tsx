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
      title: "Unix Timestamp Converter（在线）– 免费时间戳转换工具",
      description: "在浏览器中即时将 Unix 时间戳转换为人类可读日期，或反向转换。支持秒和毫秒，完全免费。",
      alternates: {
        canonical: `/${locale}/tools/unix-timestamp-converter`,
        languages: { en: "/tools/unix-timestamp-converter", zh: `/${locale}/tools/unix-timestamp-converter`, "x-default": "/tools/unix-timestamp-converter" },
      },
      openGraph: {
        title: "Unix Timestamp Converter（在线）– 免费时间戳转换工具",
        description: "在浏览器中即时将 Unix 时间戳转换为人类可读日期，或反向转换。支持秒和毫秒，完全免费。",
        siteName: "Time Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: ["en_US"],
      },
      twitter: { card: "summary_large_image", title: "Unix Timestamp Converter（在线）– 免费时间戳转换工具", description: "在浏览器中即时将 Unix 时间戳转换为人类可读日期，或反向转换。支持秒和毫秒，完全免费。" },
    };
  }
  return {
    title: "Unix Timestamp Converter Online – Free Epoch Converter Tool",
    description: "Convert Unix timestamps to human-readable dates and back instantly in your browser. Free online epoch converter with auto-detection of seconds and milliseconds.",
    alternates: {
      canonical: "/tools/unix-timestamp-converter",
      languages: { en: "/tools/unix-timestamp-converter", zh: "/zh/tools/unix-timestamp-converter", "x-default": "/tools/unix-timestamp-converter" },
    },
    openGraph: {
      title: "Unix Timestamp Converter Online – Free Epoch Converter Tool",
      description: "Convert Unix timestamps to human-readable dates and back instantly in your browser. Free online epoch converter with auto-detection of seconds and milliseconds.",
      siteName: "Time Shuttle",
      type: "website",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
    },
    twitter: { card: "summary_large_image", title: "Unix Timestamp Converter Online – Free Epoch Converter Tool", description: "Convert Unix timestamps to human-readable dates and back instantly in your browser." },
  };
}

export default async function UnixTimestampConverterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations("toolPages");
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{t("unixTimestampConverter.title")}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t("unixTimestampConverter.subtitle")}</p>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-base font-medium">{t("unixTimestampConverter.openHint")}</p>
            <Link
              href="/zh/#tool"
              className="inline-flex items-center justify-center h-10 gap-1.5 rounded-lg bg-primary text-primary-foreground px-5 text-sm font-medium hover:bg-primary/80 transition-colors"
            >
              <ArrowRight className="size-4 mr-1.5" />
              {t("openTool")}
            </Link>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-10">
          <Link href="/tools/unix-timestamp-converter" className="underline hover:text-foreground transition-colors">
            {t("fullGuide")}
          </Link>
        </p>
      </div>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/#tool` },
      { "@type": "ListItem", position: 3, name: "Unix Timestamp Converter" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: "en-US",
    name: "How to Convert a Unix Timestamp Online",
    description: "Convert any Unix timestamp to a human-readable date using a free online tool.",
    step: [
      { "@type": "HowToStep", name: "Open the converter", text: "Navigate to the Unix Timestamp Converter on Time Shuttle. No account or installation required.", url: `${BASE_URL}/tools/unix-timestamp-converter` },
      { "@type": "HowToStep", name: "Paste your timestamp", text: "Enter the Unix timestamp in the input field. The tool auto-detects whether it is in seconds (10 digits) or milliseconds (13 digits)." },
      { "@type": "HowToStep", name: "View all formats", text: "The converter instantly displays the same moment as Unix (s), Unix (ms), ISO 8601, RFC 2822, UTC string, localized date, and relative time." },
      { "@type": "HowToStep", name: "Copy the result", text: "Click the Copy button next to any format to save it to your clipboard for use in code, APIs, or documentation." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-US",
    mainEntity: [
      { "@type": "Question", name: "What is a Unix timestamp?", acceptedAnswer: { "@type": "Answer", text: "A Unix timestamp is the number of seconds that have elapsed since 1970-01-01 00:00:00 UTC, not counting leap seconds. It is the standard way computers represent time, used in databases, APIs, log files, and operating systems worldwide." } },
      { "@type": "Question", name: "What is the difference between 10-digit and 13-digit timestamps?", acceptedAnswer: { "@type": "Answer", text: "A 10-digit number is a Unix timestamp in seconds. A 13-digit number is a Unix timestamp in milliseconds. For example, 1700000000 (seconds) and 1700000000000 (milliseconds) represent the same moment: 2023-11-14T22:13:20Z. Time Shuttle auto-detects both formats." } },
      { "@type": "Question", name: "What date is 1700000000 in Unix time?", acceptedAnswer: { "@type": "Answer", text: "Unix timestamp 1700000000 (in seconds) corresponds to 2023-11-14T22:13:20Z (UTC). In milliseconds, 1700000000000 represents the same moment. You can enter either value in Time Shuttle to see it in all formats." } },
      { "@type": "Question", name: "Does this converter handle timezones?", acceptedAnswer: { "@type": "Answer", text: "Yes. Time Shuttle displays the converted date in your local timezone by default, and also shows UTC. The timezone converter tab lets you convert between any IANA timezones using the browser's native Intl API." } },
      { "@type": "Question", name: "Is this Unix timestamp converter free?", acceptedAnswer: { "@type": "Answer", text: "Yes, Time Shuttle is completely free with no usage limits. There is no signup, no watermark, and no hidden fees. All conversions happen in your browser for complete privacy." } },
      { "@type": "Question", name: "Is my data safe when converting timestamps?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. All conversions are performed client-side in your browser using native JavaScript Date and Intl APIs. Your data never leaves your device, so there is zero risk of interception." } },
    ],
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Unix Timestamp Converter Online – Free Epoch Converter Tool",
    description: "A comprehensive guide to Unix timestamps, including how they work, common use cases, and how to convert timestamps online for free.",
    author: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL },
    datePublished: "2026-01-01",
    dateModified: "2026-06-09",
    url: `${BASE_URL}/tools/unix-timestamp-converter`,
    about: { "@type": "Thing", name: "Unix Timestamp" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Unix Timestamp Converter Online – Free Epoch Converter</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Convert any Unix timestamp to a human-readable date in seconds. Time Shuttle runs entirely in your browser, so your data stays private and never touches a server.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">What Is a Unix Timestamp?</h2>
          <p className="mb-4">
            A Unix timestamp (also called epoch time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC, not counting leap seconds. This starting point is known as the Unix epoch. Every second since then increments the timestamp by one — for example, the timestamp 1700000000 corresponds to November 14, 2023, at 22:13:20 UTC.
          </p>
          <p className="mb-4">
            Unix timestamps are the universal language of computing. Operating systems, databases, programming languages, and APIs all use them to represent time in a timezone-independent, easily comparable format. When you see a timestamp in a database record, an API response, a log file, or an HTTP header, it is almost always a Unix timestamp.
          </p>
          <p className="mb-4">
            The key advantage of Unix timestamps is their simplicity. They are just integers — no string parsing, no timezone ambiguity, no locale-dependent formatting. Two timestamps can be compared with a simple numeric comparison, making them ideal for sorting, filtering, and calculating time intervals.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Seconds vs. Milliseconds: How to Tell the Difference</h2>
          <p className="mb-4">
            Unix timestamps come in two common formats: seconds and milliseconds. A 10-digit timestamp is in seconds (the traditional format), while a 13-digit timestamp is in milliseconds (used by JavaScript and many modern APIs). For example, 1700000000 and 1700000000000 represent the exact same moment.
          </p>
          <p className="mb-4">
            Time Shuttle automatically detects whether your input is in seconds or milliseconds based on the number of digits. If the timestamp has 10 or fewer digits, it is treated as seconds. If it has 11–13 digits, it is treated as milliseconds. This auto-detection eliminates the most common source of confusion when working with timestamps.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How to Use the Unix Timestamp Converter</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Open the tool:</strong> Navigate to the Unix Timestamp Converter on Time Shuttle. No installation or account creation is needed.</li>
            <li><strong>Paste your timestamp:</strong> Enter the Unix timestamp in the input field. The tool accepts both seconds and milliseconds.</li>
            <li><strong>View all formats:</strong> The converter instantly displays the same moment in every format — Unix (s), Unix (ms), ISO 8601, RFC 2822, UTC string, localized date, and relative time.</li>
            <li><strong>Copy the result:</strong> Click the Copy button next to any format to save it to your clipboard.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Auto-detection:</strong> Automatically identifies whether your timestamp is in seconds or milliseconds.</li>
            <li><strong>Multi-format output:</strong> See the same moment as Unix (s), Unix (ms), ISO 8601, RFC 2822, UTC, localized, and relative time.</li>
            <li><strong>Timezone support:</strong> Convert between any IANA timezones using the browser&apos;s native Intl API.</li>
            <li><strong>Client-side processing:</strong> All conversions happen in your browser. Your data never leaves your device.</li>
            <li><strong>Unlimited usage:</strong> Convert as many timestamps as you want with no daily limits.</li>
            <li><strong>No signup required:</strong> Start converting immediately without creating an account.</li>
            <li><strong>Batch conversion:</strong> Paste multiple timestamps (one per line) and convert them all at once.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
          <p className="mb-4"><strong>API debugging:</strong> When working with REST APIs, timestamps in responses need to be converted to human-readable dates for debugging. Time Shuttle makes this instant.</p>
          <p className="mb-4"><strong>Log analysis:</strong> Server logs often record events as Unix timestamps. Converting them to local time helps you understand when events occurred.</p>
          <p className="mb-4"><strong>Database records:</strong> Many databases store timestamps as Unix integers. Use Time Shuttle to quickly check what date a record represents.</p>
          <p className="mb-4"><strong>JWT tokens:</strong> JWT payloads contain timestamps for issued-at (iat), expiration (exp), and not-before (nbf) claims. Decode and view them instantly.</p>
          <p className="mb-4"><strong>Cache headers:</strong> HTTP cache headers like Expires and Last-Modified use timestamps. Time Shuttle helps you verify cache behavior.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">What is a Unix timestamp?</h3><p className="text-muted-foreground">A Unix timestamp is the number of seconds since 1970-01-01 00:00:00 UTC, not counting leap seconds. It is the standard way computers represent time.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">What is the difference between 10-digit and 13-digit timestamps?</h3><p className="text-muted-foreground">10-digit = seconds, 13-digit = milliseconds. Both represent the same moment. Time Shuttle auto-detects both formats.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">What date is 1700000000?</h3><p className="text-muted-foreground">Unix timestamp 1700000000 corresponds to 2023-11-14T22:13:20Z (UTC). Enter it in Time Shuttle to see all formats and your local time.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Does this converter handle timezones?</h3><p className="text-muted-foreground">Yes. Time Shuttle shows the date in your local timezone by default and also shows UTC. The timezone tab lets you convert between any IANA timezones.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Is this converter free?</h3><p className="text-muted-foreground">Yes, completely free with no limits, no signup, and no ads. All processing happens in your browser.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Is my data safe?</h3><p className="text-muted-foreground">Absolutely. All conversions are client-side using native browser APIs. Your data never leaves your device.</p></CardContent></Card>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center justify-center h-9 gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 text-sm font-medium hover:bg-primary/80 transition-colors">
            <ArrowRight className="size-4 mr-2" />
            Try Time Shuttle Free
          </Link>
        </div>
      </div>
    </>
  );
}
