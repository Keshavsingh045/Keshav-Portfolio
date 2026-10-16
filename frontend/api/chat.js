const resumeContext = `
You are an AI Assistant for Keshav Kundan, a MERN Stack Developer. 
Your job is to answer questions from recruiters about Keshav's skills, experience, and projects.
Be professional, concise, and enthusiastic. Only answer questions related to Keshav's professional background.
`;

function getSmartReply(userMessage) {
  const q = (userMessage || '').toLowerCase().trim();

  if (/^(hi|hello|hey|hola|namaste|greetings)/i.test(q)) {
    return "Hi there! 👋 I'm Keshav's AI Assistant. How can I assist you? Feel free to ask about his skills, experience, projects, or how to get in touch with him!";
  }
  if (/contact|email|phone|call|hire|reach|mobile|linkedin|github|connect/i.test(q)) {
    return "You can reach Keshav directly via:\n• 📧 Email: keshavkskr400@gmail.com / rr2533562@gmail.com\n• 📱 Phone: +91 7672843642 / +91 8397027306\n• 💼 LinkedIn: https://www.linkedin.com/in/keshav-kundan-726071252\n• 🐙 GitHub: https://github.com/Keshavsingh045\n• 📍 Location: Samastipur, Bihar";
  }
  if (/skill|tech|stack|language|framework|tool|frontend|backend|database|mern/i.test(q)) {
    return "Keshav's core technical skills include:\n• Frontend: React.js, React Native, TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3\n• Backend: Node.js, Express.js, RESTful APIs\n• Databases: MongoDB, MySQL\n• Cloud & Tools: AWS, Git/GitHub, Vite, Tableau, Excel\n• Problem Solving: 300+ coding problems solved on HackerRank (SQL 5-Stars ⭐⭐⭐⭐⭐, C 3-Stars).";
  }
  if (/experience|intern|work|job|taxmann|hexadecimal|outlier|company|role/i.test(q)) {
    return "Keshav has valuable hands-on industry experience:\n1. 🏢 MERN Stack Intern at Taxmann Technologies (Feb 2026 - Present): Full stack web apps with MongoDB, Express, React, and Node.js.\n2. 💻 Frontend Developer Intern at Hexadecimal Software (Oct 2025 - Apr 2026): Responsive web interfaces with React & REST APIs.\n3. 🤖 Freelance AI Assistant at Outlier AI (Feb 2025 - May 2025): Prompt engineering, problem solving, and AI output evaluation.";
  }
  if (/project|pdf\s*editor|dashboard|speak\s*easy|portfolio|built/i.test(q)) {
    return "Here are Keshav's featured projects:\n1. 📄 PDF Editor (2025): Full-stack monorepo with Next.js, Node.js, TypeScript, pdf.js, Gemini API, and MongoDB for AI-powered invoice extraction.\n2. 📊 Dashboard Builder (2025): Dynamic React tool enabling customizable widgets, charts, and real-time backend API integration.\n3. 🗣️ Speak Easy Tutor (2026): Communication improvement web app crafted with React, TypeScript, Tailwind CSS, and Vite.";
  }
  if (/education|college|degree|b\.?tech|university|school|cgpa|study|iitm/i.test(q)) {
    return "Keshav is pursuing a B.Tech in Computer Science Engineering at IITM Group Of Institutions / DCRUST (2022 - 2026) with a 7.2 CGPA. He completed Class XII (68.2%) and Class X (78.2%).";
  }
  if (/certif|badge|hackerrank|course|workshop/i.test(q)) {
    return "Keshav's certifications include:\n• SQL (Basic) 5-Stars Skill Certification - HackerRank\n• AI Tools Workshop - be10x\n• Full Stack Developer Certification - oneroadmap\n• Data Analyst Skill Certification - oneroadmap\n• Master Tableau 2025 - Udemy\n• TCS iON Career Edge - Young Professional";
  }
  if (/resume|cv|biodata/i.test(q)) {
    return "You can download Keshav's complete resume using the 'Download Resume' button at the top header of this portfolio, or request a copy directly via email at keshavkskr400@gmail.com.";
  }
  return "Keshav is a MERN Stack Developer skilled in React.js, Node.js, Express, MongoDB, and TypeScript. You can ask me about his:\n• 🛠️ Technical Skills\n• 💼 Work Experience (Taxmann, Hexadecimal, Outlier AI)\n• 🚀 Projects (PDF Editor, Dashboard Builder, Speak Easy Tutor)\n• 🎓 Education & Certifications\n• 📬 Contact Information";
}

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid message.' });
    }

    if (process.env.GROQ_API_KEY) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              { role: 'system', content: resumeContext },
              { role: 'user', content: message }
            ],
            temperature: 0.5,
            max_tokens: 300
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data?.choices?.[0]?.message?.content;
          if (reply) return res.status(200).json({ reply });
        }
      } catch (e) {
        console.warn('Groq failed in serverless function:', e.message);
      }
    }

    // Smart fallback
    const reply = getSmartReply(message);
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat AI Error:', error);
    return res.status(200).json({
      reply: "Hi! I'm Keshav's AI Assistant. Feel free to ask about his skills, experience, projects, or contact details!"
    });
  }
}
