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

const allowedOrigins = [
  "http://localhost:5173",
  "https://united-punjab-mine.onrender.com",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
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
