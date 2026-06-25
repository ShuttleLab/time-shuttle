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
      title: "时间单位换算器（在线）– 秒、毫秒、纳秒到幺秒",
      description: "在浏览器中即时换算时间单位：年、月、周、日、时、分、秒，以及毫秒、微秒、纳秒、皮秒、飞秒、阿秒、仄秒、幺秒。完全免费、私密。",
      alternates: {
        canonical: `/${locale}/tools/time-unit-converter`,
        languages: { en: "/tools/time-unit-converter", zh: `/${locale}/tools/time-unit-converter`, "x-default": "/tools/time-unit-converter" },
      },
      openGraph: {
        title: "时间单位换算器（在线）– 秒、毫秒、纳秒到幺秒",
        description: "在浏览器中即时换算时间单位：年、月、周、日、时、分、秒，以及毫秒、微秒、纳秒、皮秒、飞秒、阿秒、仄秒、幺秒。完全免费、私密。",
        siteName: "Time Shuttle",
        type: "website",
        locale: "zh_CN",
        alternateLocale: ["en_US"],
      },
      twitter: { card: "summary_large_image", title: "时间单位换算器（在线）– 秒、毫秒、纳秒到幺秒", description: "在浏览器中即时换算时间单位：年到幺秒，完全免费、私密。" },
    };
  }
  return {
    title: "Time Unit Converter Online – Seconds, Milliseconds & More",
    description: "Convert between any time units instantly in your browser — years, days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds, all the way to yoctoseconds. Free and private.",
    alternates: {
      canonical: "/tools/time-unit-converter",
      languages: { en: "/tools/time-unit-converter", zh: "/zh/tools/time-unit-converter", "x-default": "/tools/time-unit-converter" },
    },
    openGraph: {
      title: "Time Unit Converter Online – Seconds, Milliseconds & More",
      description: "Convert between any time units instantly in your browser — years down to yoctoseconds. Free and private.",
      siteName: "Time Shuttle",
      type: "website",
      locale: "en_US",
      alternateLocale: ["zh_CN"],
    },
    twitter: { card: "summary_large_image", title: "Time Unit Converter Online – Seconds, Milliseconds & More", description: "Convert between any time units instantly in your browser — years down to yoctoseconds." },
  };
}

