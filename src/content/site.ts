// Everything on the site comes from the CV (cv/cv.html in Career-Content-Bot). No numbers or claims beyond it.

export const profile = {
  name: "Maher Almashharawi",
  first: "Maher",
  last: "Almashharawi",
  role: "Senior Frontend Engineer",
  stackLine: "React · Next.js · TypeScript",
  location: "Palestine",
  timezone: "Asia/Gaza",
  availability: "Available now · Remote, hybrid or on-site · Open to relocation",
  intro:
    "I build fast, accessible React and Next.js frontends for SaaS, e-commerce and booking products. 5+ years, remote.",
  email: "mashmaher96@gmail.com",
  cv: "https://drive.google.com/file/d/1IhayT82PmWktlbuYtWAnDIVpJUIxjxmg/view?usp=sharing",
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

// Work follows the owner's Linktree exactly: same groups, same order, same links.
export type Project = {
  slug: string;
  title: string;
  kind: string;
  stack: string[];
  summary: string;
  image: string;
  href: string;
};

export const storefronts = [
  { name: "Digits Store", image: "/work/konin-digits.webp", href: "https://digits.koninstore.com/en" },
  { name: "Market Store", image: "/work/konin-market.webp", href: "https://market.koninstore.com/en" },
  { name: "Food Store", image: "/work/konin-food.webp", href: "https://foodstore.koninstore.com/en" },
  { name: "Fashion Store", image: "/work/konin-fashion.webp", href: "https://fashion.koninstore.com/en" },
  { name: "Glammart Store", image: "/work/konin-glammart.webp", href: "https://glammart.koninstore.com/en" },
  { name: "Gearup Store", image: "/work/konin-gearup.webp", href: "https://gearup.koninstore.com/en" },
  { name: "Pastries Online", image: "/work/konin-pastries.webp", href: "https://pastryshop.koninstore.com/en" },
];

export const workGroups: { title: string; items: Project[] }[] = [
  {
    title: "Business websites",
    items: [
      {
        slug: "coffee-talk",
        title: "Coffee Talk",
        kind: "Business dashboard",
        stack: ["JavaScript", "Bootstrap", "Chart.js"],
        summary: "A dashboard experience for a hospitality business.",
        image: "/work/coffee-talk.webp",
        href: "https://devmaheremad.github.io/coffeetalkdash/home",
      },
      {
        slug: "dhahran",
        title: "Dhahran Schools",
        kind: "Education website",
        stack: ["HTML", "Sass", "JavaScript"],
        summary: "A website for students and graduates to present their services and experience, and to offer courses and lessons.",
        image: "/work/dahran.webp",
        href: "https://devmaheremad.github.io/aldahran",
      },
      {
        slug: "ajad",
        title: "AJAD FM",
        kind: "Company landing page",
        stack: ["HTML", "Sass", "JavaScript"],
        summary: "A modern landing page presenting the company's vision, objectives, services and contact details.",
        image: "/work/ajad.webp",
        href: "https://devmaheremad.github.io/ajad",
      },
      {
        slug: "mars",
        title: "Mars Technology",
        kind: "Company website",
        stack: ["HTML", "Sass", "JavaScript"],
        summary: "The company website, presenting its services in a creative, modern layout.",
        image: "/work/mars.webp",
        href: "https://devmaheremad.github.io/Mars-master",
      },
    ],
  },
  {
    title: "Side projects",
    items: [
      {
        slug: "hilarity",
        title: "Hilarity HQ",
        kind: "Video sharing platform",
        stack: ["Next.js", "TypeScript", "Redux Toolkit", "Material UI"],
        summary: "A platform for sharing videos, moments and daily memos.",
        image: "/work/hilarity.webp",
        href: "https://hilarity-hq.vercel.app/",
      },
      {
        slug: "tuby",
        title: "Tuby",
        kind: "Data-driven video browser",
        stack: ["React", "TypeScript", "Zustand", "RapidAPI"],
        summary: "Route-level code splitting with React.lazy and Suspense, Zustand for global state, RapidAPI data.",
        image: "/work/tuby.webp",
        href: "https://github.com/devmaheremad/tuby",
      },
      {
        slug: "laqta",
        title: "Creative Laqta Site",
        kind: "Company website",
        stack: ["HTML", "Sass", "JavaScript"],
        summary: "A multi-section company website with several themes that visitors can switch between.",
        image: "/work/laqta.webp",
        href: "https://devmaheremad.github.io/laqtasiteloader",
      },
      {
        slug: "gosto",
        title: "Gosto Modern Ecommerce",
        kind: "E-commerce storefront",
        stack: ["React", "TypeScript", "Material UI", "Swiper"],
        summary: "An e-commerce store for selling website templates and graphics.",
        image: "/work/gosto.webp",
        href: "https://devmaheremad.github.io/gosto-ecommerce/",
      },
    ],
  },
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
    place: "Palestine · On-site",
    points: ["Intensive practical training in JavaScript, HTML5, CSS3 and modern frontend practices."],
  },
];

