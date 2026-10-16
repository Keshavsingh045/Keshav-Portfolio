import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Gmail SMTP with:');
console.log('USER:', process.env.EMAIL_USER);
console.log('PASS:', process.env.EMAIL_PASS ? '********' : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

try {
  await transporter.verify();
  console.log('✅ SUCCESS! Google SMTP credentials are valid!');
  
  // Try sending a test email
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Portfolio Email Verification Test',
    text: 'Your Portfolio contact form email integration is working perfectly!'
  });
  console.log('✅ Test email sent successfully! Message ID:', info.messageId);
} catch (error) {
  console.error('\n❌ Google SMTP Error:', error.message);
  if (error.message.includes('535') || error.message.includes('BadCredentials')) {
    console.log('\n👉 Reason: The App Password in .env is expired, wrong, or not a Google App Password.');
    console.log('👉 Solution: Generate a new 16-character App Password at: https://myaccount.google.com/apppasswords');
  }
}
