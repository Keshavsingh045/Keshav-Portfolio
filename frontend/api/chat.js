import { GoogleGenerativeAI } from '@google/generative-ai';

const resumeContext = `
You are an AI Assistant for Keshav Kundan, a MERN Stack Developer. 
Your job is to answer questions from recruiters about Keshav's skills, experience, and projects.
Be professional, concise, and enthusiastic. Only answer questions related to Keshav's professional background.
If asked something irrelevant, politely decline and steer the conversation back to Keshav's skills.

Here is Keshav's data:
Name: Keshav Kundan
Title: Full Stack Developer | React, Node.js & Data Analysis
Location: Samastipur, Bihar
Email: keshavkskr400@gmail.com
Phone: +91 8092289667
Skills: C/C++, JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, Bootstrap.
Experience: Web Developer Intern at InternPe (Feb 2024 - Mar 2024) - Built 3 live MERN projects.
Projects:
1. AI Exam System: Automates exam paper generation using AI.
2. Skill Assessment Platform: Platform for evaluating technical skills.
3. Certificate Validation API: Backend service for validating certificates.
`;

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'AI API Key is missing.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${resumeContext}\n\nUser Question: ${message}\nAssistant Answer:`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error('Chat AI Error:', error);
    return res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}
