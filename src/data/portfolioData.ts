import { ProjectItem, ServiceItem, EducationItem, TrainingItem, CertificateItem } from '../types';

export const RESUME_INFO = {
  name: "Girish",
  fullName: "Batchu Girish Kumar",
  title: "Data Analyst & Data Science",
  email: "girishsunnykumar006@gmail.com",
  phone: "+918247470315",
  linkedin: "https://www.linkedin.com/in/girishkumar0",
  github: "https://github.com/Girishkumar0315",
  summary: "A passionate Data Analyst & Data Science practitioner focused on extracting actionable business insights, statistical analysis, predictive machine learning models, and executive data visualization.",
  bioText: "Tech-driven Computer Science student focused on Data Analytics, Data Science, Machine Learning, Power BI dashboards, and Python pipelines to uncover deep data insights.",
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Lovely Professional University",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    duration: "Aug' 25 – Present",
    location: "Phagwara, Punjab",
    score: "CGPA: 7.77",
    details: "Focusing on advanced algorithms, interactive 3D computing, and enterprise software engineering.",
  },
  {
    institution: "State Board of Technical Education",
    degree: "Diploma (DCME)",
    field: "Computer Engineering",
    duration: "Aug' 22 – Jun' 25",
    location: "Gudivada, AP",
    score: "Percentage: 94.4%",
    details: "Graduated with distinction with high honors in foundational software, mathematics, and systems design.",
  },
];

export const SKILLS_DATA = {
  languages: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript"],
  webTechnologies: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "WebGL / 3D"],
  frameworksLibraries: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "DSA"],
  toolsDatabases: ["MongoDB", "MS SQL Server", "MS Excel", "MS Power BI", "Tableau", "Git / GitHub"],
  softSkills: ["Problem-Solving", "Team Player", "Adaptability", "Visual Storytelling", "Communication Skills"],
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: "01",
    name: "3D Modeling",
    description: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
  },
  {
    number: "02",
    name: "Rendering",
    description: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
  },
  {
    number: "03",
    name: "Motion Design",
    description: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
  },
  {
    number: "04",
    name: "Branding",
    description: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
  },
  {
    number: "05",
    name: "Web Design",
    description: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-01",
    number: "01",
    category: "Data Visualization & Analytics",
    title: "Environmental Pollution Dashboard – India",
    subtitle: "Geospatial Environmental Intelligence System",
    description: "Built an interactive Power BI dashboard analyzing environmental pollution metrics across Indian states and districts. Developed DAX measures, dynamic KPI filters, and heatmap severity charts to translate massive environmental datasets into actionable environmental policy insights.",
    technologies: ["Power BI", "DAX", "MS Excel", "Geospatial Modeling", "Tableau", "Data Pipelines"],
    metrics: [
      "Analyzed nationwide pollution trends across 700+ districts",
      "Dynamic DAX models with real-time severity classification",
      "Interactive KPI cards, trend projections, and geospatial heatmaps"
    ],
    githubUrl: "https://github.com/Girishkumar0315/Environmental-Pollution-Dashboard-India.git",
    liveUrl: "https://app.powerbi.com/groups/me/reports/2005a8fb-8115-40cb-8bde-9d896fb24816/57afe543d098a8c9e6b0?experience=power-bi",
    images: {
      col1Top: "/images/pollution-ai-map.svg",
      col1Bottom: "/images/pollution-ai-analytics.svg",
      col2Tall: "/images/environmental-pollution-india-hero.svg",
    },
  },
  {
    id: "project-02",
    number: "02",
    category: "Machine Learning & AI",
    title: "Commodity Price Prediction Engine",
    subtitle: "AI-Powered Price Forecasting Engine",
    description: "Preprocessed commodity datasets using scikit-learn, resolving 100% of missing values and normalizing features to optimize model performance by 40% and cut prediction error by 35%. Built intuitive web interface with 91% accuracy across Gradient Boosting and Random Forest models.",
    technologies: ["Python", "Scikit-learn", "Gradient Boosting", "Random Forest", "JavaScript", "HTML/CSS", "Pandas"],
    metrics: [
      "91% ML model accuracy achieved on diverse commodity cycles",
      "93 user satisfaction score for clean intuitive forecasting UX",
      "Optimized performance by 40% with automated normalization pipelines"
    ],
    githubUrl: "https://github.com/Girishkumar0315/Commodity-Price-Prediction.git",
    liveUrl: "https://commodityml.vercel.app/",
    images: {
      col1Top: "/images/commodity-physical-assets.svg",
      col1Bottom: "/images/commodity-mandi-sacks.svg",
      col2Tall: "/images/commodity-price-predictor-hero.svg",
    },
  },
  {
    id: "project-03",
    number: "03",
    category: "Crypto Trading & AI Platform",
    title: "TradZen",
    subtitle: "Unified Crypto Trading & AI Mentor Platform",
    description: "Engineered TradZen, a unified crypto trading platform integrating real-time market tracking, AI-powered mentoring, AI bot suggestions, portfolio management, and smart price alerts to simplify and organize trading decisions.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Groq / Llama API", "Binance API"],
    metrics: [
      "Built responsive interfaces with custom 3D dark aesthetics",
      "Integrated Binance live WebSocket market streams and charts",
      "Embedded AI bot mentorship and real-time smart price notifications"
    ],
    githubUrl: "https://github.com/saxdy7/TradeZen.git",
    liveUrl: "https://tradezen-beryl.vercel.app",
    images: {
      col1Top: "/images/tradzen 2.webp",
      col1Bottom: "/images/tradzen 1.webp",
      col2Tall: "/images/tradzen-hero-source.svg",
    },
  },
  {
    id: "project-04",
    number: "04",
    category: "Gamified EdTech & Algorithms",
    title: "Interactive DSA Learning Game",
    subtitle: "Gamified Algorithmic Learning Experience",
    description: "Designed and built an interactive DSA Learning Game to make concepts such as arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching intuitive and engaging through gamified challenges and real-time visual sandboxes.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Data Structures", "Algorithms", "Canvas & Motion"],
    metrics: [
      "Gamified modules covering arrays, trees, graphs, and sorting algorithms",
      "Interactive step-by-step visualizer and execution tracer",
      "Hands-on algorithmic challenges with real-time feedback and scoring"
    ],
    githubUrl: "https://github.com/Girishkumar0315/DSA-Learning-Game.git",
    liveUrl: "https://dsa-legends.vercel.app",
    images: {
      col1Top: "/images/dsa-tree-visualizer.svg",
      col1Bottom: "/images/dsa-sorting-arena.svg",
      col2Tall: "/images/dsa-legends-hero.svg",
    },
  },
];

