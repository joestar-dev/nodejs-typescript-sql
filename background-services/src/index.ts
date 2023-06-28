import express from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import welcomeEmail from './email-service/welcomeEmail';
import admissionReportEmail from './email-service/admissionReport';
import diagnosisEmail from './email-service/diagnosisEmail';
import appointmentEmail from './email-service/appointmentEmail';

const app = express();

dotenv.config();

const run = () => {
  cron.schedule('* * * * * *', () => { 
    console.log('running task every second')

    welcomeEmail();
    admissionReportEmail();
    diagnosisEmail();
    appointmentEmail();
  })
}

run();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`background services in running on port ${PORT}`)
});

