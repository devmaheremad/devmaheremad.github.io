// Everything on the site comes from the CV (cv/cv.html in Career-Content-Bot). No numbers or claims beyond it.

export const profile = {
  name: "Maher Almashharawi",
  first: "Maher",
  last: "Almashharawi",
  role: "Senior Frontend Engineer",
  stackLine: "React · Next.js · TypeScript",
  location: "Gaza, Palestine",
  timezone: "Asia/Gaza",
  availability: "Available now · Remote, hybrid or on-site · Open to relocation",
  intro:
    "I build fast, accessible React and Next.js frontends for SaaS, e-commerce and booking products. 5+ years, remote.",
  email: "mashmaher96@gmail.com",
  cv: "/cv/Maher_Almashharawi_Senior_Frontend_Engineer_CV.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/devmaheremad" },
    { label: "GitHub", href: "https://github.com/devmaheremad" },
    { label: "X", href: "https://x.com/devmaheremad" },
    { label: "Linktree", href: "https://linktr.ee/devmaheremad" },
  ],
};

export const manifesto =
  "I took an app from about 55% to 95%+ on Lighthouse. I built a FIFA World Cup Qatar 2022 ticket-booking experience that supported about $20,000 in revenue per match event. I advocated Next.js as the foundation of a multi-store SaaS platform. I care about the decisions behind the pixels.";

export const stats = [
  { value: 5, prefix: "", suffix: "+", label: "years building production frontends" },
  { value: 95, prefix: "", suffix: "%+", label: "Lighthouse score, up from about 55%" },
  { value: 20, prefix: "$", suffix: "k", label: "approx. revenue per World Cup match event" },
  { value: 20, prefix: "", suffix: "+", label: "Figma & XD screens to production" },
  { value: 10, prefix: "", suffix: "+", label: "booking & business websites" },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  kind: string;
  stack: string[];
  summary: string;
  image?: string;
  art?: string; // gradient art when there is no public screenshot
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "koninpay",
    title: "KoninPay",
    client: "Konin Cloud",
    year: "2023 — 2025",
    kind: "Multi-store SaaS platform",
    stack: ["React", "Next.js", "TypeScript", "REST APIs"],
    summary:
      "Merchant and store creation, secure e-wallet API integration, real-time order and sales dashboards, and responsive customer and admin experiences. I advocated Next.js as its foundation.",
    image: "/work/konin-digits.webp",
    href: "https://digits.koninstore.com/en",
  },
  {
    slug: "world-cup",
    title: "World Cup 2022 Booking",
    client: "The Sailors",
    year: "2022",
    kind: "High-traffic ticket booking",
    stack: ["React", "TypeScript", "Material UI"],
    summary:
      "A FIFA World Cup Qatar 2022 ticket-booking experience supporting ~$20,000 in revenue per match event, built inside the existing platform instead of a separate site.",
    art: "linear-gradient(135deg,#5b0f2e 0%,#a01d4a 45%,#f2c14e 100%)",
  },
  {
    slug: "storefronts",
    title: "95%+ Storefronts",
    client: "The Sailors",
    year: "2022 — 2023",
    kind: "E-commerce performance",
    stack: ["React", "TypeScript", "PWA", "SEO"],
    summary:
      "Multiple e-commerce storefronts at 95%+ Lighthouse across performance, accessibility, SEO, best practices and PWA readiness. One app went from ~55% to 95%+.",
    art: "linear-gradient(135deg,#062a2a 0%,#0e7c66 50%,#b8f5d0 100%)",
  },
  {
    slug: "beljwar",
    title: "Beljwar",
    client: "Mars Innovation Technology",
    year: "2021",
    kind: "Multi-category booking platform",
    stack: ["JavaScript", "jQuery", "React", "Material UI"],
    summary:
      "End-to-end frontend owner: 20+ Figma and Adobe XD screens to production, and booking flows restructured to remove steps between discovery and reservation.",
    art: "linear-gradient(135deg,#120c3a 0%,#3b2bb5 50%,#9fd3ff 100%)",
  },
  {
    slug: "coffee-talk",
    title: "Coffee Talk",
    client: "Business websites",
    year: "2021",
    kind: "Dashboard",
    stack: ["JavaScript", "Bootstrap", "Chart.js"],
    summary: "A dashboard experience for a hospitality business.",
    image: "/work/coffee-talk.webp",
    href: "https://devmaheremad.github.io/coffeetalkdash/home",
  },
  {
    slug: "mars",
    title: "Mars Technology",
    client: "Mars Innovation Technology",
    year: "2021",
    kind: "Company website",
    stack: ["HTML", "Sass", "JavaScript"],
    summary: "The company website, presenting its services in a creative, modern layout.",
    image: "/work/mars.webp",
    href: "https://devmaheremad.github.io/Mars-master/",
  },
  {
    slug: "dahran",
    title: "Dahran Schools",
    client: "Business websites",
    year: "2021",
    kind: "Education website",
    stack: ["HTML", "Sass", "JavaScript"],
    summary: "A website for students and graduates to present their services and experience, and to offer courses and lessons.",
    image: "/work/dahran.webp",
    href: "https://devmaheremad.github.io/aldahran/",
  },
  {
    slug: "ajad",
    title: "AJAD",
    client: "Business websites",
    year: "2021",
    kind: "Landing page",
    stack: ["HTML", "Sass", "JavaScript"],
    summary: "A modern landing page presenting the company's vision, objectives, services and contact details.",
    image: "/work/ajad.webp",
    href: "https://devmaheremad.github.io/ajad/",
  },
  {
    slug: "laqta",
    title: "Laqta Productions",
    client: "Mars Innovation Technology",
    year: "2021",
    kind: "Company website",
    stack: ["HTML", "Sass", "JavaScript"],
    summary: "A multi-section company website with several themes that visitors can switch between.",
    image: "/work/laqta.webp",
    href: "https://devmaheremad.github.io/laqtasiteloader/",
  },
  {
    slug: "hilarity",
    title: "Hilarity HQ",
    client: "Side project",
    year: "2023",
    kind: "Video sharing platform",
    stack: ["React", "TypeScript", "Material UI"],
    summary: "A platform for sharing videos, moments and daily memos.",
    image: "/work/hilarity.webp",
    href: "https://hilarity-hq.vercel.app/",
  },
  {
    slug: "tuby",
    title: "Tuby",
    client: "Side project",
    year: "2022",
    kind: "Data-driven video browser",
    stack: ["React", "TypeScript", "Zustand", "RapidAPI"],
    summary: "Route-level code splitting with React.lazy and Suspense, Zustand for global state, RapidAPI data.",
    image: "/work/tuby.webp",
    href: "https://github.com/devmaheremad/tuby",
  },
  {
    slug: "nearby",
    title: "Nearby",
    client: "Side project",
    year: "2022",
    kind: "Places discovery app",
    stack: ["React", "TypeScript", "Google Maps", "RapidAPI"],
    summary: "Restaurants, hotels and attractions on a map, with place details and initial search and filtering.",
    art: "linear-gradient(135deg,#0b2b1e 0%,#1f7a4d 50%,#e8f7a1 100%)",
    href: "https://github.com/devmaheremad/nearby",
  },
];

