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
  origin: ["united-punjab-mine.vercel.app"],
  methods: ["GET", "POST"], 
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
  res.send("Backend is running....")
})
app.use("/api/v1", userRoute);

app.listen(PORT || 5000, ()=>{
  console.log(`Server listening at port ${PORT}`);
})
