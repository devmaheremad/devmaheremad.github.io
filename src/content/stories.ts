// Company chapters, stories, decisions and strengths.
// Sources, nothing else: the CV (Career-Content-Bot cv/cv.html), the confirmed story bank F14-F29
// (Career-Content-Bot kit/interview-stories.md, confirmed by the owner 2026-11-05) and the owner's own published posts.
// No numbers beyond the CV. Results stay in words. Never "I decided" for team decisions: "advocated", "supported".

export type Theme = "performance" | "architecture" | "quality" | "ux" | "ownership" | "collaboration";
export type CompanySlug = "konin-cloud" | "the-sailors" | "mars-innovation-technology";

export const THEMES: Record<Theme, { label: string; short: string }> = {
  performance: { label: "Performance engineering", short: "Performance" },
  architecture: { label: "Architecture & technical decisions", short: "Architecture" },
  quality: { label: "Quality on critical flows", short: "Quality" },
  ux: { label: "UX & product thinking", short: "UX & product" },
  ownership: { label: "End-to-end ownership", short: "Ownership" },
  collaboration: { label: "Working across teams", short: "Collaboration" },
};

export type Story = {
  id: string;
  company: CompanySlug;
  title: string;
  problem: string;
  action: string;
  result: string;
  lesson: string;
  themes: Theme[];
  /** A judgment call worth showing on the decisions page. */
  decision?: { call: string; instead: string; why: string };
  /** Made under a deadline, a traffic spike or release pressure. */
  pressure?: string;
  caseStudy?: string;
};

export type Company = {
  slug: CompanySlug;
  index: string;
  name: string;
  short: string;
  role: string;
  period: string;
  place: string;
  product: string;
  headline: string;
  intro: string;
  stack: string[];
  facts: string[];
  numbers: { value: string; label: string }[];
  lesson: string;
};

export const companies: Company[] = [
  {
    slug: "konin-cloud",
    index: "01",
    name: "Konin Cloud",
    short: "Konin",
    role: "Senior Frontend Developer",
    period: "May 2023 — Sep 2025",
    place: "Full-time · Remote",
    product: "KoninPay, a multi-store SaaS platform",
    headline: "Payments, a wallet, and a stack that had to last.",
    intro:
      "KoninPay lets merchants create stores, run platform operations, take payments and use a dedicated digital wallet. When money moves through the UI, a broken flow costs far more than a broken button, so a lot of my work happened underneath the screens: the stack, the data and the tests.",
    stack: ["React", "Next.js", "TypeScript", "Material UI", "Sass", "REST APIs", "React Testing Library"],
    facts: [
      "Advocated Next.js over the initially proposed HTML, Sass and Blade approach, and prepared the technical comparison behind the decision.",
      "Built reusable, responsive UI components from Figma and integrated REST APIs with structured loading and error states.",
      "Tested critical flows with React Testing Library, integration, end-to-end and manual testing.",
      "Reviewed API request/response behavior, response performance and logs, and optimized data fetching to cut unnecessary payloads.",
      "Improved performance through Lighthouse analysis, code splitting, lazy loading and asset optimization.",
    ],
    numbers: [
      { value: "Next.js", label: "the foundation I advocated, with a written comparison" },
      { value: "7", label: "live storefronts running on the platform" },
      { value: "E2E", label: "plus RTL, integration and manual testing on critical flows" },
    ],
    lesson: "Test the paths that move money first, and bring evidence, not opinions.",
  },
  {
    slug: "the-sailors",
    index: "02",
    name: "The Sailors",
    short: "Sailors",
    role: "Senior Frontend Developer",
    period: "Jan 2022 — Dec 2023",
    place: "Saudi Arabia · Remote",
    product: "Booking and e-commerce products, including the FIFA World Cup Qatar 2022 ticket booking",
    headline: "A World Cup deadline, traffic spikes and a 55% app.",
    intro:
      "The Sailors builds booking and e-commerce products. There I built a FIFA World Cup Qatar 2022 ticket-booking experience on a fixed deadline, and took an application from about 55% to 95%+ on Lighthouse.",
    stack: ["React", "TypeScript", "Material UI", "Redux", "Lighthouse", "PWA", "SEO"],
    facts: [
      "Built and launched a high-traffic FIFA World Cup Qatar 2022 ticket-booking experience, supporting about $20,000 in revenue per match event.",
      "Proposed building it inside the existing platform instead of a separate website, reducing scope under a highly constrained timeline.",
      "Took an application from about 55% to 95%+ through rendering optimization, code splitting, caching and asset optimization.",
      "Delivered e-commerce storefronts at 95%+ across performance, accessibility, SEO, best practices and PWA readiness.",
      "Contributed to the product and UX design of an interactive venue seat-selection experience.",
    ],
    numbers: [
      { value: "$20K", label: "approx. revenue per World Cup match event" },
      { value: "55→95%+", label: "Lighthouse performance" },
      { value: "95%+", label: "on every Lighthouse category for the storefronts" },
    ],
    lesson: "When the deadline is fixed, reuse is an engineering decision, not a shortcut.",
  },
  {
    slug: "mars-innovation-technology",
    index: "03",
    name: "Mars Innovation Technology",
    short: "Mars",
    role: "Frontend Developer",
    period: "Jan 2021 — Dec 2021",
    place: "UAE · Remote",
    product: "Beljwar, a booking platform for venues, restaurants, rooms and halls",
    headline: "Owning a booking platform from first screen to production.",
    intro:
      "At Mars Innovation Technology I held primary end-to-end frontend responsibility for Beljwar, a multi-category booking platform, taking it from implementation through production delivery. The biggest wins weren't visual: they were the steps I took out of the way between finding a place and reserving it.",
    stack: ["JavaScript", "React", "Material UI", "jQuery", "Metronic", "AOS"],
    facts: [
      "Held primary end-to-end frontend responsibility for the Beljwar platform, from implementation through production delivery.",
      "Translated 20+ Figma and Adobe XD screens into responsive, production-ready interfaces, with implementation and UX improvements where appropriate.",
      "Restructured booking flows to reduce unnecessary steps and create a more direct path from discovery to reservation.",
      "Built interactive React and Material UI dashboards for data management and reporting.",
      "Delivered 10+ booking and business websites.",
    ],
    numbers: [
      { value: "20+", label: "Figma & Adobe XD screens to production" },
      { value: "10+", label: "booking & business websites delivered" },
      { value: "Beljwar", label: "booking platform owned end to end" },
    ],
    lesson: "Every extra screen in a booking flow is another chance to lose the user.",
  },
];

