"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/about" className="hover:text-foreground transition-colors">{t("common.about")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">{t("common.privacyPolicy")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">{t("common.terms")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/terms#refund" className="hover:text-foreground transition-colors">{t("common.refundPolicy")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <a href="mailto:support@shuttlelab.org" className="hover:text-foreground transition-colors">{t("common.contact")}</a>
            <span className="text-muted-foreground/30">|</span>
            <a href="https://github.com/ShuttleLab" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t("common.feedback")}</a>
          </div>
          <p className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-muted-foreground/70">{t("common.alsoFrom")}:</span>
            <a href="https://note.shuttlelab.org" rel="noopener" className="font-semibold text-foreground hover:text-primary transition-colors">
              Note Shuttle
            </a>
            <span className="text-muted-foreground/40 text-xs">{t("common.notePromoDesc")}</span>
            <span className="text-muted-foreground/30">|</span>
            <a href="https://status.shuttlelab.org" rel="noopener" className="font-semibold text-foreground hover:text-primary transition-colors">
              Status Shuttle
            </a>
            <span className="text-muted-foreground/40 text-xs">{t("common.statusPromoDesc")}</span>
          </p>
          <p>&copy; {new Date().getFullYear()}{" "}<Link href="/">{t("common.allName")}</Link>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
