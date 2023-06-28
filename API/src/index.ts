import express, { NextFunction, Request, Response, json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { appointmentRoute, diagnosisRoute, patientRoute, userRoute } from './routes';

const app = express();

dotenv.config();
app.use(cors());
app.use(json());

const PORT = process.env.PORT;

app.use('/api/diagnosis', diagnosisRoute)
app.use('/api/users', userRoute)
app.use('/api/appointments', appointmentRoute)
app.use('/api/patients', patientRoute)

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`)
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message) { 
    res.status(500).json({ error: err.message })
  }
});