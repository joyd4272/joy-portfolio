// Content for Joy Das portfolio. Sourced from the Figma file and verified
// against the live Webflow portfolio (https://designnerd-joy.webflow.io/).
// All content is in this file — components are pure presentation.

export const profile = {
  name: "Joy Das",
  role: "UI/UX & Product Designer",
  tagline:
    "A passionate UI/UX & Product designer driven by a love for solving complex problems and crafting intuitive, user centric digital experiences.",
  intro: "10+ years of solving problems",
  currentRole: "Lead UI/UX Designer",
  currentCompany: "RDZ-NFS Technology Solutions",
  location: "Bengaluru, India",
  education: {
    school: "Government College of Art & Craft, Kolkata",
    degree: "Bachelor of Visual Arts",
    discipline: "Graphic Design & Applied Arts",
    period: "2007 — 2011",
  },
  email: "joy.d4272@gmail.com",
  phone: "+91 8095 624 272",
  address: "Bengaluru, KA 560064",
  availability: "AVAILABLE FOR HIRE — MAY 2026",
  resumeUrl: "/Joy_Das_Resume.pdf",
  portfolioUrl: "https://designnerd-joy.webflow.io/",
};

export const marquee = [
  "UI/UX DESIGN",
  "DESIGN THINKING",
  "DESIGN SYSTEMS",
  "GEN AI",
  "MOTION DESIGN",
  "3D MODELING",
];

export const stats = [
  { value: "10+", label: "Years in design" },
  { value: "08", label: "Years UI/UX focus" },
  { value: "07", label: "Companies" },
];

export const skillsIntro =
  "Six disciplines, ten years, one obsession: making digital experiences feel effortless.";

export const skills = [
  {
    title: "UX Research & Design Thinking",
    body:
      "Led end to end discovery, translating user insights into validated design directions. Applied structured qualitative and quantitative research to solve complex product challenges.",
    tags: ["Research", "Wireframing", "User Flows", "Journey Mapping"],
  },
  {
    title: "UI & Visual Design",
    body:
      "Designed polished interfaces balancing aesthetics, usability, and accessibility. Delivered scalable visual systems used across multiple products and platforms.",
    tags: ["Visual Design", "Design Systems", "Prototyping", "Figma"],
  },
  {
    title: "Generative AI Design",
    body:
      "Applied generative AI in real workflows to accelerate ideation and prototyping. Designed AI driven experiences including conversational flows and smart interactions.",
    tags: ["Conversational UX", "AI Workflows", "Claude Code", "Codex"],
  },
  {
    title: "Design Leadership",
    body:
      "Led and mentored teams, driving design quality, collaboration, and growth. Influenced product direction through strategic thinking and stakeholder alignment.",
    tags: ["Team Leadership", "Mentorship", "Strategy", "Cross functional"],
  },
  {
    title: "Motion & Interaction Design",
    body:
      "Designed purposeful motion systems to improve usability and user feedback. Integrated animation into products to enhance clarity, engagement, and flow.",
    tags: ["After Effects", "Microinteractions", "Prototyping", "Webflow"],
  },
  {
    title: "3D Modeling & Visualization",
    body:
      "Created 3D assets and visuals to support product storytelling and innovation. Used Blender & Spline to bring depth and differentiation to digital experiences.",
    tags: ["Blender", "Spline 3D", "KeyShot", "Storytelling"],
  },
];

export const journeySubtitle =
  "From illustrating textbooks in 2013 to leading design teams in 2026 — a decade of curiosity in motion.";

