import ejs from 'ejs';
import mssql from 'mssql';
import dotenv from 'dotenv';
import Connection from '../helpers/database';
import { sqlConfig } from '../config/config'
import sendMail from '../helpers/sendMail';

dotenv.config();

const db = new Connection();

interface User { 
  id: string;
  name: string;
  email: string;
  role: string;
  issent: number;
}

const welcomeEmail = async () => { 
  
  const users: User[] = (await db.exec('checkuser')).recordset;

  for (let user of users) { 
    ejs.renderFile("templates/welcome.ejs", { name: user.name }, async (err, data) => { 
      
      let messageOption = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Welcome to my world',
        html: data
      }

      try {
        await sendMail(messageOption)
        await db.exec("updateUserEmailSent")
      } catch (error) {
        console.log(error)
      }
    })
  }
}

export default welcomeEmail