type Bilingual = { zh: string; en: string };
type HowTo = { id: string; name: Bilingual; steps: Bilingual[] };
type FaqItem = { q: Bilingual; a: Bilingual };

export const WHO_FOR: Bilingual[] = [
  { zh: "Web 开发者", en: "Web Developers" },
  { zh: "后端工程师", en: "Backend Engineers" },
  { zh: "安全分析师", en: "Security Analysts" },
  { zh: "学生和教师", en: "Students & Educators" },
];

export const WHEN_USE: Bilingual[] = [
  { zh: "API 调试：将 API 返回的 Unix 时间戳转换为可读日期", en: "API debugging: convert Unix timestamps from API responses to readable dates" },
  { zh: "日志分析：将服务器日志中的时间戳转换为本地时间", en: "Log analysis: convert server log timestamps to local time" },
  { zh: "数据库查询：在数据库记录和人类可读日期之间转换", en: "Database queries: convert between database records and human-readable dates" },
  { zh: "时区转换：查看同一时刻在不同时区的时间", en: "Timezone conversion: see the same moment in different timezones" },
  { zh: "批量处理：一次转换多个时间戳用于数据分析", en: "Batch processing: convert multiple timestamps at once for data analysis" },
];

export const HOWTOS: HowTo[] = [
  {
    id: "convert-timestamp",
    name: { zh: "如何将 Unix 时间戳转换为日期", en: "How to convert a Unix timestamp to a date" },
    steps: [
      { zh: "打开 Time Shuttle 网站（time.shuttlelab.org）", en: "Open the Time Shuttle website (time.shuttlelab.org)" },
      { zh: "在输入框中粘贴或输入 Unix 时间戳", en: "Paste or type the Unix timestamp in the input field" },
      { zh: "工具自动识别秒或毫秒并显示所有格式", en: "The tool auto-detects seconds vs milliseconds and shows all formats" },
      { zh: "复制您需要的格式（ISO 8601、UTC、本地化等）", en: "Copy the format you need (ISO 8601, UTC, localized, etc.)" },
    ],
  },
  {
    id: "convert-timezone",
    name: { zh: "如何在不同时区之间转换时间", en: "How to convert time between timezones" },
    steps: [
      { zh: "打开 Time Shuttle 网站", en: "Open the Time Shuttle website" },
      { zh: "输入日期或时间戳", en: "Enter a date or timestamp" },
      { zh: "选择源时区和目标时区", en: "Select the source and target timezones" },
      { zh: "查看转换后的结果", en: "View the converted result" },
    ],
  },
  {
    id: "batch-convert",
    name: { zh: "如何批量转换时间戳", en: "How to batch convert timestamps" },
    steps: [
      { zh: "打开 Time Shuttle 网站", en: "Open the Time Shuttle website" },
      { zh: "切换到批量转换标签", en: "Switch to the Batch Convert tab" },
      { zh: "在文本框中粘贴多个时间戳（每行一个）", en: "Paste multiple timestamps in the text area (one per line)" },
      { zh: "查看每个时间戳对应的日期", en: "View the date for each timestamp" },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: { zh: "什么是 Unix 时间戳？", en: "What is a Unix timestamp?" },
    a: { zh: "Unix 时间戳是从 1970-01-01 00:00:00 UTC 起经过的秒数（不计闰秒）。它是计算机系统中表示时间的标准方式，广泛用于数据库、API 和日志文件。", en: "A Unix timestamp is the number of seconds since 1970-01-01 00:00:00 UTC, not counting leap seconds. It is the standard way computers represent time, widely used in databases, APIs, and log files." },
  },
  {
    q: { zh: "10 位和 13 位时间戳有什么区别？", en: "What's the difference between 10-digit and 13-digit timestamps?" },
    a: { zh: "10 位数字是以秒为单位的 Unix 时间戳，13 位数字是以毫秒为单位的时间戳。例如，1700000000（秒）和 1700000000000（毫秒）表示同一时刻。Time Shuttle 会自动识别这两种格式。", en: "A 10-digit number is a Unix timestamp in seconds; a 13-digit number is in milliseconds. For example, 1700000000 (seconds) and 1700000000000 (milliseconds) represent the same moment. Time Shuttle auto-detects both formats." },
  },
  {
    q: { zh: "Time Shuttle 是免费的吗？", en: "Is Time Shuttle free?" },
    a: { zh: "是的，Time Shuttle 完全免费，没有任何隐藏费用。所有工具都可以无限制使用，无需注册账户。", en: "Yes, Time Shuttle is completely free with no hidden costs. All tools can be used without limits and without creating an account." },
  },
  {
    q: { zh: "我的数据会被上传到服务器吗？", en: "Is my data uploaded to a server?" },
    a: { zh: "不会。Time Shuttle 的所有时间转换都在您的浏览器中本地完成，使用原生 JavaScript Date 和 Intl API。您的数据永远不会离开您的设备。", en: "No. All conversions in Time Shuttle happen locally in your browser using native JavaScript Date and Intl APIs. Your data never leaves your device." },
  },
  {
    q: { zh: "Time Shuttle 支持哪些时区？", en: "What timezones does Time Shuttle support?" },
    a: { zh: "Time Shuttle 使用浏览器原生的 Intl.supportedValuesOf('timeZone') API，支持所有 IANA 时区数据库中的时区。这包括全球数百个时区，自动处理夏令时。", en: "Time Shuttle uses the browser-native Intl.supportedValuesOf('timeZone') API, supporting all timezones in the IANA timezone database. This includes hundreds of timezones worldwide with automatic daylight saving time handling." },
  },
  {
    q: { zh: "1700000000 对应什么日期？", en: "What date is 1700000000?" },
    a: { zh: "Unix 时间戳 1700000000（秒）对应 2023-11-14T22:13:20Z（UTC）。您可以在 Time Shuttle 中输入这个时间戳查看所有格式和本地化显示。", en: "Unix timestamp 1700000000 (seconds) corresponds to 2023-11-14T22:13:20Z (UTC). You can enter this timestamp in Time Shuttle to see all formats and localized display." },
  },
  {
    q: { zh: "如何将日期转换为 Unix 时间戳？", en: "How do I convert a date to a Unix timestamp?" },
    a: { zh: "在 Time Shuttle 中，切换到「日期 → 时间戳」模式，输入日期（如 2023-11-14T22:13:20Z），工具会自动显示对应的 Unix 时间戳（秒和毫秒）。", en: "In Time Shuttle, switch to 'Date → Timestamp' mode, enter a date (like 2023-11-14T22:13:20Z), and the tool automatically shows the corresponding Unix timestamp in both seconds and milliseconds." },
  },
  {
    q: { zh: "什么是闰秒？Time Shuttle 考虑了闰秒吗？", en: "What are leap seconds? Does Time Shuttle account for them?" },
    a: { zh: "闰秒是为了让 UTC 与地球自转同步而偶尔添加的额外秒数。Unix 时间戳的定义不计闰秒，因此 1700000000 始终对应相同的 UTC 时刻，不受闰秒影响。Time Shuttle 遵循此标准。", en: "Leap seconds are occasional extra seconds added to keep UTC synchronized with Earth's rotation. Unix timestamps by definition do not count leap seconds, so 1700000000 always corresponds to the same UTC moment regardless of leap seconds. Time Shuttle follows this standard." },
  },
];

export const COMPARISON = {
  zh: {
    heading: "Time Shuttle 与同类工具对比",
    asOf: "数据截至 2026 年 6 月",
    columns: ["功能", "Time Shuttle", "epochconverter.com", "unixtimestamp.com"],
    rows: [
      ["100% 本地处理", "✓", "✗", "✗"],
      ["自动识别秒/毫秒", "✓", "✓", "✗"],
      ["时区转换", "✓", "✓", "✓"],
      ["相对时间显示", "✓", "✗", "✗"],
      ["批量转换", "✓", "✗", "✗"],
      ["多格式输出", "✓", "✓", "✓"],
      ["无广告", "✓", "✗", "✓"],
      ["界面简洁", "✓", "一般", "一般"],
    ],
  },
  en: {
    heading: "Time Shuttle vs Similar Tools",
    asOf: "As of June 2026",
    columns: ["Feature", "Time Shuttle", "epochconverter.com", "unixtimestamp.com"],
    rows: [
      ["100% Local Processing", "✓", "✗", "✗"],
      ["Auto-detect s/ms", "✓", "✓", "✗"],
      ["Timezone Conversion", "✓", "✓", "✓"],
      ["Relative Time Display", "✓", "✗", "✗"],
      ["Batch Conversion", "✓", "✗", "✗"],
      ["Multi-format Output", "✓", "✓", "✓"],
      ["Ad-free", "✓", "✗", "✓"],
      ["Clean Interface", "✓", "OK", "OK"],
    ],
  },
};

export const HEADINGS = {
  whoFor: { zh: "谁在使用 Time Shuttle？", en: "Who is Time Shuttle for?" },
  whenUse: { zh: "何时使用 Time Shuttle？", en: "When should I use Time Shuttle?" },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
