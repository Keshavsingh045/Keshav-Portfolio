import { Code2, Database, Layout, Server, Sparkles, Terminal } from "lucide-react";

export const personalDetails = {
  name: "Keshav Kundan",
  title: "Full Stack Developer | React, Node.js & Data Analysis",
  location: "Samastipur, Bihar",
  emails: ["keshavkskr400@gmail.com", "rr2533562@gmail.com"],
  phones: ["+91 7672843642", "+91 8397027306"],
  socials: {
    linkedin: "https://www.linkedin.com/in/keshav-kundan-726071252",
    github: "https://github.com/Keshavsingh045",
    twitter: "singh45keshav",
    instagram: "keshavsingh045",
    chess: "keshavsingh045",
  }
};

export const skills = {
  hard: [
    "HTML/CSS", "JavaScript", "React.js", "React Native", "Node.js", 
    "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Python", 
    "AWS", "MySQL", "MySQL / JDBC", "Tableau", "Data-Driven Decision Making", "Excel (Advanced)"
  ],
  soft: [
    "Communication", "Critical thinking", "Teamwork", "Problem-Solving", "Adaptability"
  ],
  problemSolving: {
    description: "Solved over 300 coding problems on HackerRank. Regular practice on HackerRank and LeetCode using core data structures (searching, sorting, dynamic programming).",
    badges: ["SQL (5 Stars)", "C Language (3 Stars)"]
  }
};

export const experience = [
  {
    role: "MERN Stack Intern",
    company: "Taxmann Technologies Pvt. Ltd.",
    duration: "Feb 2026 - Present",
    description: [
      "Built full stack web apps with MongoDB, Express.js, React.js, and Node.js, delivering features.",
      "Created reusable UI components, enhancing user experience and performance.",
      "Designed and integrated RESTful APIs for smooth frontend-backend communication."
    ],
    tech: ["React.js", "React Native", "Node.js", "MongoDB", "JavaScript", "Express.js"]
  },
  {
    role: "Frontend Developer Intern",
    company: "Hexadecimal Software Pvt.Ltd",
    duration: "Oct 2025 - Apr 2026",
    description: [
      "Built responsive web pages using HTML, CSS, JavaScript, and React.",
      "Integrated backend APIs and ensured smooth data flow.",
      "Improved UI performance and enhanced the overall user experience."
    ],
    tech: ["HTML/CSS", "React.js", "Node.js", "JavaScript", "Supervised Learning"]
  },
  {
    role: "Freelance AI Assistant",
    company: "Outlier Ai",
    duration: "Feb 2025 - May 2025",
    description: [
      "Worked as a freelance AI assistant, solving client problems, creating effective prompts, and delivering accurate AI-driven outputs."
    ],
    tech: ["Data Mapping", "Supervised Learning", "Deep Learning", "Generative AI"]
  }
];

export const projects = [
  {
    title: "PDF Editor",
    year: "2025",
    description: "Full-stack monorepo application with separate web (Next.js + shadcn/ui) and API (Node.js + TypeScript) layers. Developed a PDF viewer using pdf.js for in-browser viewing with zoom and navigation support. Integrated Gemini API and Groq for AI-based invoice data extraction and editable form display. Implemented CRUD operations and invoice record management using MongoDB (Atlas). Deployed both web and API apps on Vercel with clean REST endpoints.",
    tech: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Gemini API", "pdf.js"]
  },
  {
    title: "Dashboard Builder",
    year: "2025",
    description: "Developed a dashboard builder tool using React, enabling dynamic UI components and responsive layouts. Integrated backend APIs to fetch and display real-time data in visual widgets (charts, tables).",
    tech: ["React.js", "HTML/CSS", "JavaScript", "API Integration", "Web Analytics"]
  },
  {
    title: "Speak Easy Tutor",
    year: "2026",
    description: "Web app improving spoken communication skills with a responsive design. Created reusable UI components using React, TypeScript, and Tailwind CSS. Used Vite and modern frontend practices to streamline development.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"]
  }
];

export const education = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "IITM Group Of Institutions / Deenbandhu Chhotu Ram University of Science And Technology",
    duration: "2022 - 2026",
    score: "CGPA: 7.2"
  },
  {
    degree: "Class XII",
    institution: "SNNR College Chamtha Begusarai",
    duration: "2022",
    score: "Percentage: 68.2%"
  },
  {
    degree: "Class X",
    institution: "Public Central School",
    duration: "2020",
    score: "Percentage: 78.2%"
  }
];

export const certifications = [
  {
    title: "AI Tools Workshop",
    issuer: "be10x",
    date: "Feb 20, 2026",
    image: "/be10x-cert.png",
    link: "#"
  },
  {
    title: "SQL (Basic) Skill Certification",
    issuer: "HackerRank",
    date: "Dec 21, 2025",
    image: "/hackerrank-cert.png",
    link: "#"
  },
  {
    title: "Data Analyst Skill Certification",
    issuer: "oneroadmap",
    date: "Nov 29, 2025",
    image: "/oneroadmap-cert.png",
    link: "#"
  },
  {
    title: "TCS iON Career Edge - Young Professional",
    issuer: "TCS iON",
    date: "Oct 16, 2025",
    image: "/tcs-cert.png",
    link: "#"
  },
  {
    title: "Master Tableau 2025: Complete Guide to Data Visualization",
    issuer: "Udemy",
    date: "Sep 25, 2025",
    image: "/udemy-cert.png",
    link: "#"
  },
  {
    title: "Full Stack Developer Skill Certification",
    issuer: "oneroadmap",
    date: "Oct 3, 2025",
    image: "/oneroadmap-fullstack-cert.png",
    link: "#"
  }
];