export const journey = [
  {
    role: "Lead UI/UX Designer",
    company: "RDZ-NFS Technology Solutions",
    location: "Remote",
    period: "Jan 2025 — Present",
    current: true,
    bullets: [
      "Led and mentored a design team, fostering a strong, collaborative design culture",
      "Streamlined communication across design, engineering, and marketing",
      "Conducted user research to drive usability improvements",
      "Leveraged generative AI tools to improve design efficiency",
    ],
  },
  {
    role: "Lead UI/UX Designer",
    company: "Pinnacleu",
    location: "Remote",
    period: "Jun 2024 — Dec 2024",
    bullets: [
      "Led the translation of concepts into wireframes and prototypes",
      "Defined and optimized user flows for seamless end to end experiences",
      "Drove brand consistency across UI and UX",
      "Championed the use of generative AI for ideation and prototyping",
    ],
  },
  {
    role: "Design Team Lead",
    company: "ValueLabs",
    location: "Bangalore",
    period: "Aug 2022 — Jun 2024",
    bullets: [
      "Delivered design solutions balancing user needs, performance and business constraints",
      "Supported and guided operations across multiple design portfolios",
      "Developed and maintained design systems for visual consistency",
      "Leveraged generative AI to optimize workflows and creative output",
    ],
  },
  {
    role: "Senior UI/UX Designer",
    company: "L&T Technology Services",
    location: "Bangalore",
    period: "Aug 2018 — Aug 2022",
    bullets: [
      "Designed user interfaces for OTT applications with intuitive interactions",
      "Established design systems for visual consistency",
      "Led information architecture, user flow, and journey mapping",
      "Used Blender and KeyShot for 3D design merging digital and physical product experiences",
    ],
  },
  {
    role: "UI Graphic Designer",
    company: "Smarterhomes Technology",
    location: "Bangalore",
    period: "Jan 2018 — Aug 2018",
    bullets: [
      "Translated project requirements into polished user interfaces",
      "Leveraged Sketch and XD to create visually appealing UI",
      "Designed mobile app UI for remote water consumption tracking",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Verse Innovation / Dailyhunt",
    location: "Bangalore",
    period: "Jul 2015 — Jan 2018",
    bullets: [
      "Implemented brand strategies that resonated with customers",
      "Created fonts, banners, motion graphics, and web banners",
      "Created UI designs for dynamic mobile applications, contributing to design system development",
    ],
  },
  {
    role: "Digital Illustrator",
    company: "Creative Books IT Solutions",
    location: "Bangalore",
    period: "Apr 2014 — Jul 2015",
    bullets: [
      "Applied color theory and lighting techniques to add excitement, focus, and depth",
      "Applied artistic and illustrative techniques to print and electronic media",
    ],
  },
  {
    role: "Graphic Illustrator",
    company: "Vedicventures Learning Pvt Ltd",
    location: "Bangalore",
    period: "May 2013 — Apr 2014",
    bullets: [
      "Developed creative design for print materials, brochures, banners, and signs",
      "Produced digital illustrations and developed elearning materials",
    ],
  },
];

export const projectsIntro =
  "A glimpse into recent product work — from workplace platforms and content builders to AI experiences and rural finance.";

export const projects = [
  {
    number: "01",
    name: "Book it",
    category: "Workplace · 2023",
    blurb:
      "Helps users manage and book workspace with less effort and more confidence.",
    href: "/work/book-it",
    background: "var(--color-card-bookit)",
    foreground: "#1a1a1a",
    arrowBg: "#0a0a0a",
    arrowFg: "#ffffff",
  },
  {
    number: "02",
    name: "Builder",
    category: "Content Platform · 2024",
    blurb:
      "A modern, intuitive, scalable Content Builder that enables non technical users to design digital signage layouts with ease.",
    href: "/work/builder",
    background: "var(--color-card-builder)",
    foreground: "#1a1a1a",
    arrowBg: "#0a0a0a",
    arrowFg: "#ffffff",
  },
  {
    number: "03",
    name: "HMI Generator",
    category: "Automotive · Tooling · 2024",
    blurb:
      "A tool for designing and exporting in-vehicle HMI layouts — from concept screens to production-ready specs.",
    href: "/work/hmi",
    background: "#1a2332",
    foreground: "#ffffff",
    arrowBg: "#ffffff",
    arrowFg: "#1a2332",
  },
  {
    number: "04",
    name: "Way Finder",
    category: "Navigation · 2023",
    blurb:
      "Enables employees to seamlessly navigate, locate, and book workspace with purpose and ease.",
    href: "/work/way-finder",
    background: "#1f4dff",
    foreground: "#ffffff",
    arrowBg: "#ffffff",
    arrowFg: "#1f4dff",
  },
  {
    number: "05",
    name: "One",
    category: "Fintech · Rural · 2022",
    blurb:
      "Empowering rural communities by turning everyday cash withdrawals into opportunities to earn, save, and grow.",
    href: "/work/one",
    background: "var(--color-card-one)",
    foreground: "#fff8f3",
    arrowBg: "#ffffff",
    arrowFg: "#ff5b1f",
  },
  {
    number: "06",
    name: "Clarity",
    category: "IoT · Analytics · 2023",
    blurb:
      "Provides insights from workspace and IOT sensors for smarter workplace choices.",
    href: "/work/clarity",
    background: "#0a0a0a",
    foreground: "#f5f1ea",
    arrowBg: "#ffffff",
    arrowFg: "#0a0a0a",
  },
  {
    number: "07",
    name: "OTT News Aggregator",
    category: "Streaming · News · 2024",
    blurb:
      "A unified surface for streaming and news content — curating signal across platforms into one focused feed.",
    href: "/work/ott-news",
    background: "#111111",
    foreground: "#f5f5f5",
    arrowBg: "#ff5b1f",
    arrowFg: "#ffffff",
  },
  {
    number: "08",
    name: "Digital Signage",
    category: "Enterprise · 2022",
    blurb:
      "Supporting relevance, speed, and precision for modern content and screen management solutions.",
    href: "/work/digital-signage",
    background: "var(--color-card-signage)",
    foreground: "#1a1a1a",
    arrowBg: "#0a0a0a",
    arrowFg: "#ffffff",
  },
];

export const dock = [
  { name: "Figma", note: "Auto Layout · Logic · Make", primary: true },
  { name: "Webflow", note: "Web design + dev" },
  { name: "Blender", note: "3D modeling" },
  { name: "Spline 3D", note: "Interactive" },
  { name: "Adobe After Effects", note: "Motion · VFX" },
  { name: "Adobe Photoshop", note: "Composite · Retouch" },
  { name: "Adobe Illustrator", note: "Vector · Brand" },
  { name: "Claude Code", note: "Agentic coding" },
  { name: "Codex", note: "Pair programming" },
];

export const hobbies = [
  { name: "Drawing", note: "Sketchbook always close", icon: "pencil" },
  { name: "Music", note: "Studio sessions", icon: "music" },
  { name: "Video Games", note: "Pixels of all kinds", icon: "play" },
  { name: "Fitness", note: "Mind sharp, body sharp", icon: "mountain" },
  { name: "Travel", note: "New places, new ideas", icon: "plane" },
  {
    name: "Always curious",
    note: "The most important tool",
    icon: "star",
    highlight: true,
  },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joy-das-3538a34a/" },
  { label: "Old projects", href: "https://designnerd.myportfolio.com/" },
];

export const nav = [
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
