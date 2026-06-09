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
      title: "时区转换器（在线）– 免费时区转换工具",
      description: "在浏览器中即时转换不同时区的时间。支持全球所有 IANA 时区，完全免费。",
      alternates: { canonical: `/${locale}/tools/timezone-converter`, languages: { en: "/tools/timezone-converter", zh: `/${locale}/tools/timezone-converter`, "x-default": "/tools/timezone-converter" } },
      openGraph: { title: "时区转换器（在线）– 免费时区转换工具", description: "在浏览器中即时转换不同时区的时间。支持全球所有 IANA 时区，完全免费。", siteName: "Time Shuttle", type: "website", locale: "zh_CN", alternateLocale: ["en_US"] },
      twitter: { card: "summary_large_image", title: "时区转换器（在线）– 免费时区转换工具", description: "在浏览器中即时转换不同时区的时间。支持全球所有 IANA 时区，完全免费。" },
    };
  }
  return {
    title: "Timezone Converter Online – Free Time Zone Conversion Tool",
    description: "Convert time between any timezones instantly in your browser. Free online timezone converter using the full IANA timezone database.",
    alternates: { canonical: "/tools/timezone-converter", languages: { en: "/tools/timezone-converter", zh: "/zh/tools/timezone-converter", "x-default": "/tools/timezone-converter" } },
    openGraph: { title: "Timezone Converter Online – Free Time Zone Conversion Tool", description: "Convert time between any timezones instantly in your browser.", siteName: "Time Shuttle", type: "website", locale: "en_US", alternateLocale: ["zh_CN"] },
    twitter: { card: "summary_large_image", title: "Timezone Converter Online – Free Time Zone Conversion Tool", description: "Convert time between any timezones instantly in your browser." },
  };
}

