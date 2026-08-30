import avatarImg from '../assets/images/IMG_6003.JPG (3).jpeg';
import portraitFullImg from '../assets/images/IMG_6003.JPG.jpeg';
import aiBuilderImg from '../assets/images/project_ai_builder_1788079318903.jpg';
import stockDashImg from '../assets/images/project_stock_dash_1788079332325.jpg';
import observabilityImg from '../assets/images/project_observability_1788079347570.jpg';
import { Project, SkillCategory, EducationItem, CertificationItem, CoreStrength } from '../types';

export const personalInfo = {
  name: 'Bhavneet',
  fullName: 'Bhavneet Kapasiya',
  title: 'Software Engineer | Full-Stack Developer | AI-Integrated Web Applications',
  shortBio: 'Computer Science undergraduate specializing in Artificial Intelligence with hands-on experience designing, developing, and deploying full-stack web applications, real-time data streams, and AI-driven platforms.',
  location: 'Meerut, Uttar Pradesh, India',
  email: 'bhavneetkapasiya23@gmail.com',
  phone: '+91 7417634695',
  github: 'https://github.com/bhavneetkapasiya23',
  githubUsername: 'bhavneetkapasiya23',
  avatar: avatarImg,
  fullPortrait: portraitFullImg,
  availability: 'Open to Software Engineer, Full-Stack & AI-focused roles',
  resumeUrl: '#resume',
};

export const stats = [
  { label: 'Projects Built', value: '5+', icon: 'Code2' },
  { label: 'Core Technologies', value: '15+', icon: 'Layers' },
  { label: 'Degree Focus', value: 'B.Tech AI', icon: 'GraduationCap' },
  { label: 'Status', value: 'Available', icon: 'Sparkles' },
];

