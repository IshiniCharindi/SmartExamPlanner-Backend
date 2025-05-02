import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { createTransport } from 'nodemailer';
import userRouter from './src/routes/user';
import examSessionRouter from './src/routes/examSessionRouter';

// Load environment variables
dotenv.config();

// Destructure required env variables
const { PORT, FROM_EMAIL, EMAIL_PASSWORD, TO_EMAIL } = process.env;

if (!PORT || !FROM_EMAIL || !EMAIL_PASSWORD || !TO_EMAIL) {
  throw new Error('Missing required environment variables in .env');
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Routes
app.use('/admin', userRouter);
app.use('/examSession', examSessionRouter);

// Email test route
app.get('/test-email', async (req: Request, res: Response) => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use true for port 465
    auth: {
      user: FROM_EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject:'Test Email',
      text:'This is a test email sent from Node.js using Nodemailer!',
    });

    res.status(200).send(`Email sent: ${info.response}`);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

// Start server
app.listen(Number(PORT), () => {
  console.log(`App is running on port ${PORT}`);
});

