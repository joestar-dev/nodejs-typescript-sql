import ejs from 'ejs';
import mssql from 'mssql';
import dotenv from 'dotenv';
import Connection from '../helpers/database';
import { sqlConfig } from '../config/config'
import sendMail from '../helpers/sendMail';

dotenv.config();

const db = new Connection();

interface Diagnosis { 
  id: number,
  name_treatment: string,
  drug_administered: string,
  doctor_name :string,
  patient_email :string,
  bill :number,
  date :string,
  paid :string,
  description :string,
  patient_status :string,
  issent :number,
}

const diagnosisEmail = async () => { 

  const diagnosis: Diagnosis[] = (await db.exec("checkDiagnosis")).recordset;

  for (let diagnose of diagnosis) { 
    ejs.renderFile('templates/diagnosis.ejs', async (err, data) => { 

      let messageOption = {
        from: process.env.EMAIL,
        to: diagnose.patient_email,
        subject: `Welcome!! This is diagnosis ${diagnose.name_treatment}`,
        html: data,
        attachments: [
          {
            filename: "diagnosis.txt",
            content: `${diagnose.description}`,

          }
        ]
      }

      try {
        await sendMail(messageOption);
        await db.exec("updateDiagnosisSentEmail");
      } catch (error) {
        console.log(error)
      }   
    })
  }


}

export default diagnosisEmail