export const projects: Project[] = [
  {
    id: 'ai-website-builder',
    title: 'AI Website Builder',
    subtitle: 'Prompt-to-Website Full-Stack Generation Platform',
    year: '2025',
    category: 'Full-Stack',
    description: 'A full-stack AI-powered website generator that converts natural-language prompts into complete deployable websites using OpenRouter API and Stripe credit system.',
    longDescription: 'Engineered an end-to-end web generation platform where users can describe what website they want in natural language. The system synthesizes code, previews live reactive components, manages generation quotas with Stripe billing, and deploys directly to production.',
    highlights: [
      'Developed a full-stack AI website generator converting natural-language prompts into deployable websites via OpenRouter API.',
      'Implemented a credit-based usage and payment system using Stripe for seamless credit purchases.',
      'Implemented secure JWT-based authentication and authorization for user accounts and protected API routes.',
      'Designed relational database models for users, projects, credits, and payment records using PostgreSQL and Prisma ORM on Neon.',
      'Deployed application seamlessly to Vercel with full development-to-production CI/CD lifecycle.'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'OpenRouter API', 'Stripe API', 'JWT', 'Vercel'],
    image: aiBuilderImg,
    githubUrl: 'https://github.com/bhavneetkapasiya23',
    liveDemoUrl: 'https://ai-site-builder-2tq6.vercel.app/',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'real-time-stock-dashboard',
    title: 'Real-Time Stock Dashboard',
    subtitle: 'High-Throughput Financial Market Visualizer',
    year: '2025',
    category: 'Real-Time',
    description: 'A high-performance stock market analytics dashboard that streams and renders live price data using WebSockets and Recharts.',
    longDescription: 'Created a real-time financial monitor with sub-second price updates, interactive candlestick & trend visualizations, custom technical indicators, and responsive client-side state buffers to maintain smooth 60fps rendering under heavy streaming loads.',
    highlights: [
      'Developed a responsive stock market dashboard that streams and renders live ticker price data using WebSockets.',
      'Built reusable, strongly typed TypeScript components with Recharts to visualize price trends and historical market movements.',
      'Structured client-side state management for continuous incoming data streams to maintain smooth, jitter-free UI performance.',
      'Configured multi-ticker switching, volume histograms, and responsive alert thresholds.'
    ],
    techStack: ['React.js', 'TypeScript', 'Recharts', 'WebSockets', 'Tailwind CSS', 'Node.js', 'REST APIs'],
    image: stockDashImg,
    githubUrl: 'https://github.com/bhavneetkapasiya23',
    liveDemoUrl: '#demo-stock',
    status: 'Completed',
    featured: true,
  },
  {
    id: 'ai-observability-platform',
    title: 'AI-Powered Observability Platform',
    subtitle: 'Intelligent Microservice Telemetry & Anomaly Analysis',
    year: 'In Progress',
    category: 'AI & ML',
    description: 'An AI-assisted cloud observability dashboard for system metrics, microservice distributed logs, and automated root-cause anomaly detection.',
    longDescription: 'Designing next-generation monitoring infrastructure that ingests distributed traces and logs across microservices, leveraging AI models to automatically pinpoint root causes of performance regressions and anomalies.',
    highlights: [
      'Designing an AI-assisted observability dashboard for logs, metrics, and system health across microservice architectures.',
      'Building a responsive component-driven React interface with modular telemetry widgets.',
      'Planning AI-based anomaly detection and automated root-cause analysis for faster incident response.',
      'Architecting real-time system health metrics with latency heatmaps and error rate monitoring.'
    ],
    techStack: ['React.js', 'Tailwind CSS', 'TypeScript', 'AI Anomaly Detection', 'REST APIs', 'System Architecture'],
    image: observabilityImg,
    githubUrl: 'https://github.com/bhavneetkapasiya23',
    liveDemoUrl: '#demo-observability',
    status: 'In Progress',
    featured: true,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    iconName: 'Code',
    description: 'Core languages for systems, frontend, scripts, and algorithms',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'Advanced', tags: ['Async/Await', 'DOM', 'Modules'] },
      { name: 'TypeScript', level: 'Proficient', tags: ['Generics', 'Type Safety', 'Interfaces'] },
      { name: 'Python', level: 'Proficient', tags: ['AI Scripting', 'Backend', 'Data Processing'] },
      { name: 'Java', level: 'Proficient', tags: ['OOP', 'Data Structures', 'Backend'] },
      { name: 'SQL', level: 'Proficient', tags: ['Queries', 'Joins', 'Schema Design'] },
    ],
  },
  {
    category: 'Frontend Development',
    iconName: 'Layout',
    description: 'Modern, responsive, and performant user interface engineering',
    skills: [
      { name: 'React.js', level: 'Advanced', tags: ['Hooks', 'Context', 'State Management'] },
      { name: 'Tailwind CSS', level: 'Advanced', tags: ['Modern UI', 'Responsive', 'Animations'] },
      { name: 'HTML5 & CSS3', level: 'Advanced', tags: ['Semantic HTML', 'Flexbox', 'Grid'] },
      { name: 'Recharts & D3', level: 'Proficient', tags: ['Data Viz', 'Live Charts', 'Graphs'] },
      { name: 'Motion / Framer', level: 'Proficient', tags: ['Transitions', 'Interactive UI'] },
    ],
  },
  {
    category: 'Backend & APIs',
    iconName: 'Server',
    description: 'Robust server architectures, authentication, and protocols',
    skills: [
      { name: 'Node.js', level: 'Advanced', tags: ['Event Loop', 'Express', 'Async I/O'] },
      { name: 'Express.js', level: 'Advanced', tags: ['Middleware', 'Routing', 'REST'] },
      { name: 'REST API Design', level: 'Advanced', tags: ['CRUD', 'Status Codes', 'Docs'] },
      { name: 'JWT Authentication', level: 'Proficient', tags: ['Tokens', 'Security', 'Protected Routes'] },
      { name: 'WebSockets', level: 'Proficient', tags: ['Real-Time', 'Bi-directional', 'Streams'] },
    ],
  },
  {
    category: 'Databases & ORM',
    iconName: 'Database',
    description: 'Cloud databases, data modeling, migrations, and queries',
    skills: [
      { name: 'PostgreSQL', level: 'Proficient', tags: ['Relational', 'ACID', 'Indexing'] },
      { name: 'Neon PostgreSQL', level: 'Proficient', tags: ['Serverless DB', 'Cloud Hosting'] },
      { name: 'Prisma ORM', level: 'Proficient', tags: ['Migrations', 'Type-Safe Queries', 'Schema'] },
    ],
  },
  {
    category: 'AI & Machine Learning',
    iconName: 'Brain',
    description: 'Generative AI, prompt workflows, and LLM integrations',
    skills: [
      { name: 'Artificial Intelligence', level: 'Specialization', tags: ['B.Tech AI Core', 'ML Concepts'] },
      { name: 'Prompt Engineering', level: 'Advanced', tags: ['System Prompts', 'Structured Output'] },
      { name: 'LLM API Integration', level: 'Advanced', tags: ['OpenRouter API', 'Gemini API', 'Streaming'] },
      { name: 'OpenRouter API', level: 'Proficient', tags: ['Multi-Model Routing', 'Tokens'] },
    ],
  },
  {
    category: 'Tools & DevOps',
    iconName: 'Terminal',
    description: 'Developer tooling, version control, and deployment pipelines',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', tags: ['Branches', 'PRs', 'Version Control'] },
      { name: 'Vercel Deployment', level: 'Proficient', tags: ['Serverless', 'CI/CD', 'Production'] },
      { name: 'Postman', level: 'Proficient', tags: ['API Testing', 'Collections'] },
      { name: 'Stripe API', level: 'Proficient', tags: ['Webhooks', 'Checkout', 'Credits'] },
      { name: 'VS Code', level: 'Advanced', tags: ['Tooling', 'Debugging', 'Extensions'] },
    ],
  },
];

