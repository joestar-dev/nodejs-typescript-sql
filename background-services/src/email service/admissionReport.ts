import ejs from 'ejs';
import mssql from 'mssql';
import dotenv from 'dotenv';
import { sqlConfig } from '../config/config'
import Connection from '../helpers/database';
import sendMail from '../helpers/sendMail';
import { parse } from 'json2csv';

dotenv.config();

const db = new Connection();

interface Patient { 
  id: number;
  name: string;
  resident_area: string;
  room_admitted: string;
  admission_no: string;
  id_no: number;
  email: string;
  issent: number;
  status: string;
}

const admissionReportEmail = async () => { 
  const patients: Patient[] = (await db.exec("checkPatient")).recordset;

  if (patients.length) { 

    const csv = parse(patients)
    ejs.renderFile('templates/report.ejs', {}, async (err, data) => { 

        let messageOption = {
          from: process.env.EMAIL,
          to: process.env.EMAIL,
          subject: "This is your daily report",
          html: data,
          attachments: [
            {
              filename: "daily-report.csv",
              content: csv
            }
          ]
        }
        try {
          
          await sendMail(messageOption);
          await db.exec("updatePatientEmailSent")
        } catch (error) {
          console.log(error);
        }
    })
  }
}

export default admissionReportEmail