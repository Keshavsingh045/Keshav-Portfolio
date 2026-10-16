const resumeContext = `
You are an AI Assistant for Keshav Kundan, a MERN Stack Developer. 
Your job is to answer questions from recruiters and visitors about Keshav's skills, experience, and projects.
Be professional, concise, and enthusiastic. Only answer questions related to Keshav's professional background.

Data:
Name: Keshav Kundan
Title: Full Stack Developer | React, Node.js & Data Analysis
Location: Samastipur, Bihar
Email: keshavkskr400@gmail.com, rr2533562@gmail.com
Phone: +91 7672843642, +91 8397027306
Socials: LinkedIn (linkedin.com/in/keshav-kundan-726071252), GitHub (github.com/Keshavsingh045)
Skills: HTML/CSS, JavaScript, React.js, React Native, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, Python, AWS, MySQL, Tableau, REST APIs.
Experience: 
1. MERN Stack Intern at Taxmann Technologies Pvt. Ltd. (Feb 2026 - Present)
2. Frontend Developer Intern at Hexadecimal Software Pvt. Ltd. (Oct 2025 - Apr 2026)
3. Freelance AI Assistant at Outlier AI (Feb 2025 - May 2025)
Projects:
1. PDF Editor (2025): Next.js, Node.js, pdf.js, Gemini API, Groq, MongoDB.
2. Dashboard Builder (2025): React.js, dynamic data widgets, REST APIs.
3. Speak Easy Tutor (2026): React, TypeScript, Tailwind CSS, Vite.
Education: B.Tech in CSE at IITM Group Of Institutions / DCRUST (2022-2026, CGPA: 7.2).
Certifications: SQL 5-Star (HackerRank), AI Tools Workshop (be10x), Data Analyst & Full Stack (oneroadmap), Tableau 2025 (Udemy), TCS iON Career Edge.
`;

export function getSmartReply(userMessage) {
  const q = (userMessage || '').toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|hola|namaste|greetings|good\s*(morning|afternoon|evening))/i.test(q)) {
    return "Hi there! 👋 I'm Keshav's AI Assistant. How can I assist you? Feel free to ask about his skills, experience, projects, or how to get in touch with him!";
  }

  // Contact / Hire / Phone / Email / Socials
  if (/contact|email|phone|call|hire|reach|mobile|linkedin|github|connect|social/i.test(q)) {
    return "You can reach Keshav directly via:\n• 📧 Email: keshavkskr400@gmail.com / rr2533562@gmail.com\n• 📱 Phone: +91 7672843642 / +91 8397027306\n• 💼 LinkedIn: https://www.linkedin.com/in/keshav-kundan-726071252\n• 🐙 GitHub: https://github.com/Keshavsingh045\n• 📍 Location: Samastipur, Bihar";
  }

  // Skills / Tech stack
  if (/skill|tech|stack|language|framework|tool|frontend|backend|database|mern/i.test(q)) {
    return "Keshav's core technical skills include:\n• Frontend: React.js, React Native, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3\n• Backend: Node.js, Express.js, RESTful APIs\n• Databases: MongoDB, MySQL\n• Cloud & Tools: AWS, Git/GitHub, Vite, Tableau, Excel\n• Problem Solving: 300+ coding problems solved on HackerRank (SQL 5-Stars ⭐⭐⭐⭐⭐, C 3-Stars).";
  }

  // Experience / Job / Internship / Company
  if (/experience|intern|work|job|taxmann|hexadecimal|outlier|company|role|career/i.test(q)) {
    return "Keshav has valuable hands-on industry experience:\n1. 🏢 MERN Stack Intern at Taxmann Technologies Pvt. Ltd. (Feb 2026 - Present): Developing end-to-end full stack web applications with MongoDB, Express, React, and Node.js.\n2. 💻 Frontend Developer Intern at Hexadecimal Software (Oct 2025 - Apr 2026): Built responsive web interfaces with React and integrated backend APIs.\n3. 🤖 Freelance AI Assistant at Outlier AI (Feb 2025 - May 2025): Prompt engineering, problem solving, and evaluating AI outputs.";
  }

  // Projects
  if (/project|pdf\s*editor|dashboard|speak\s*easy|portfolio|built|create/i.test(q)) {
    return "Here are Keshav's featured projects:\n1. 📄 PDF Editor (2025): Full-stack monorepo with Next.js, Node.js, TypeScript, pdf.js, Gemini API, and MongoDB for AI-powered invoice extraction.\n2. 📊 Dashboard Builder (2025): Dynamic React tool enabling customizable widgets, charts, and real-time backend API integration.\n3. 🗣️ Speak Easy Tutor (2026): Communication improvement web app crafted with React, TypeScript, Tailwind CSS, and Vite.";
  }

  // Education / College / Degree
  if (/education|college|degree|b\.?tech|university|school|cgpa|study|iitm/i.test(q)) {
    return "Keshav is pursuing a B.Tech in Computer Science Engineering at IITM Group Of Institutions / DCRUST (2022 - 2026) with a 7.2 CGPA. He completed Class XII (68.2%) and Class X (78.2%).";
  }

  // Certifications
  if (/certif|badge|hackerrank|course|workshop/i.test(q)) {
    return "Keshav's certifications include:\n• SQL (Basic) 5-Stars Skill Certification - HackerRank\n• AI Tools Workshop - be10x\n• Full Stack Developer Certification - oneroadmap\n• Data Analyst Skill Certification - oneroadmap\n• Master Tableau 2025 - Udemy\n• TCS iON Career Edge - Young Professional";
  }

  // Resume / CV
  if (/resume|cv|biodata/i.test(q)) {
    return "You can download Keshav's complete resume using the 'Download Resume' button at the top header of this portfolio, or feel free to request a copy directly via email at keshavkskr400@gmail.com.";
  }

  // About Keshav / Introduction
  if (/who|about|keshav|summary|intro|bio/i.test(q)) {
    return "Keshav Kundan is an enthusiastic Full Stack Developer skilled in the MERN stack (MongoDB, Express, React, Node.js), TypeScript, and Tailwind CSS. He loves building responsive user experiences, scalable REST APIs, and integrating AI-driven features!";
  }

  // General fallback
  return "Keshav is a MERN Stack Developer skilled in React.js, Node.js, Express, MongoDB, and TypeScript. You can ask me about his:\n• 🛠️ Technical Skills\n• 💼 Work Experience (Taxmann, Hexadecimal, Outlier AI)\n• 🚀 Projects (PDF Editor, Dashboard Builder, Speak Easy Tutor)\n• 🎓 Education & Certifications\n• 📬 Contact Information";
}

export async function handleChatQuery(message) {
  const userMsg = (message || '').trim();
  if (!userMsg) {
    return "Please enter a message so I can assist you!";
  }

  // 1. If GROQ_API_KEY is available, try Groq LLM
  if (process.env.GROQ_API_KEY) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: resumeContext },
            { role: 'user', content: userMsg }
          ],
          temperature: 0.5,
          max_tokens: 300
        })
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (reply) return reply;
      }
    } catch (err) {
      console.warn('Groq API call failed, falling back to smart local engine:', err.message);
    }
  }

  // 2. Fallback to smart local response engine
  return getSmartReply(userMsg);
}
