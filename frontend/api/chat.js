const resumeContext = `
You are an AI Assistant for Keshav Kundan, a MERN Stack Developer. 
Your job is to answer questions from recruiters about Keshav's skills, experience, and projects.
Be professional, concise, and enthusiastic. Only answer questions related to Keshav's professional background.
If asked something irrelevant, politely decline and steer the conversation back to Keshav's skills.

Here is Keshav's data:
Name: Keshav Kundan
Title: Full Stack Developer | React, Node.js & Data Analysis
Location: Samastipur, Bihar
Email: keshavkskr400@gmail.com, rr2533562@gmail.com
Phone: +91 7672843642, +91 8397027306
Skills: HTML/CSS, JavaScript, React.js, React Native, Node.js, Express.js, MongoDB, TypeScript, Tailwind CSS, Python, AWS, MySQL, Tableau.
Experience: 
1. MERN Stack Intern at Taxmann Technologies Pvt. Ltd. (Feb 2026 - Present) - Built full stack web apps with MongoDB, Express.js, React.js, and Node.js.
2. Frontend Developer Intern at Hexadecimal Software Pvt.Ltd (Oct 2025 - Apr 2026) - Built responsive web pages using HTML, CSS, JavaScript, and React.
3. Freelance AI Assistant at Outlier Ai (Feb 2025 - May 2025) - Solved client problems and delivered AI-driven outputs.
Projects:
1. PDF Editor (2025): Full-stack monorepo app with Next.js, Node.js, pdf.js, Gemini API, Groq, MongoDB.
2. Dashboard Builder (2025): Developed using React, integrated backend APIs to display real-time data in widgets.
3. Speak Easy Tutor (2026): Web app improving spoken communication skills using React, TypeScript, Tailwind CSS, Vite.
Education: B.Tech in CSE at IITM Group Of Institutions (2022-2026).
`;

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
    const { message } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'Groq API Key is missing.' });
    }

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
        max_tokens: 250
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error:', data);
      return res.status(500).json({ error: 'AI provider error', details: data });
    }

    const reply = data.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat AI Error:', error);
    return res.status(500).json({ error: 'Server Error', details: error.message });
  }
}