export const stories: Story[] = [
  // ---------------- Konin Cloud ----------------
  {
    id: "nextjs-decision",
    company: "konin-cloud",
    title: "Arguing for Next.js, in writing",
    problem:
      "The initial plan for KoninPay was HTML, Sass and Blade, for a product with merchant and store creation, payments and a wallet that had to keep growing.",
    action:
      "I advocated Next.js, focusing on scalability, maintainability, development efficiency and long-term product evolution, and wrote a technical comparison of both approaches: architecture, advantages, trade-offs and maintainability. Part of the case was SEO: storefront product pages needed proper titles and link previews, and with Next.js they render on the server with their own metadata.",
    result:
      "The comparison supported the team's technology decision. Product pages became shareable and indexable, and seven live storefronts run on the platform today.",
    lesson: "A written comparison persuades better than an opinion, especially for people outside frontend.",
    themes: ["architecture", "collaboration"],
    decision: {
      call: "Build the platform on Next.js",
      instead: "HTML, Sass and Blade",
      why: "Scalability, maintainability, development speed, and product pages that render with their own metadata for SEO and link previews.",
    },
    caseStudy: "nextjs-saas",
  },
  {
    id: "money-paths",
    company: "konin-cloud",
    title: "Test the paths that move money first",
    problem:
      "In a product with payment workflows and a digital wallet, release bugs hide in the flows nobody clicks through before shipping, and a broken checkout costs far more than a broken button.",
    action:
      "I tested critical flows with React Testing Library, integration testing, end-to-end testing and manual validation before releases, across user flows, UI behavior and API interactions.",
    result: "Releases were checked where a mistake would cost the most.",
    lesson: "On money flows, test the flows, not just the components.",
    themes: ["quality"],
    decision: {
      call: "Put the money paths at the top of the test plan",
      instead: "Spreading testing evenly across every screen",
      why: "Payments and the wallet are where a bug costs merchants and customers real money.",
    },
  },
  {
    id: "double-payment",
    company: "konin-cloud",
    title: "One click, one payment",
    problem: "A fast double click could send the same payment request twice.",
    action:
      "I disabled the button while the request ran and agreed a duplicate-request check with the backend team, so the protection didn't depend on the UI alone.",
    result: "There were no duplicate requests in testing.",
    lesson: "Guard money on both sides of the API.",
    themes: ["quality", "collaboration"],
    pressure: "A payment flow, where a duplicate request could mean a duplicate payment.",
  },
  {
    id: "wallet-balance",
    company: "konin-cloud",
    title: "The wallet balance that lagged behind",
    problem: "After a payment, the wallet balance on screen could stay old until a refresh.",
    action: "I refetched the balance when the payment finished and showed a pending state in between.",
    result: "The balance on screen matched the real one.",
    lesson: "A number on screen is a promise. Show pending rather than show wrong.",
    themes: ["quality", "ux"],
  },
  {
    id: "safari-fallback",
    company: "konin-cloud",
    title: "The bug that only Safari saw",
    problem: "A layout broke only in Safari, with a release coming.",
    action: "Cross-browser checks before the release caught it, and I fixed it with a fallback before shipping.",
    result: "Users never saw it.",
    lesson: "Test the browser nobody on the team uses.",
    themes: ["quality"],
    pressure: "Caught right before a release, fixed before it shipped.",
  },
  {
    id: "lighter-lists",
    company: "konin-cloud",
    title: "Fetch what you render",
    problem: "A product grid that showed a name, a price and a thumbnail was loading full product objects.",
    action:
      "I compared what the screens fetched with what they rendered and worked with the backend team on a lighter list response, as part of optimizing data-fetching patterns across the platform.",
    result: "Lighter pages and faster scrolling.",
    lesson: "Compare what you fetch with what you render.",
    themes: ["performance", "collaboration"],
  },
  {
    id: "shared-states",
    company: "konin-cloud",
    title: "One way to load, fail and retry",
    problem: "Every screen handled loading and errors its own way.",
    action: "I built shared skeleton, empty-state and error-with-retry components and used them everywhere.",
    result: "Consistent screens, and new screens became faster to build.",
    lesson: "Design the unhappy states once, then reuse them.",
    themes: ["architecture", "ux"],
  },
  {
    id: "store-setup",
    company: "konin-cloud",
    title: "Store setup in steps, not one long form",
    problem: "Merchants had to fill one long form to create a store.",
    action: "I split it into steps with validation per step, so errors showed where they happened.",
    result: "Store setup became easier to finish and easier to support.",
    lesson: "Put the error next to the field that caused it.",
    themes: ["ux"],
  },
  {
    id: "evidence-not-opinions",
    company: "konin-cloud",
    title: "Wrong data on screen: frontend or API?",
    problem: "Wrong data on screen raises one question first: is it the frontend or the API?",
    action:
      "Supporting production reliability meant reviewing API requests, responses, response performance and application and server logs before raising anything.",
    result: "Issues reached the backend team with evidence attached, not \"it's broken\".",
    lesson: "Check the payload first, then bring evidence.",
    themes: ["collaboration", "quality"],
  },

  // ---------------- The Sailors ----------------
  {
    id: "world-cup-inside",
    company: "the-sailors",
    title: "Building the World Cup booking inside the platform",
    problem:
      "The Sailors needed a FIFA World Cup Qatar 2022 ticket-booking experience for high traffic, under a highly constrained timeline.",
    action:
      "I proposed integrating it into the company's existing platform rather than launching a separate website, then built and launched it with React, TypeScript and Material UI.",
    result:
      "Less to build and test under a very tight timeline, and the experience supported about $20,000 in revenue per match event.",
    lesson: "When the deadline is fixed, reuse is an engineering decision.",
    themes: ["architecture", "ownership"],
    decision: {
      call: "Integrate World Cup booking into the existing platform",
      instead: "Launching a separate website",
      why: "It reduced the implementation scope, so there was less to build and test before a deadline that could not move.",
    },
    pressure: "A fixed, very tight World Cup timeline.",
    caseStudy: "world-cup",
  },
  {
    id: "traffic-peaks",
    company: "the-sailors",
    title: "When match tickets opened, traffic spiked",
    problem: "Booking traffic spiked every time World Cup match tickets opened.",
    action: "I kept the booking path minimal, cached match information and lazy-loaded the heavy parts.",
    result: "Booking stayed usable during the peaks.",
    lesson: "Design for the busiest minute, not the average day.",
    themes: ["performance"],
    pressure: "Traffic peaks at every ticket release.",
    caseStudy: "world-cup",
  },
  {
    id: "lighthouse-55-95",
    company: "the-sailors",
    title: "From about 55% to 95%+ on Lighthouse",
    problem: "An application was stuck at about 55% on Lighthouse performance.",
    action:
      "Starting from the Lighthouse results I found three causes: unoptimized images, a large JavaScript bundle (whole icon packages imported at once) and render-blocking fonts. I fixed the imports, split the routes, sized the images and changed font loading: rendering optimization, code splitting, caching and media and asset optimization.",
    result: "About 55% to 95%+ on performance.",
    lesson: "Measure before you optimize. Images are often the cheapest win.",
    themes: ["performance"],
    caseStudy: "lighthouse",
  },
  {
    id: "lighthouse-before-merge",
    company: "the-sailors",
    title: "A fast storefront slows down one feature at a time",
    problem: "New features slowly pulled the storefronts' Lighthouse scores down.",
    action: "I started checking Lighthouse before merging, not after launch.",
    result: "The storefronts stayed at 95%+ across performance, accessibility, SEO, best practices and PWA readiness.",
    lesson: "Performance is a merge requirement, not a launch task.",
    themes: ["performance", "quality"],
    decision: {
      call: "Check Lighthouse before every merge",
      instead: "Auditing after launch",
      why: "Scores drift as features land. Catching a regression in review is cheaper than finding it in production.",
    },
    caseStudy: "lighthouse",
  },
  {
    id: "seat-selection",
    company: "the-sailors",
    title: "Picking a specific seat, online",
    problem: "Customers wanted to choose a specific seat in a cafe, a hall or another venue.",
    action:
      "I contributed to the product and UX design of an interactive seat-selection experience, working with product, design, management and backend, and balancing delivery speed, UX requirements, technical complexity and commercial objectives.",
    result: "Customers could select specific seats within venues.",
    lesson: "Drawing seats is easy. Making availability and the chosen seat obvious is the work.",
    themes: ["ux", "collaboration"],
  },
  {
    id: "seat-map-renders",
    company: "the-sailors",
    title: "One seat changed, the whole map re-rendered",
    problem: "Selecting one seat re-rendered the whole seat map, which was slow on low-end phones.",
    action: "I made each seat its own memoized component, so only the seats that changed re-rendered.",
    result: "Selection became smooth on phones.",
    lesson: "Profile on the phone your customers actually use.",
    themes: ["performance"],
  },
  {
    id: "server-vs-ui-state",
    company: "the-sailors",
    title: "Server data is not UI state",
    problem: "API data copied into the Redux store went stale and caused bugs.",
    action: "I separated server data from UI state.",
    result: "Fewer stale-data bugs.",
    lesson: "Keep one source of truth for data that lives on the server.",
    themes: ["architecture"],
  },

  // ---------------- Mars Innovation Technology ----------------
  {
    id: "beljwar-ownership",
    company: "mars-innovation-technology",
    title: "Owning Beljwar end to end",
    problem:
      "Beljwar covered bookings for venues, restaurants, rooms and halls, and its frontend needed one owner from implementation to production.",
    action:
      "I held primary end-to-end frontend responsibility, taking the frontend from implementation through production delivery and resolving the technical and user-experience challenges along the way.",
    result: "A booking platform delivered to production, and alongside it 10+ booking and business websites.",
    lesson: "Ownership means the edge cases are yours too.",
    themes: ["ownership"],
  },
  {
    id: "fewer-booking-steps",
    company: "mars-innovation-technology",
    title: "The biggest UX win wasn't visual",
    problem: "Date, time, space and confirmation were separate screens between finding a place and reserving it.",
    action: "I merged date and time into the space page and restructured the booking flow to remove unnecessary steps.",
    result: "A more direct path from discovery to reservation.",
    lesson: "Every extra screen in a booking flow is another chance to lose the user.",
    themes: ["ux"],
    decision: {
      call: "Cut steps out of the booking flow",
      instead: "Keeping one screen per field",
      why: "Each extra screen between discovery and reservation is a place to drop off.",
    },
  },
  {
    id: "designs-as-start",
    company: "mars-innovation-technology",
    title: "Designs are the start of the conversation",
    problem: "20+ Figma and Adobe XD screens had to become production UI.",
    action:
      "I treated the designs as the starting point, not a pixel-by-pixel spec, and introduced implementation and UX improvements where they made sense.",
    result: "Responsive, production-ready interfaces built from the designs, improved where it mattered.",
    lesson: "Good handoff is a conversation.",
    themes: ["ux", "collaboration"],
    decision: {
      call: "Treat designs as a starting point",
      instead: "Copying every pixel as a fixed spec",
      why: "Implementation reveals UX problems a static screen can't show.",
    },
  },
  {
    id: "missing-states",
    company: "mars-innovation-technology",
    title: "The states the designs forgot",
    problem: "Designs often had no empty, error or long-text states.",
    action: "I listed the missing states and agreed them with the designer before coding.",
    result: "Less rework.",
    lesson: "Agree on edge cases before the first line of code.",
    themes: ["collaboration", "ux"],
  },
  {
    id: "dashboard-pagination",
    company: "mars-innovation-technology",
    title: "Dashboards that keep up as data grows",
    problem: "Large dashboard tables loaded everything at once.",
    action: "I moved them to server-side pagination and filters, in the React and Material UI dashboards I built for data management and reporting.",
    result: "The tables stayed usable as the data grew.",
    lesson: "Build for next year's data, not today's.",
    themes: ["performance", "architecture"],
  },
  {
    id: "rtl-ltr",
    company: "mars-innovation-technology",
    title: "One stylesheet, two directions",
    problem: "The platforms needed right-to-left Arabic and left-to-right English.",
    action: "I used direction-aware layout, so one stylesheet served both.",
    result: "No separate RTL copy of the UI to maintain.",
    lesson: "Solve it in the system, not in a copy.",
    themes: ["architecture"],
  },
];