export const educationList: EducationItem[] = [
  {
    degree: 'Bachelor of Technology - Computer Science and Engineering (Artificial Intelligence)',
    institution: 'Meerut Institute of Engineering and Technology (MIET)',
    location: 'Meerut, Uttar Pradesh',
    period: '2023 – Present (Pursuing)',
    status: 'In Progress',
    details: [
      'Specialized curriculum in Artificial Intelligence, Deep Learning, Data Structures & Algorithms, and Distributed Systems.',
      'Active developer building AI-integrated applications and full-stack software products.',
    ],
  },
  {
    degree: 'Senior Secondary (Class XII) — CBSE',
    institution: 'Vardhman Academy',
    location: 'Meerut, Uttar Pradesh',
    period: '2022 – 2023',
    details: [
      'Focus in Physics, Chemistry, Mathematics, and Computer Science.',
    ],
  },
  {
    degree: 'Secondary (Class X) — CBSE',
    institution: 'Vardhman Academy',
    location: 'Meerut, Uttar Pradesh',
    period: '2020 – 2021',
    details: [
      'Strong academic foundation in Mathematics and Science.',
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    title: 'JavaScript Fundamentals',
    issuer: 'GreatStack',
    description: 'Comprehensive mastery of modern JavaScript ES6+, asynchronous programming, closures, promises, and DOM manipulation.',
  },
  {
    title: 'React Hooks Course',
    issuer: 'GreatStack',
    description: 'In-depth exploration of useState, useEffect, useMemo, useCallback, useRef, custom hooks, and state management architectural patterns.',
  },
];

export const coreStrengths: CoreStrength[] = [
  {
    title: 'Problem Solving',
    description: 'Strong foundation in Data Structures, Algorithms, and clean code optimization.',
    iconName: 'Zap',
  },
  {
    title: 'Full-Stack Integration',
    description: 'Connecting frontend React experiences with robust Node/Express backends and PostgreSQL databases.',
    iconName: 'Layers',
  },
  {
    title: 'AI & LLM Integration',
    description: 'Building practical prompt pipelines, token management, and AI-enabled product workflows.',
    iconName: 'Brain',
  },
  {
    title: 'Analytical Thinking',
    description: 'Breaking complex architectural problems down into clean, maintainable micro-modules.',
    iconName: 'Cpu',
  },
  {
    title: 'Teamwork & Communication',
    description: 'Collaborative development with clear documentation, Git workflows, and active communication.',
    iconName: 'Users',
  },
  {
    title: 'Adaptability & Fast Learner',
    description: 'Rapidly learning modern tools, frameworks, and staying on the cutting-edge of tech.',
    iconName: 'Rocket',
  },
];

export const quickFAQ = [
  {
    question: "What are Bhavneet's primary technical skills?",
    answer: "Bhavneet specializes in React.js, TypeScript, Node.js, Express.js, PostgreSQL (Prisma ORM on Neon), Tailwind CSS, WebSockets, and LLM API integrations (OpenRouter, Gemini)."
  },
  {
    question: "What projects has Bhavneet built?",
    answer: "His highlighted projects include the AI Website Builder (full-stack prompt-to-site generator with Stripe payments & PostgreSQL), the Real-Time Stock Dashboard (WebSocket-driven live market visualizer with Recharts), and an in-progress AI-Powered Observability Platform."
  },
  {
    question: "What is his educational background?",
    answer: "Bhavneet is currently pursuing a Bachelor of Technology in Computer Science and Engineering (Artificial Intelligence) at Meerut Institute of Engineering and Technology (MIET), Meerut (2023–Pursuing)."
  },
  {
    question: "Is Bhavneet open to internships or job opportunities?",
    answer: "Yes! Bhavneet is actively seeking Software Engineer, Full-Stack Developer, or AI-focused internship and entry-level positions. You can reach him at bhavneetkapasiya23@gmail.com or +91 7417634695."
  }
];
