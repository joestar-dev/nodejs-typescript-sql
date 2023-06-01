import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(cors());
app.use(json());

const PORT = process.env.PORT;

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`)
})