// Long-form case studies. The short versions live on the home page (site.ts caseStudies).
export type CaseStudyLong = {
  slug: string;
  company: CompanySlug;
  title: string;
  kicker: string;
  outcome: string;
  context: string;
  constraint: string;
  options?: { option: string; note: string }[];
  steps: { title: string; body: string }[];
  result: string;
  learned: string;
  stack: string[];
  stories: string[];
};

export const caseStudiesLong: CaseStudyLong[] = [
  {
    slug: "lighthouse",
    company: "the-sailors",
    title: "From about 55% to 95%+ on Lighthouse",
    kicker: "Performance",
    outcome: "An application's Lighthouse performance went from about 55% to 95%+, and the storefronts stayed at 95%+ on every category.",
    context: "The Sailors builds booking and e-commerce products. I was a Senior Frontend Developer there, working remotely from Palestine for a Saudi team.",
    constraint: "The application scored about 55% on Lighthouse performance, and new features kept landing while I worked on it.",
    steps: [
      {
        title: "Measure first",
        body: "I started from the Lighthouse results instead of guessing, and traced the score to three causes: unoptimized images, a large JavaScript bundle (whole icon packages imported at once) and render-blocking fonts.",
      },
      {
        title: "Fix the causes",
        body: "I fixed the imports, split the routes, sized the images and changed how fonts loaded: rendering optimization, code splitting, caching strategies and media and asset optimization.",
      },
      {
        title: "Stop the drift",
        body: "Scores drift as features land. On the storefronts I checked Lighthouse before merging, not after launch, so new features couldn't quietly pull them down.",
      },
    ],
    result: "Performance went from about 55% to 95%+. The e-commerce storefronts shipped at 95%+ across performance, accessibility, SEO, best practices and PWA readiness, and stayed there.",
    learned: "Measure before you optimize, and make performance a merge requirement instead of a launch task.",
    stack: ["React", "TypeScript", "Material UI", "Lighthouse", "PWA", "SEO"],
    stories: ["lighthouse-55-95", "lighthouse-before-merge", "seat-map-renders"],
  },
  {
    slug: "world-cup",
    company: "the-sailors",
    title: "A FIFA World Cup Qatar 2022 ticket-booking launch",
    kicker: "Delivery under pressure",
    outcome: "A high-traffic booking experience, shipped on a fixed deadline, that supported about $20,000 in revenue per match event.",
    context: "The Sailors needed World Cup ticket booking for its customers. The tournament dates were fixed, and the timeline was highly constrained.",
    constraint: "High traffic, a booking flow customers could trust with their money, and very little time.",
    options: [
      { option: "A separate World Cup website", note: "A clean start, but everything to build, test and launch from zero." },
      { option: "Inside the existing platform", note: "Reuse what the platform already had, and build only what was new." },
    ],
    steps: [
      {
        title: "Shrink the scope",
        body: "I proposed integrating the experience into the company's existing platform instead of launching a separate website. It reduced the implementation scope, which was the only way to meet the timeline.",
      },
      {
        title: "Build and launch",
        body: "I built and launched it with React, TypeScript and Material UI, working with product, design, management and backend.",
      },
      {
        title: "Survive the peaks",
        body: "Traffic spiked whenever match tickets opened. I kept the booking path minimal, cached match information and lazy-loaded the heavy parts.",
      },
    ],
    result: "Booking stayed usable during the peaks, and the experience supported about $20,000 in revenue per match event.",
    learned: "Under a fixed deadline, reuse is an engineering decision, not a shortcut.",
    stack: ["React", "TypeScript", "Material UI"],
    stories: ["world-cup-inside", "traffic-peaks"],
  },
  {
    slug: "nextjs-saas",
    company: "konin-cloud",
    title: "Choosing Next.js for a multi-store SaaS platform",
    kicker: "Architecture decision",
    outcome: "A written technical comparison that supported the team's decision to build KoninPay on Next.js.",
    context:
      "Konin Cloud's KoninPay is a multi-store SaaS platform: merchant and store creation, platform operations, payment workflows and a dedicated digital wallet. I was a Senior Frontend Developer, remote.",
    constraint: "The initial plan was HTML, Sass and Blade, for a product that had to scale and keep evolving.",
    options: [
      { option: "HTML, Sass and Blade", note: "The initially proposed approach." },
      { option: "Next.js", note: "Components, server rendering with per-page metadata, and room for the product to grow." },
    ],
    steps: [
      {
        title: "Advocate, with reasons",
        body: "I advocated Next.js, focusing on scalability, maintainability, development efficiency and long-term product evolution.",
      },
      {
        title: "Write it down",
        body: "I wrote a technical comparison of both approaches: architectural differences, advantages, trade-offs and maintainability, so the team could decide on evidence.",
      },
      {
        title: "Make the SEO case",
        body: "Storefront product pages needed proper titles and link previews. With Next.js they render on the server with their own metadata.",
      },
    ],
    result: "The comparison supported the team's technology decision. Product pages became shareable and indexable, and seven live storefronts run on the platform today.",
    learned: "A written comparison persuades better than an opinion, especially for people outside frontend.",
    stack: ["React", "Next.js", "TypeScript", "Material UI", "REST APIs", "React Testing Library"],
    stories: ["nextjs-decision", "money-paths", "lighter-lists"],
  },
];