export default async function TimezoneConverterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations("toolPages");
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{t("timezoneConverter.title")}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t("timezoneConverter.subtitle")}</p>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-base font-medium">在首页打开时区转换工具，立即开始转换。</p>
            <Link href="/zh/#tool" className="inline-flex items-center justify-center h-10 gap-1.5 rounded-lg bg-primary text-primary-foreground px-5 text-sm font-medium hover:bg-primary/80 transition-colors">
              <ArrowRight className="size-4 mr-1.5" />{t("openTool")}
            </Link>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-10">
          <Link href="/tools/timezone-converter" className="underline hover:text-foreground transition-colors">{t("fullGuide")}</Link>
        </p>
      </div>
    );
  }

  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }, { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/#tool` }, { "@type": "ListItem", position: 3, name: "Timezone Converter" }] };
  const howToSchema = { "@context": "https://schema.org", "@type": "HowTo", name: "How to Convert Time Between Timezones", description: "Convert time between any IANA timezones using a free online tool.", step: [{ "@type": "HowToStep", name: "Enter a time", text: "Type a Unix timestamp or date into the input field on Time Shuttle." }, { "@type": "HowToStep", name: "Select source timezone", text: "Choose the timezone the original time is in. Your local timezone is selected by default." }, { "@type": "HowToStep", name: "Select target timezone", text: "Choose the timezone you want to convert to. UTC is selected by default." }, { "@type": "HowToStep", name: "View the result", text: "The converted time appears instantly. Copy it with one click." }] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
    { "@type": "Question", name: "What timezones does this converter support?", acceptedAnswer: { "@type": "Answer", text: "Time Shuttle supports all timezones in the IANA timezone database — hundreds of zones worldwide. It uses the browser's native Intl.supportedValuesOf('timeZone') API, so the list is always up to date." } },
    { "@type": "Question", name: "Does it handle daylight saving time?", acceptedAnswer: { "@type": "Answer", text: "Yes. Time Shuttle uses the browser's Intl.DateTimeFormat API, which automatically handles DST transitions for all IANA timezones. No manual offset calculations." } },
    { "@type": "Question", name: "How do I convert UTC to my local time?", acceptedAnswer: { "@type": "Answer", text: "Enter a UTC timestamp or date, set the source timezone to UTC, and set the target timezone to your local timezone. The result shows the equivalent local time." } },
    { "@type": "Question", name: "Can I convert between two non-UTC timezones?", acceptedAnswer: { "@type": "Answer", text: "Yes. Select any two timezones — for example, America/New_York to Asia/Tokyo. The converter handles the full conversion including DST rules." } },
    { "@type": "Question", name: "Is this timezone converter free?", acceptedAnswer: { "@type": "Answer", text: "Yes, completely free with no limits, no signup, and no ads. All processing happens in your browser." } },
    { "@type": "Question", name: "Is my data private?", acceptedAnswer: { "@type": "Answer", text: "Yes. All timezone conversions are performed client-side using native browser APIs. Your data never leaves your device." } },
  ] };
  const techArticleSchema = { "@context": "https://schema.org", "@type": "TechArticle", headline: "Timezone Converter Online – Free Time Zone Conversion Tool", description: "A comprehensive guide to timezone conversion, including IANA timezones, DST handling, and how to convert time between zones online.", author: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL }, publisher: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL }, datePublished: "2026-01-01", dateModified: "2026-06-09", url: `${BASE_URL}/tools/timezone-converter`, about: { "@type": "Thing", name: "Timezone Conversion" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Timezone Converter Online – Free Time Zone Conversion</h1>
        <p className="text-lg text-muted-foreground mb-8">Convert time between any timezones instantly. Time Shuttle uses the full IANA timezone database and handles daylight saving time automatically — no manual offset calculations needed.</p>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">How Timezone Conversion Works</h2><p className="mb-4">Timezones are regions of the Earth that observe the same standard time. The IANA timezone database (also called the Olson database) is the global standard for timezone information, maintained by ICANN. It contains hundreds of timezones, each identified by a region/city name like America/New_York or Asia/Tokyo.</p><p className="mb-4">Time Shuttle uses the browser&apos;s native Intl.DateTimeFormat API to convert between timezones. This API references the IANA database and automatically handles daylight saving time (DST) transitions, historical timezone changes, and regional rules. There are no hardcoded UTC offsets — every conversion is accurate.</p></section>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">How to Use the Timezone Converter</h2><ol className="list-decimal pl-6 space-y-3"><li><strong>Enter a time:</strong> Type a Unix timestamp or a human-readable date into the input field.</li><li><strong>Select the source timezone:</strong> Choose the timezone the original time is in. Your local timezone is selected by default.</li><li><strong>Select the target timezone:</strong> Choose the timezone you want to convert to. UTC is the default target.</li><li><strong>View the result:</strong> The converted time appears instantly. Click Copy to save it to your clipboard.</li></ol></section>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">Supported Timezones</h2><p className="mb-4">Time Shuttle supports all timezones in the IANA database, including major zones like UTC, EST, PST, CET, JST, IST, and hundreds more. The full list includes:</p><ul className="list-disc pl-6 space-y-2"><li><strong>Americas:</strong> New York, Los Angeles, Chicago, São Paulo, Buenos Aires, and more.</li><li><strong>Europe:</strong> London, Paris, Berlin, Moscow, Istanbul, and more.</li><li><strong>Asia:</strong> Tokyo, Shanghai, Mumbai, Dubai, Singapore, and more.</li><li><strong>Pacific:</strong> Sydney, Auckland, Honolulu, and more.</li><li><strong>Africa:</strong> Cairo, Lagos, Nairobi, Johannesburg, and more.</li></ul></section>
        <section className="mb-10"><h2 className="text-2xl font-semibold mb-4">Daylight Saving Time (DST)</h2><p className="mb-4">Many regions observe daylight saving time, where clocks are advanced by one hour during warmer months. DST rules vary by country and change over time. Time Shuttle handles DST automatically because it relies on the browser&apos;s Intl API, which is updated with the latest IANA timezone data.</p><p>For example, when converting from America/New_York to Europe/London, the tool correctly accounts for the fact that the US and EU switch to/from DST on different dates.</p></section>
        <section className="mb-12"><h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2><div className="space-y-6"><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">What timezones does this converter support?</h3><p className="text-muted-foreground">All timezones in the IANA database — hundreds worldwide. The browser&apos;s Intl API keeps the list up to date.</p></CardContent></Card><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Does it handle daylight saving time?</h3><p className="text-muted-foreground">Yes. DST transitions are handled automatically by the browser&apos;s Intl.DateTimeFormat API.</p></CardContent></Card><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Can I convert between two non-UTC timezones?</h3><p className="text-muted-foreground">Yes. Select any two timezones from the dropdown menus. The full conversion including DST rules is handled automatically.</p></CardContent></Card><Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Is this tool free and private?</h3><p className="text-muted-foreground">Yes. Completely free, no signup, no ads. All processing is client-side — nothing is sent to any server.</p></CardContent></Card></div></section>
        <div className="text-center mt-12"><Link href="/" className="inline-flex items-center justify-center h-9 gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 text-sm font-medium hover:bg-primary/80 transition-colors"><ArrowRight className="size-4 mr-2" />Try Time Shuttle Free</Link></div>
      </div>
    </>
  );
}
