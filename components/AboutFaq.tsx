"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WHO_FOR, WHEN_USE, HOWTOS, FAQS, COMPARISON, HEADINGS } from "./AboutFaqData";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0">
      <button className="flex w-full items-center justify-between py-4 text-left font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        <span>{q}</span>
        {isOpen ? <ChevronUp className="size-5 shrink-0" /> : <ChevronDown className="size-5 shrink-0" />}
      </button>
      {isOpen && <div className="pb-4 text-muted-foreground leading-relaxed">{a}</div>}
    </div>
  );
}

export function AboutFaq() {
  const locale = useLocale();
  const lang = locale === "zh" ? "zh" : "en";
  const comparison = COMPARISON[lang];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-6">{HEADINGS.whoFor[lang]}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHO_FOR.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <Badge variant="secondary">{i + 1}</Badge>
                <span className="font-medium">{item[lang]}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{HEADINGS.whenUse[lang]}</h2>
        <div className="space-y-4">
          {WHEN_USE.map((item, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2"><Badge variant="secondary" className="mr-2">{i + 1}</Badge>{item[lang]}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{lang === "zh" ? "使用教程" : "How-To Guides"}</h2>
        <div className="space-y-6">
          {HOWTOS.map((howto) => (
            <Card key={howto.id}>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4">{howto.name[lang]}</h3>
                <ol className="space-y-3">
                  {howto.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{i + 1}</span>
                      <span className="text-sm">{step[lang]}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{comparison.heading}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                {comparison.columns.map((col, i) => (
                  <th key={i} className="text-left py-3 px-4 font-semibold text-sm">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`py-3 px-4 text-sm ${j === 0 ? "font-medium" : ""}`}>
                      {cell === "✓" ? <span className="text-green-600">✓</span> : cell === "✗" ? <span className="text-red-500">✗</span> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">{HEADINGS.faq[lang]}</h2>
        <Card>
          <CardContent className="p-5">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q[lang]} a={faq.a[lang]} />
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