export const strengths: { theme: Theme; claim: string; body: string; stories: string[] }[] = [
  {
    theme: "performance",
    claim: "I make products fast, and keep them fast.",
    body: "I start from measurements, fix causes instead of symptoms, and stop regressions before they merge.",
    stories: ["lighthouse-55-95", "lighthouse-before-merge", "traffic-peaks", "seat-map-renders", "lighter-lists"],
  },
  {
    theme: "architecture",
    claim: "I make technical decisions on evidence, and write them down.",
    body: "Stack choices, state boundaries and shared building blocks, argued with trade-offs rather than taste.",
    stories: ["nextjs-decision", "server-vs-ui-state", "shared-states", "rtl-ltr", "dashboard-pagination"],
  },
  {
    theme: "quality",
    claim: "I protect the flows that cost the most when they break.",
    body: "Payments, wallets and bookings get tested first, across components, integration, end to end and real browsers.",
    stories: ["money-paths", "double-payment", "wallet-balance", "safari-fallback"],
  },
  {
    theme: "ux",
    claim: "I remove steps between the user and what they came for.",
    body: "Shorter booking paths, forms that fail where the error is, and states the designs forgot.",
    stories: ["fewer-booking-steps", "store-setup", "seat-selection", "missing-states", "wallet-balance"],
  },
  {
    theme: "ownership",
    claim: "I own features from the first screen to production.",
    body: "End-to-end responsibility for a booking platform, and a World Cup launch on a deadline that couldn't move.",
    stories: ["beljwar-ownership", "world-cup-inside", "designs-as-start"],
  },
  {
    theme: "collaboration",
    claim: "I bring evidence to other teams, not blame.",
    body: "Backend, design, product and management: payloads checked before raising issues, edge cases agreed before coding.",
    stories: ["evidence-not-opinions", "double-payment", "missing-states", "seat-selection", "nextjs-decision"],
  },
];

export const storyById = (id: string) => stories.find((s) => s.id === id)!;
export const companyBySlug = (slug: string) => companies.find((c) => c.slug === slug)!;
export const storiesFor = (slug: CompanySlug) => stories.filter((s) => s.company === slug);
export const storyHref = (s: Story) => `/work/${s.company}/#${s.id}`;
