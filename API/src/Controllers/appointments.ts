import { Response, Request } from 'express'
import Connection from '../helpers/database'

const db = new Connection();

export const createAppointment = async (req: Request, res: Response) => { 

  const { patient_name, doctor_email, date, patient_email } = req.body;

  try {
    await db.exec('addAppointment', { patient_name, doctor_email, date, patient_email });

    res.status(201).json({ message: "Appointment has been created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
