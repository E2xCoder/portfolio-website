// test-email.js - Run this in your project root to test email configuration
// Usage: node test-email.js

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Missing');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS.length + ')' : 'Missing');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Environment variables missing!');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Test connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Portfolio Contact Form Test',
      text: 'This is a test email from your portfolio contact form.',
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.log('2. App Password should be 16 characters long');
      console.log('3. Make sure 2-Factor Authentication is enabled on your Google account');
      console.log('4. Check if Less Secure Apps is disabled (it should be)');
    }
  }
}

testEmail();