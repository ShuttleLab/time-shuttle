import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    title: t("title"),
    description: "Privacy Policy for Time Shuttle",
    alternates: {
      canonical: locale === "en" ? "/privacy" : `/${locale}/privacy`,
      languages: { en: "/privacy", zh: "/zh/privacy", "x-default": "/privacy" },
    },
    openGraph: {
      title: t("title"),
      description: "Privacy Policy for Time Shuttle",
      siteName: "Time Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: "Privacy Policy for Time Shuttle" },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacyPage");

  const sections = [
    { key: "section1", content: "section1Content" },
    { key: "section2", content: "section2Content" },
    { key: "section3", content: "section3Content" },
    { key: "section4", content: "section4Content" },
    { key: "section5", content: "section5Content" },
    { key: "section6", content: "section6Content" },
    { key: "section7", content: "section7Content" },
    { key: "section8", content: "section8Content" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t("lastUpdated")}: 2026-06-09</p>
      <p className="text-muted-foreground leading-relaxed mb-8">{t("intro")}</p>
      <div className="space-y-8">
        {sections.map(({ key, content }) => (
          <section key={key}>
            <h2 className="text-xl font-semibold mb-3">{t(key)}</h2>
            <p className="text-muted-foreground leading-relaxed">{t(content)}</p>
          </section>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">{t("footer")}</div>
    </div>
  );
}
