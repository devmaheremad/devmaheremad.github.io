// The Arabic homepage (/ar/): the same sections as the English homepage (site.ts), translated line by line.
// Every line is a translation of something already on the English site or in the CV (cv/cv.html in
// Career-Content-Bot): no new claims, numbers, titles or projects. Company, product, project and tool names stay in
// English, and so do the job titles (as in the CV).
import type { Project } from "./site";

export const ar = {
  name: "ماهر المشهراوي",
  // The Arabic title (owner, 2026-11-19): "مهندس برمجيات أول", always next to the English "Senior Frontend Engineer"
  // or followed by "متخصص في الواجهات الأمامية". Never "مهندس واجهات أمامية أول".
  role: "مهندس برمجيات أول",
  title: "ماهر المشهراوي | مهندس برمجيات أول · Senior Frontend Engineer",
  description:
    "ماهر المشهراوي، مهندس برمجيات أول متخصص في الواجهات الأمامية: React وNext.js وTypeScript. خبرة +5 سنوات في منصات SaaS والتجارة الإلكترونية وأنظمة الحجز. متاح للعمل.",
  intro:
    "أبني واجهات React وNext.js سريعة وتراعي إمكانية الوصول، لمنتجات SaaS والتجارة الإلكترونية وأنظمة الحجز. خبرة تزيد على 5 سنوات، وأعمل عن بُعد.",
  availability: "متاح الآن · عن بُعد أو هجين أو من المكتب · منفتح على الانتقال",
  manifesto:
    "رفعت أداء تطبيق على Lighthouse من نحو 55% إلى أكثر من 95%. وبنيت تجربة حجز تذاكر لكأس العالم FIFA قطر 2022 دعمت إيرادات تقارب 20,000 دولار لكل مباراة. ودافعت عن اعتماد Next.js أساسًا لمنصة SaaS متعددة المتاجر. يهمّني القرار الذي يقف خلف كل بكسل.",
  stats: [
    { value: 5, prefix: "", suffix: "+", label: "سنوات في بناء واجهات تعمل في بيئة الإنتاج" },
    { value: 95, prefix: "", suffix: "%+", label: "على Lighthouse، بعد أن كان نحو 55%" },
    { value: 20, prefix: "$", suffix: "k", label: "إيرادات تقريبية لكل مباراة في كأس العالم" },
    { value: 20, prefix: "", suffix: "+", label: "شاشة من Figma وXD إلى الإنتاج" },
    { value: 10, prefix: "", suffix: "+", label: "مواقع حجز وأعمال" },
  ],
  experience: [
    {
      company: "Konin Cloud",
      slug: "konin-cloud",
      role: "Senior Frontend Developer",
      period: "مايو 2023 — سبتمبر 2025",
      place: "عن بُعد",
      points: [
        "دافعت عن اعتماد Next.js بدلًا من نهج HTML وSass وBlade، وأعددت المقارنة التقنية التي بُني عليها القرار.",
        "بنيت مكوّنات واجهة متجاوبة وقابلة لإعادة الاستخدام من تصاميم Figma، وربطت واجهات REST مع حالات تحميل وأخطاء منظّمة.",
        "اختبرت المسارات الحرجة بـ React Testing Library واختبارات التكامل والاختبارات الشاملة (E2E) والاختبار اليدوي.",
        "راجعت سلوك الـ API والسجلات، وحسّنت جلب البيانات لتقليل الحمولة غير الضرورية.",
      ],
    },
    {
      company: "The Sailors",
      slug: "the-sailors",
      role: "Senior Frontend Developer",
      period: "يناير 2022 — ديسمبر 2023",
      place: "السعودية · عن بُعد",
      points: [
        "بنيت وأطلقت تجربة حجز تذاكر لكأس العالم FIFA قطر 2022 (إيرادات تقارب 20,000 دولار لكل مباراة).",
        "رفعت أداء تطبيق من نحو 55% إلى أكثر من 95% عبر تحسين العرض وتقسيم الكود والتخزين المؤقت وتحسين الملفات والوسائط.",
        "سلّمت متاجر إلكترونية بنتيجة 95%+ في كل فئات Lighthouse.",
        "شاركت في تصميم المنتج وتجربة المستخدم لتجربة تفاعلية لاختيار المقاعد في أماكن الفعاليات.",
      ],
    },
    {
      company: "Mars Innovation Technology",
      slug: "mars-innovation-technology",
      role: "Frontend Developer",
      period: "يناير 2021 — ديسمبر 2021",
      place: "الإمارات · عن بُعد",
      points: [
        "المسؤول الأول عن الواجهة الأمامية لمنصة الحجز Beljwar من البداية إلى النهاية.",
        "حوّلت أكثر من 20 شاشة من Figma وAdobe XD إلى واجهات جاهزة للإنتاج.",
        "بنيت لوحات تحكم بـ React وMaterial UI، وسلّمت أكثر من 10 مواقع حجز وأعمال.",
      ],
    },
    {
      company: "Gaza Sky Geeks",
      slug: "",
      role: "Internship Trainee",
      period: "يناير 2020 — أغسطس 2020",
      place: "فلسطين · حضوري",
      points: ["تدريب عملي مكثّف في JavaScript وHTML5 وCSS3 وممارسات الواجهات الأمامية الحديثة."],
    },
  ],
  caseStudies: [
    {
      slug: "lighthouse",
      title: "من نحو 55% إلى أكثر من 95% على Lighthouse",
      outcome: "ارتفع أداء تطبيق على Lighthouse من نحو 55% إلى أكثر من 95%.",
      context: "The Sailors، شركة سعودية تبني منتجات للحجز والتجارة الإلكترونية. Senior Frontend Developer، عن بُعد.",
      challenge: "كان التطبيق عند نحو 55% في أداء Lighthouse.",
      did: [
        "وجدت ثلاثة أسباب: صور غير محسّنة، وحزمة JavaScript كبيرة (حزم أيقونات كاملة تُستورد دفعة واحدة)، وخطوط تؤخّر العرض.",
        "أصلحت الاستيراد، وقسّمت المسارات، وضبطت أحجام الصور، وغيّرت طريقة تحميل الخطوط: تحسين العرض وتقسيم الكود واستراتيجيات التخزين المؤقت وتحسين الوسائط والملفات.",
        "على المتاجر صار Lighthouse يعمل قبل الدمج لا بعد الإطلاق، حتى لا تسحب الميزات الجديدة النتائج إلى الأسفل بصمت.",
      ],
      result:
        "من نحو 55% إلى أكثر من 95% في الأداء. وأُطلقت المتاجر بنتيجة 95%+ في الأداء وإمكانية الوصول وSEO وأفضل الممارسات وجاهزية PWA.",
      stack: ["React", "TypeScript", "Material UI", "Lighthouse", "PWA", "SEO"],
    },
    {
      slug: "world-cup",
      title: "إطلاق حجز تذاكر كأس العالم FIFA قطر 2022",
      outcome: "تجربة حجز تتحمّل زيارات عالية، دعمت إيرادات تقارب 20,000 دولار لكل مباراة.",
      context: "احتاجت The Sailors حجز تذاكر كأس العالم في جدول زمني ضيّق جدًا.",
      challenge: "زيارات عالية، ومسار حجز يثق به العملاء، ووقت قليل جدًا.",
      did: [
        "اقترحت بناء التجربة داخل منصة الشركة القائمة بدل موقع منفصل، فتقلّص نطاق التنفيذ.",
        "بنيتها وأطلقتها بـ React وTypeScript وMaterial UI.",
        "كانت الزيارات تقفز كلما فُتحت تذاكر مباراة، فبقي مسار الحجز في حدّه الأدنى، وخُزّنت معلومات المباريات مؤقتًا، وحُمّلت الأجزاء الثقيلة عند الحاجة فقط.",
      ],
      result: "بقي الحجز قابلًا للاستخدام أثناء الذروات، ودعمت التجربة إيرادات تقارب 20,000 دولار لكل مباراة.",
      stack: ["React", "TypeScript", "Material UI"],
    },
    {
      slug: "nextjs-saas",
      title: "اختيار Next.js لمنصة SaaS متعددة المتاجر",
      outcome: "مقارنة تقنية مكتوبة دعمت قرار الفريق بالبناء على Next.js.",
      context:
        "KoninPay من Konin Cloud: منصة SaaS متعددة المتاجر فيها إنشاء التجار والمتاجر ومسارات الدفع ومحفظة رقمية. Senior Frontend Developer، عن بُعد.",
      challenge: "كانت الخطة الأولى HTML وSass وBlade، لمنتج يجب أن يتوسّع ويستمر في التطوّر.",
      did: [
        "دافعت عن Next.js مركّزًا على قابلية التوسّع وسهولة الصيانة وكفاءة التطوير وتطوّر المنتج على المدى الطويل.",
        "كتبت مقارنة تقنية بين النهجين: البنية والمزايا والمقايضات وسهولة الصيانة.",
        "وكان جزء من الحجة هو SEO: صفحات المنتجات في المتاجر تحتاج عناوين صحيحة ومعاينات للروابط، ومع Next.js تُعرض على الخادم ومعها بياناتها الوصفية.",
      ],
      result:
        "دعمت المقارنة قرار الفريق التقني. صارت صفحات المنتجات قابلة للمشاركة والفهرسة، واليوم تعمل سبعة متاجر حيّة على المنصة.",
      stack: ["React", "Next.js", "TypeScript", "Material UI", "REST APIs", "React Testing Library"],
    },
  ],
};

