const resumeContext = {
  skills: "Keshav is highly skilled in the MERN stack. His core technologies include C/C++, JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, and Bootstrap. He also has strong problem-solving abilities.",
  experience: "Keshav worked as a Web Developer Intern at InternPe (Feb 2024 - Mar 2024), where he built 3 live MERN stack projects.",
  projects: "Keshav has built several advanced projects, including: \n1. AI Exam System (Automates exam papers)\n2. Skill Assessment Platform\n3. Certificate Validation API.",
  contact: "You can reach Keshav at keshavkskr400@gmail.com or call him at +91 8092289667. You can also use the contact form on this website!",
  education: "Keshav is a dedicated software engineer with a strong academic background and multiple certifications in web development.",
  default: "I'm a virtual assistant trained on Keshav's resume! I can tell you about his skills, experience, projects, or how to contact him. What would you like to know?"
};

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { message } = req.body;
    if (!message) return res.status(200).json({ reply: resumeContext.default });

    const msg = message.toLowerCase();
    let reply = resumeContext.default;

    if (msg.includes('skill') || msg.includes('react') || msg.includes('node') || msg.includes('tech')) {
      reply = resumeContext.skills;
    } else if (msg.includes('experience') || msg.includes('work') || msg.includes('intern')) {
      reply = resumeContext.experience;
    } else if (msg.includes('project') || msg.includes('build') || msg.includes('made')) {
      reply = resumeContext.projects;
    } else if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('hire')) {
      reply = resumeContext.contact;
    } else if (msg.includes('education') || msg.includes('study') || msg.includes('college')) {
      reply = resumeContext.education;
    } else if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      reply = "Hello! I'm Keshav's AI Assistant. You can ask me about his skills, experience, or projects!";
    }

    // Simulate AI typing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat Error:', error);
    return res.status(500).json({ error: 'Server Error' });
  }
}