export const storefronts = [
  { name: "Digits Store", image: "/work/konin-digits.webp", href: "https://digits.koninstore.com/en" },
  { name: "Market Store", image: "/work/konin-market.webp", href: "https://market.koninstore.com/en" },
  { name: "Food Store", image: "/work/konin-food.webp", href: "https://foodstore.koninstore.com/en" },
  { name: "Fashion Store", image: "/work/konin-fashion.webp", href: "https://fashion.koninstore.com/en" },
  { name: "Glammart Store", image: "/work/konin-glammart.webp", href: "https://glammart.koninstore.com/en" },
  { name: "Pastries Online", image: "/work/konin-pastries.webp", href: "https://pastryshop.koninstore.com/en" },
];

export const experience = [
  {
    company: "Konin Cloud",
    role: "Senior Frontend Developer",
    period: "May 2023 — Sep 2025",
    place: "Remote",
    points: [
      "Advocated Next.js over an HTML, Sass and Blade approach, and prepared the technical comparison behind the decision.",
      "Built reusable, responsive UI from Figma and integrated REST APIs with structured loading and error states.",
      "Tested critical flows with React Testing Library, integration, end-to-end and manual testing.",
      "Reviewed API behavior and logs, and optimized data fetching to cut unnecessary payloads.",
    ],
  },
  {
    company: "The Sailors",
    role: "Senior Frontend Developer",
    period: "Jan 2022 — Dec 2023",
    place: "Saudi Arabia · Remote",
    points: [
      "Built and launched a FIFA World Cup Qatar 2022 ticket-booking experience (~$20,000 revenue per match event).",
      "Took an application from ~55% to 95%+ through rendering optimization, code splitting, caching and asset optimization.",
      "Delivered e-commerce storefronts at 95%+ on every Lighthouse category.",
      "Contributed to the product and UX design of an interactive venue seat-selection experience.",
    ],
  },
  {
    company: "Mars Innovation Technology",
    role: "Frontend Developer",
    period: "Jan 2021 — Dec 2021",
    place: "UAE · Remote",
    points: [
      "Primary end-to-end frontend owner of the Beljwar booking platform.",
      "Translated 20+ Figma and Adobe XD screens into production-ready interfaces.",
      "Built React and Material UI dashboards, and delivered 10+ booking and business websites.",
    ],
  },
  {
    company: "Gaza Sky Geeks",
    role: "Internship Trainee",
    period: "Jan 2020 — Aug 2020",
    place: "Gaza · On-site",
    points: ["Intensive practical training in JavaScript, HTML5, CSS3 and modern frontend practices."],
  },
];

export const stack = [
  "React", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "Zustand", "Material UI", "Tailwind CSS", "Sass",
  "React Testing Library", "Core Web Vitals", "Lighthouse", "Accessibility (WCAG)", "PWA", "SEO", "REST APIs", "Git", "Figma",
];
