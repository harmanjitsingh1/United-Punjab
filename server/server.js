import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './db/conection1.db.js';
import userRoute from './routes/user.routes.js';
dotenv.config();


const PORT = process.env.PORT;

connectToDB();

const app = express();
app.use(express.json());
app.use(cors({
  // origin: process.env.CORS_ORIGIN,
  origin: ["http://localhost:5173", "http://192.168.1.5:5173"],
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);

app.listen(PORT, ()=>{
  console.log(`Server listening at port ${PORT}`);
})
