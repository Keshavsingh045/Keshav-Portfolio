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
        model: 'llama3-8b-8192',
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