// Case studies: CV facts + the owner's confirmed story bank (Career-Content-Bot kit/case-studies.md, approved 2026-11-05).
// Results stay in words: no numbers beyond the CV.
export const caseStudies = [
  {
    slug: "lighthouse",
    title: "From about 55% to 95%+ on Lighthouse",
    outcome: "An application's Lighthouse performance went from about 55% to 95%+.",
    context: "The Sailors, a Saudi company building booking and e-commerce products. Senior Frontend Developer, remote.",
    challenge: "The application scored about 55% on Lighthouse performance.",
    did: [
      "Found three causes: unoptimized images, a large JavaScript bundle (whole icon packages imported at once) and render-blocking fonts.",
      "Fixed the imports, split the routes, sized the images and changed font loading: rendering optimization, code splitting, caching strategies, media and asset optimization.",
      "On the storefronts, Lighthouse ran before merging, not after launch, so new features couldn't quietly pull scores down.",
    ],
    result: "About 55% to 95%+ on performance. Storefronts shipped with 95%+ across performance, accessibility, SEO, best practices and PWA readiness.",
    stack: ["React", "TypeScript", "Material UI", "Lighthouse", "PWA", "SEO"],
  },
  {
    slug: "world-cup",
    title: "A FIFA World Cup Qatar 2022 ticket-booking launch",
    outcome: "A high-traffic booking experience that supported about $20,000 in revenue per match event.",
    context: "The Sailors needed World Cup ticket booking under a highly constrained timeline.",
    challenge: "High traffic, a booking flow customers could trust, and very little time.",
    did: [
      "Proposed building the experience inside the company's existing platform instead of a separate website, which reduced the implementation scope.",
      "Built and launched it with React, TypeScript and Material UI.",
      "Traffic spiked whenever match tickets opened, so the booking path stayed minimal, match information was cached and the heavy parts loaded lazily.",
    ],
    result: "Booking stayed usable during the peaks, and the experience supported about $20,000 in revenue per match event.",
    stack: ["React", "TypeScript", "Material UI"],
  },
  {
    slug: "nextjs",
    title: "Choosing Next.js for a multi-store SaaS platform",
    outcome: "A written technical comparison that supported the team's decision to build on Next.js.",
    context: "Konin Cloud's KoninPay: a multi-store SaaS platform with merchant and store creation, payment workflows and a digital wallet. Senior Frontend Developer, remote.",
    challenge: "The initial plan was HTML, Sass and Blade, for a product that had to scale and keep evolving.",
    did: [
      "Advocated Next.js, focusing on scalability, maintainability, development efficiency and long-term product evolution.",
      "Wrote a technical comparison of both approaches: architecture, advantages, trade-offs and maintainability.",
      "Part of the case was SEO: storefront product pages needed proper titles and link previews, and with Next.js they render on the server with their own metadata.",
    ],
    result: "The comparison supported the team's technology decision. Product pages became shareable and indexable, and seven live storefronts run on the platform today.",
    stack: ["React", "Next.js", "TypeScript", "Material UI", "REST APIs", "React Testing Library"],
  },
];

export const stack = [
  "React", "Next.js", "TypeScript", "JavaScript", "Redux Toolkit", "Zustand", "Material UI", "Tailwind CSS", "Sass",
  "React Testing Library", "Core Web Vitals", "Lighthouse", "Accessibility (WCAG)", "PWA", "SEO", "REST APIs", "Git", "Figma",
];
