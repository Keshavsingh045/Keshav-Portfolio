import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Contact from './models/Contact.js';
import { handleChatQuery } from './chatService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Safe timeout so local dev works without MongoDB running)
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/keshav-portfolio', {
    serverSelectionTimeoutMS: 2500,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(() => console.log('ℹ️ MongoDB is not active locally. Messages will be stored in messages.json'));

// Helper to save messages locally so none are lost
function saveMessageLocally(entry) {
  try {
    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(data || '[]');
    }
    messages.push(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    console.log(`💾 Saved message from ${entry.name} (${entry.email}) to messages.json`);
  } catch (err) {
    console.error('Failed to write message locally:', err.message);
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running smoothly' });
});

// AI Chatbot Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid message.' });
    }

    const reply = await handleChatQuery(message);
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat API Error:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred.',
      reply: "Hi! I'm Keshav's AI Assistant. Feel free to ask about his skills, experience, or projects!"
    });
  }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const entry = {
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    // 1. Always back up to local JSON file
    saveMessageLocally(entry);

    // 2. Save to MongoDB if available
    try {
      if (mongoose.connection.readyState === 1) {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        console.log('✅ Contact saved to MongoDB');
      }
    } catch (dbErr) {
      console.log('ℹ️ Could not save to DB, stored in file.');
    }

    // 3. Send Email Notification if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'keshavkskr400@gmail.com',
          subject: `New Portfolio Message from ${name}`,
          html: `<h3>New Portfolio Message!</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong><br/>${message}</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email delivered to keshavkskr400@gmail.com');
      } catch (mailErr) {
        console.warn('⚠️ Nodemailer delivery note: Gmail app password authentication failed or offline. (Message safely recorded locally).');
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! Keshav will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact Error:', error);
    return res.status(500).json({ error: 'Server Error. Please try again later.' });
  }
});

// Endpoint to view stored messages
app.get('/api/messages', (req, res) => {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return res.status(200).json(JSON.parse(data || '[]'));
    }
    return res.status(200).json([]);
  } catch (err) {
    return res.status(500).json({ error: 'Could not read messages' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