export default async function TimeUnitConverterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    const t = await getTranslations("toolPages");
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{t("timeUnitConverter.title")}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t("timeUnitConverter.subtitle")}</p>
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-base font-medium">{t("timeUnitConverter.openHint")}</p>
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
          <Link href="/tools/time-unit-converter" className="underline hover:text-foreground transition-colors">
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
      { "@type": "ListItem", position: 3, name: "Time Unit Converter" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: "en-US",
    name: "How to Convert Between Time Units Online",
    description: "Convert a value between any time units, from years down to yoctoseconds, using a free online tool.",
    step: [
      { "@type": "HowToStep", name: "Open the converter", text: "Navigate to Time Shuttle and open the Units tab. No account or installation required.", url: `${BASE_URL}/tools/time-unit-converter` },
      { "@type": "HowToStep", name: "Enter a value", text: "Type the number you want to convert into the value field." },
      { "@type": "HowToStep", name: "Choose the source unit", text: "Select the unit your value is in — for example seconds, days, or years." },
      { "@type": "HowToStep", name: "Read every unit at once", text: "The tool instantly shows the value converted into every time unit, from years to yoctoseconds, each with a one-click copy button." },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-US",
    mainEntity: [
      { "@type": "Question", name: "What time units can I convert between?", acceptedAnswer: { "@type": "Answer", text: "Time Shuttle converts between years, months, weeks, days, hours, minutes, and seconds, as well as every sub-second SI unit: milliseconds (ms), microseconds (µs), nanoseconds (ns), picoseconds (ps), femtoseconds (fs), attoseconds (as), zeptoseconds (zs), and yoctoseconds (ys)." } },
      { "@type": "Question", name: "How many seconds are in a day?", acceptedAnswer: { "@type": "Answer", text: "There are 86,400 seconds in a day (24 × 60 × 60). That is 86,400,000 milliseconds and 86,400,000,000,000 nanoseconds." } },
      { "@type": "Question", name: "How many seconds are in a year?", acceptedAnswer: { "@type": "Answer", text: "Time Shuttle uses the Julian year of 365.25 days, which is 31,557,600 seconds. The month is defined as one twelfth of that (about 30.44 days), the same convention used by most scientific calculators." } },
      { "@type": "Question", name: "How many nanoseconds are in a second?", acceptedAnswer: { "@type": "Answer", text: "One second equals 1,000 milliseconds, 1,000,000 microseconds, or 1,000,000,000 (one billion) nanoseconds. Each smaller SI unit is a further factor of 1,000." } },
      { "@type": "Question", name: "Are years and months exact?", acceptedAnswer: { "@type": "Answer", text: "Years and months are calendar approximations (year = 365.25 days, month = year / 12), because their real length varies. Every unit from weeks down to yoctoseconds is an exact, fixed relationship." } },
      { "@type": "Question", name: "Is the time unit converter free and private?", acceptedAnswer: { "@type": "Answer", text: "Yes. It is completely free with no limits or signup, and every conversion runs in your browser using plain JavaScript — nothing is sent to any server." } },
    ],
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Time Unit Converter Online – Seconds, Milliseconds & More",
    description: "A guide to converting between time units — from years and days to milliseconds, nanoseconds, and yoctoseconds — including the conversion factors and how SI sub-second units work.",
    author: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Time Shuttle", url: BASE_URL },
    datePublished: "2026-06-25",
    dateModified: "2026-06-25",
    url: `${BASE_URL}/tools/time-unit-converter`,
    about: { "@type": "Thing", name: "Time Unit Conversion" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Time Unit Converter Online – Free &amp; Private</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Convert any value between time units — years, days, hours, minutes, and seconds, all the way down to milliseconds, nanoseconds, and yoctoseconds. Time Shuttle runs entirely in your browser, so your data stays private and never touches a server.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">From Years to Yoctoseconds</h2>
          <p className="mb-4">
            The second is the SI base unit of time, and every other unit is defined relative to it. Larger units group seconds into the familiar calendar quantities — minutes, hours, days, weeks, months, and years — while smaller units divide the second using SI prefixes, each a factor of one thousand apart.
          </p>
          <p className="mb-4">
            Time Shuttle converts a single value into every one of these units at once, so you never have to chain conversions or remember the factors. Enter a number, pick its unit, and read the result across the whole range.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How to Convert Time Units</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Open the Units tab:</strong> On the Time Shuttle home page, switch to the Units tab. No installation or account is needed.</li>
            <li><strong>Enter a value:</strong> Type the number you want to convert.</li>
            <li><strong>Choose the source unit:</strong> Select the unit your value is in — seconds, days, years, nanoseconds, and so on.</li>
            <li><strong>Read every unit:</strong> The tool instantly shows the value in every time unit, each with a one-click copy button.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Supported Units &amp; Conversion Factors</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Year:</strong> 365.25 days = 31,557,600 seconds (Julian year).</li>
            <li><strong>Month:</strong> one twelfth of a year ≈ 30.44 days.</li>
            <li><strong>Week:</strong> 7 days = 604,800 seconds.</li>
            <li><strong>Day:</strong> 24 hours = 86,400 seconds.</li>
            <li><strong>Hour:</strong> 60 minutes = 3,600 seconds.</li>
            <li><strong>Minute:</strong> 60 seconds.</li>
            <li><strong>Second:</strong> the SI base unit.</li>
            <li><strong>Millisecond (ms):</strong> 10⁻³ s — one thousandth of a second.</li>
            <li><strong>Microsecond (µs):</strong> 10⁻⁶ s.</li>
            <li><strong>Nanosecond (ns):</strong> 10⁻⁹ s — one billionth of a second.</li>
            <li><strong>Picosecond (ps):</strong> 10⁻¹² s.</li>
            <li><strong>Femtosecond (fs):</strong> 10⁻¹⁵ s.</li>
            <li><strong>Attosecond (as):</strong> 10⁻¹⁸ s.</li>
            <li><strong>Zeptosecond (zs):</strong> 10⁻²¹ s.</li>
            <li><strong>Yoctosecond (ys):</strong> 10⁻²⁴ s — the smallest named SI sub-second unit.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Common Conversions</h2>
          <p className="mb-4"><strong>1 day</strong> = 24 hours = 1,440 minutes = 86,400 seconds = 86,400,000 milliseconds.</p>
          <p className="mb-4"><strong>1 hour</strong> = 60 minutes = 3,600 seconds = 3,600,000 milliseconds.</p>
          <p className="mb-4"><strong>1 second</strong> = 1,000 ms = 1,000,000 µs = 1,000,000,000 ns.</p>
          <p className="mb-4"><strong>1 year</strong> (365.25 days) = 31,557,600 seconds ≈ 3.156 × 10¹⁶ nanoseconds.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Why Use Time Shuttle?</h2>
          <p className="mb-4">
            Most online unit converters either cover only the common units (seconds to days) or send your input to a server. Time Shuttle does neither: it spans the full range from years down to yoctoseconds, and every calculation happens locally in your browser using plain JavaScript. Nothing you type ever leaves your device.
          </p>
          <p>
            For very large or very small results, values are shown in clean scientific notation so the answer stays readable even across more than fifty orders of magnitude.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">What time units can I convert between?</h3><p className="text-muted-foreground">Years, months, weeks, days, hours, minutes, seconds, and every sub-second SI unit down to yoctoseconds (ms, µs, ns, ps, fs, as, zs, ys).</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">How many seconds are in a day?</h3><p className="text-muted-foreground">86,400 seconds (24 × 60 × 60), which is 86,400,000 milliseconds and 86,400,000,000,000 nanoseconds.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">How many nanoseconds are in a second?</h3><p className="text-muted-foreground">One second = 1,000 ms = 1,000,000 µs = 1,000,000,000 ns. Each smaller SI unit is another factor of 1,000.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Are years and months exact?</h3><p className="text-muted-foreground">They are calendar approximations (year = 365.25 days, month = year / 12). Everything from weeks down to yoctoseconds is an exact relationship.</p></CardContent></Card>
            <Card><CardContent className="pt-6"><h3 className="font-semibold mb-2">Is it free and private?</h3><p className="text-muted-foreground">Yes. Completely free, no signup, no ads. All processing happens in your browser.</p></CardContent></Card>
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