export const MARQUEE_IMAGES = [
  // Top Row (Upside) - Distinct Showcase Cards
  "/images/pollution-dashboard.png",
  "/images/tradezen.png",
  "/images/cpu-scheduler.jpg",
  "/images/tradzen 1.webp",
  "/images/commodity-price-predictor-hero.svg",

  // Bottom Row (Downside) - Completely Different Images (No duplicate across rows)
  "/images/dsa-legends.png",
  "/images/market-chart.webp",
  "/images/pollution-ai-analytics.svg",
  "/images/tradzen 2.webp",
  "/images/dsa-sorting-arena.svg",
];

export const TRAINING_DATA: TrainingItem[] = [
  {
    provider: "Centre for Professional Enhancement (Lovely Professional University)",
    title: "Data Structures, Algorithms and Problem Solving MasterClass",
    period: "Jun' 26 – Jul' 26",
    badge: "Summer Training Master Class",
    githubUrl: "https://github.com/Girishkumar0315/DSA-Learning-Game.git",
    liveUrl: "https://dsa-legends.vercel.app",
    highlights: [
      "Strengthened deep understanding of Data Structures, Algorithms, and Problem-Solving techniques for high-performance computing.",
      "Designed and built an interactive DSA Learning Game to make concepts such as arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching intuitive through interactive play.",
      "Enhanced algorithmic thinking and computational optimization skills through real-time code challenges and game development.",
    ],
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    title: "Database Management System Part - 1",
    issuer: "Infosys Springboard",
    date: "Jul' 26",
    credentialUrl: "https://drive.google.com/file/d/1XiOKk0tqUn9BiLSsWKZd9ROpuLBkI1SZ/view?usp=sharing",
  },
  {
    title: "Python Course Completion",
    issuer: "Naresh Technologies",
    date: "Jul' 25",
    credentialUrl: "https://drive.google.com/file/d/1KeyI_LIztPGaURvU3iLxowgPg8xhgDAK/view?usp=sharing",
  },
];

export const ACHIEVEMENTS_DATA = [
  {
    title: "HACK-ADHYAAY National Level Hackathon",
    organization: "CodIntern & Vibranta",
    date: "Nov' 25",
    description: "Certificate of Appreciation for enthusiastic participation, dedication, collaborative spirit, and technical skills during the 24-Hour National Level Hackathon.",
    credentialUrl: "https://drive.google.com/file/d/1M4hIhwo9MM6AxPXnBBGPpLLH8x-zOPzI/view?usp=sharing",
  },
];