// Project kinds and summaries in Arabic, keyed by the project slug in site.ts (titles, stacks, images and links stay).
export const projectsAr: Record<string, Pick<Project, "kind" | "summary">> = {
  "coffee-talk": { kind: "لوحة تحكم لنشاط تجاري", summary: "تجربة لوحة تحكم لنشاط في قطاع الضيافة." },
  dhahran: {
    kind: "موقع تعليمي",
    summary: "موقع للطلاب والخريجين يعرضون فيه خدماتهم وخبراتهم، ويقدّمون فيه الدورات والدروس.",
  },
  ajad: { kind: "صفحة هبوط لشركة", summary: "صفحة هبوط عصرية تعرض رؤية الشركة وأهدافها وخدماتها وبيانات التواصل." },
  mars: { kind: "موقع شركة", summary: "موقع الشركة، يعرض خدماتها بتصميم إبداعي عصري." },
  hilarity: { kind: "منصة لمشاركة الفيديو", summary: "منصة لمشاركة الفيديوهات واللحظات والمذكّرات اليومية." },
  tuby: {
    kind: "متصفح فيديو قائم على البيانات",
    summary: "تقسيم الكود على مستوى المسارات بـ React.lazy وSuspense، وZustand للحالة العامة، وبيانات من RapidAPI.",
  },
  laqta: { kind: "موقع شركة", summary: "موقع شركة متعدد الأقسام بعدة سمات يمكن للزائر التبديل بينها." },
  gosto: { kind: "متجر إلكتروني", summary: "متجر إلكتروني لبيع قوالب المواقع والتصاميم الجرافيكية." },
};

export const workGroupTitlesAr: Record<string, string> = {
  "Business websites": "مواقع أعمال",
  "Side projects": "مشاريع جانبية",
};
