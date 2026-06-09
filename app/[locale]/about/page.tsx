import { getTranslations, setRequestLocale } from "next-intl/server";
import { Shield, UserCheck, Code, Zap, Mail, Heart, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AboutFaq } from "@/components/AboutFaq";
import { aboutFaqData } from "@/components/AboutFaqData";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    alternates: {
      canonical: locale === "en" ? "/about" : `/${locale}/about`,
      languages: { en: "/about", zh: "/zh/about", "x-default": "/about" },
    },
    openGraph: {
      title: t("heroTitle"),
      description: t("heroSubtitle"),
      siteName: "Time Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
    twitter: { card: "summary_large_image", title: t("heroTitle"), description: t("heroSubtitle") },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const lang = locale === "zh" ? "zh" : "en";
  const { FAQS: faqs, HOWTOS: howtos } = aboutFaqData;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q[lang],
      acceptedAnswer: { "@type": "Answer", text: item.a[lang] },
    })),
  };

  const howToSchemas = howtos.map((ht) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    name: ht.name[lang],
    step: ht.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s[lang] })),
  }));

  const safeFeatures = [
    { icon: Shield, title: t("safe"), desc: t("safeDesc") },
    { icon: UserCheck, title: t("privacy"), desc: t("privacyDesc") },
    { icon: Code, title: t("ttl"), desc: t("ttlDesc") },
    { icon: Zap, title: t("fast"), desc: t("fastDesc") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {howToSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("heroTitle")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("heroSubtitle")}</p>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{t("serviceTitle")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{t("serviceP1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("serviceP2")}</p>
        </section>
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {safeFeatures.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 shrink-0"><Icon className="size-5 text-primary" /></div>
                  <div><h3 className="font-semibold mb-1 text-base">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{desc}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mb-16"><AboutFaq /></section>
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary via-primary to-chart-5 text-primary-foreground rounded-2xl p-8 sm:p-10 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0"><Heart className="size-7" /></div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">{t("supportTitle")}</h2>
            </div>
            <p className="mb-8 opacity-90 text-base sm:text-lg leading-relaxed">{t("supportDesc")}</p>
            <a href="https://time.shuttlelab.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors px-5 py-2.5 rounded-lg text-sm font-medium">
              <Share2 className="size-4" />{t("supportShare")}
            </a>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("contactTitle")}</h2>
          <p className="text-muted-foreground mb-4">{t("contactDesc")}</p>
          <a href={`mailto:${t("contactEmail")}`} className="inline-flex items-center gap-2 text-primary hover:underline"><Mail className="size-4" />{t("contactEmail")}</a>
        </section>
      </div>
    </>
  );
}
