import { Response, Request, RequestHandler } from 'express'
import { loginSchema, registerSchema } from '../helpers/user-validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Connection from '../helpers/database';
import dotenv from 'dotenv';

dotenv.config();

const db = new Connection()

export const signUp = async (req: Request, res: Response) => { 
  const { name, password, email, role } = req.body;
  try {
    const { error, value } = registerSchema.validate(req.body);
    
    if (error) {
      res.status(500).json(error.details[0].message);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.exec('signUp', { name, email, password: hashPassword, role });

    res.status(201).json({ message: 'successfully created user' })
  } catch (err) {
    res.status(500).json({ message: 'server is unable to handle the request' })
  }
} 

export const signIn = async (req: Request, res: Response) => { 
  const { email, password } = req.body;

  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      res.status(500).json(error.details[0].message)
    }

    const user = await db.exec('signin', { email, password });

    const userData = user?.recordset[0] as {
      id: number,
      name: string,
      role: string,
      email: string,
      password: string
    }

    bcrypt.compare(password, userData.password, (err, data) => { 
      if (data) {
        const { role, name, email, id, ...rest } = userData;

        const user = { id, name, email, role }

        const token = jwt.sign(user, process.env.KEY as string, {
          expiresIn: '30days'
        });

        res.status(200).json({ user, token });
      } else { 
        res.status(500).json({ message: 'This is wrong password' });
      }
    })
  } catch (error) {
    res.status(400).json({ error: error });
  }
} 

export const getUsers = async (req: Request, res: Response) => { 
  try {
    const users = (await db.exec('getAllusers')).recordset;

    res.status(200).json(users);
    
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
} 

export const deleteUser: RequestHandler<{id: string}> = async (req: Request, res: Response) => { 
  const id = req.params.id;

  try {
    await db.exec('deleteUsers', { id });

    res.status(201).json({ message: "User is deleted successful"})
  } catch (error) {
    res.status(400).json({ error: "Something went wrong"})
  }
}