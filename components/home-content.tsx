"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Clock, Copy, ArrowRightLeft, RefreshCw, Globe, Zap, DollarSign } from "lucide-react";
import { toast } from "sonner";
import {
  parseTimestamp,
  parseDateInput,
  formatAllFormats,
  formatInTimezone,
  getTimezoneList,
  batchConvertTimestamps,
  type TimeFormat,
} from "@/lib/time";

type Mode = "timestamp-to-date" | "date-to-timestamp";

export function HomeContent() {
  const t = useTranslations("home");
  const tt = useTranslations("tools");
  const locale = useLocale();
  const [mode, setMode] = useState<Mode>("timestamp-to-date");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<TimeFormat | null>(null);
  const [nowTs, setNowTs] = useState<{ seconds: string; milliseconds: string }>({ seconds: "", milliseconds: "" });
  const [sourceTz, setSourceTz] = useState<string>("");
  const [targetTz, setTargetTz] = useState<string>("");
  const [tzResult, setTzResult] = useState<string>("");
  const [batchInput, setBatchInput] = useState("");
  const [batchResults, setBatchResults] = useState<{ input: string; output: string }[]>([]);
  const [activeTab, setActiveTab] = useState("converter");
  const timezones = getTimezoneList();

  useEffect(() => {
    if (typeof Intl !== "undefined") {
      const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- initialize from browser API after mount
      setSourceTz(localTz);
      setTargetTz("UTC");
    }
  }, []);

  const updateNow = useCallback(() => {
    const now = Date.now();
    setNowTs({
      seconds: Math.floor(now / 1000).toString(),
      milliseconds: now.toString(),
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial tick + interval for live timestamp
    updateNow();
    const interval = setInterval(updateNow, 1000);
    return () => clearInterval(interval);
  }, [updateNow]);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      return;
    }

    if (mode === "timestamp-to-date") {
      const date = parseTimestamp(input);
      if (!date) {
        setResult(null);
        toast.error(tt("invalidTimestamp"));
        return;
      }
      setResult(formatAllFormats(date, locale));
    } else {
      const date = parseDateInput(input);
      if (!date) {
        setResult(null);
        toast.error(tt("invalidDate"));
        return;
      }
      setResult(formatAllFormats(date, locale));
    }
  }, [input, mode, locale, tt]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- auto-convert on input/mode change
    handleConvert();
  }, [handleConvert]);

  const handleTimezoneConvert = useCallback(() => {
    if (!input.trim() || !sourceTz || !targetTz) {
      setTzResult("");
      return;
    }
    let date: Date | null = null;
    if (mode === "timestamp-to-date") {
      date = parseTimestamp(input);
    } else {
      date = parseDateInput(input);
    }
    if (!date) {
      setTzResult("");
      return;
    }
    setTzResult(formatInTimezone(date, targetTz, locale));
  }, [input, mode, sourceTz, targetTz, locale]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- auto-convert timezone on input change
    handleTimezoneConvert();
  }, [handleTimezoneConvert]);

  const handleBatchConvert = useCallback(() => {
    if (!batchInput.trim()) {
      setBatchResults([]);
      return;
    }
    setBatchResults(batchConvertTimestamps(batchInput));
  }, [batchInput]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label}: ${tt("copied") || "Copied!"}`);
    });
  };

  const swapMode = () => {
    setMode(mode === "timestamp-to-date" ? "date-to-timestamp" : "timestamp-to-date");
    setInput("");
    setResult(null);
  };

  const features = [
    { icon: ArrowRightLeft, title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: Shield, title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: Zap, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: Globe, title: t("feature4Title"), desc: t("feature4Desc") },
    { icon: Clock, title: t("feature5Title"), desc: t("feature5Desc") },
    { icon: DollarSign, title: t("feature6Title"), desc: t("feature6Desc") },
  ];

  const steps = [
    { num: 1, title: t("step1Title"), desc: t("step1Desc") },
    { num: 2, title: t("step2Title"), desc: t("step2Desc") },
    { num: 3, title: t("step3Title"), desc: t("step3Desc") },
  ];

  const formatTimezoneLabel = (tz: string) => {
    if (tz === sourceTz && tz === Intl.DateTimeFormat().resolvedOptions().timeZone) {
      return `${tz} (${tt("localTimezone")})`;
    }
    return tz.replace(/_/g, " ");
  };

  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 pt-8 pb-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Time Shuttle</h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-3">{t("subtitle")}</p>
        <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
          <Shield className="size-3.5" />
          {t("privacyBadge")}
        </div>
      </section>

      <section id="tool" className="max-w-5xl mx-auto px-4 pb-16">
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="converter">{tt("allFormats")}</TabsTrigger>
                <TabsTrigger value="timezone">{tt("targetTimezone")}</TabsTrigger>
                <TabsTrigger value="batch">{tt("batchConvert")}</TabsTrigger>
                <TabsTrigger value="now">{tt("now")}</TabsTrigger>
              </TabsList>

              <TabsContent value="converter">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={mode === "timestamp-to-date" ? "default" : "secondary"}>
                      {tt("timestampToDate")}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={swapMode} className="h-8">
                      <ArrowRightLeft className="size-4 mr-1" />
                      {tt("swap")}
                    </Button>
                    <Badge variant={mode === "date-to-timestamp" ? "default" : "secondary"}>
                      {tt("dateToTimestamp")}
                    </Badge>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{tt("input")}</label>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={mode === "timestamp-to-date" ? tt("enterTimestamp") : tt("enterDate")}
                      className="field-sizing-content min-h-28 max-h-[50vh] resize-y font-mono text-base"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-medium">{tt("output")}</label>
                      {result && (
                        <Button variant="ghost" size="sm" onClick={() => {
                          const text = result ? [
                            `${tt("unixSeconds")}: ${result.unixSeconds}`,
                            `${tt("unixMilliseconds")}: ${result.unixMilliseconds}`,
                            `${tt("iso8601")}: ${result.iso8601}`,
                            `${tt("rfc2822")}: ${result.rfc2822}`,
                            `${tt("utcString")}: ${result.utcString}`,
                            `${tt("localized")}: ${result.localized}`,
                            `${tt("relativeTime")}: ${result.relativeTime}`,
                          ].join("\n") : "";
                          copyToClipboard(text, tt("allFormats"));
                        }} className="h-7 text-xs" aria-label={tt("copyResult")}>
                          <Copy className="size-3 mr-1" />
                          {tt("copyResult")}
                        </Button>
                      )}
                    </div>
                    {result ? (
                      <div className="grid gap-2">
                        {[
                          { label: tt("unixSeconds"), value: result.unixSeconds, copy: true },
                          { label: tt("unixMilliseconds"), value: result.unixMilliseconds, copy: true },
                          { label: tt("iso8601"), value: result.iso8601, copy: true },
                          { label: tt("rfc2822"), value: result.rfc2822, copy: true },
                          { label: tt("utcString"), value: result.utcString, copy: true },
                          { label: tt("localized"), value: result.localized, copy: true },
                          { label: tt("relativeTime"), value: result.relativeTime, copy: false },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm">
                            <span className="font-medium min-w-32 shrink-0 text-muted-foreground">{item.label}</span>
                            <span className="font-mono flex-1 break-all">{item.value}</span>
                            {item.copy && (
                              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(item.value, item.label)} className="h-6 shrink-0" aria-label={`${tt("copy")} ${item.label}`}>
                                <Copy className="size-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground bg-muted/30 rounded-md">
                        {mode === "timestamp-to-date"
                          ? `${tt("enterTimestamp")} ${tt("autoDetected")}`
                          : tt("enterDate")}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timezone">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">{tt("sourceTimezone")}</label>
                      <Select value={sourceTz} onValueChange={(v) => { if (v) setSourceTz(v); }}>
                        <SelectTrigger className="w-full">
                          <SelectValue>{formatTimezoneLabel(sourceTz)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz} value={tz}>
                              {formatTimezoneLabel(tz)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">{tt("targetTimezone")}</label>
                      <Select value={targetTz} onValueChange={(v) => { if (v) setTargetTz(v); }}>
                        <SelectTrigger className="w-full">
                          <SelectValue>{formatTimezoneLabel(targetTz)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz} value={tz}>
                              {formatTimezoneLabel(tz)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{tt("input")}</label>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={mode === "timestamp-to-date" ? tt("enterTimestamp") : tt("enterDate")}
                      className="field-sizing-content min-h-28 max-h-[50vh] resize-y font-mono text-base"
                    />
                  </div>

                  {tzResult && (
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">{tt("output")}</label>
                      <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                        <Globe className="size-4 text-primary shrink-0" />
                        <span className="font-mono flex-1">{tzResult}</span>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(tzResult, tt("targetTimezone"))} className="h-6 shrink-0" aria-label={`${tt("copy")} ${tt("targetTimezone")}`}>
                          <Copy className="size-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="batch">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">{tt("input")}</label>
                    <Textarea
                      value={batchInput}
                      onChange={(e) => setBatchInput(e.target.value)}
                      placeholder={tt("batchPlaceholder")}
                      className="field-sizing-content min-h-28 max-h-[50vh] resize-y font-mono text-base"
                    />
                  </div>

                  <Button onClick={handleBatchConvert} className="h-10">
                    <RefreshCw className="size-4 mr-1.5" />
                    {tt("convert")}
                  </Button>

                  {batchResults.length > 0 && (
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">{tt("output")}</label>
                      <div className="space-y-1">
                        {batchResults.map((r, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-muted/50 text-sm font-mono">
                            <span className="text-muted-foreground min-w-28">{r.input}</span>
                            <ArrowRightLeft className="size-3 text-muted-foreground shrink-0" />
                            <span className="flex-1 break-all">{r.output}</span>
                            {r.output !== "Invalid timestamp" && (
                              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(r.output, r.input)} className="h-6 shrink-0" aria-label={`${tt("copy")} ${r.input}`}>
                                <Copy className="size-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="now">
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-1">{tt("unixSeconds")}</p>
                    <p className="text-3xl font-mono font-bold">{nowTs.seconds}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(nowTs.seconds, tt("unixSeconds"))} className="mt-1 h-7" aria-label={`${tt("copy")} ${tt("unixSeconds")}`}>
                      <Copy className="size-3 mr-1" />
                      {tt("copy")}
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">{tt("unixMilliseconds")}</p>
                    <p className="text-3xl font-mono font-bold">{nowTs.milliseconds}</p>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(nowTs.milliseconds, tt("unixMilliseconds"))} className="mt-1 h-7" aria-label={`${tt("copy")} ${tt("unixMilliseconds")}`}>
                      <Copy className="size-3 mr-1" />
                      {tt("copy")}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">{t("featuresHeading")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-3 shrink-0"><Icon className="size-5 text-primary" /></div>
                <div><h3 className="font-semibold mb-1">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{desc}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">{t("howItWorks")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">{step.num}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <Card className="bg-muted/50">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">{t("whyTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("whyP1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("whyP2")}</p>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <Shield className="size-4" />
          {t("privacyBadge")}
        </div>
      </section>
    </div>
  );
}
