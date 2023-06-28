import ejs from 'ejs';
import mssql from 'mssql';
import Connection from '../helpers/database';
import { sqlConfig } from '../config/config'
import sendMail from '../helpers/sendMail';
import dotenv from 'dotenv';

dotenv.config();

const db = new Connection();

interface Appointment { 
  id: number;
  patient_name: string;
  doctor_email: string;
  date: string;
  patient_email: string;
  issent: number;
}

const appointmentEmail = async () => { 

  const appointments: Appointment[] = (await db.exec("checkAppointment")).recordset;

  for (let appointment of appointments) { 
    ejs.renderFile("templates/appointment.ejs", {
      name: appointment.patient_email, date: appointment.date
    }, async (err, data) => { 

      let messageOption = {
        from: process.env.EMAIL,
        to: appointment.doctor_email,
        subject: "You have an appointment",
        html: data,
        attachments: [
          {
            filename: "sendIT.txt",
            content: "appointment"
          }
        ]
      }

      try {
        await sendMail(messageOption);
        await db.exec("updateAppointment")
      } catch (error) {
        console.log(error)
      }
    })
  }
 
}

export default appointmentEmail