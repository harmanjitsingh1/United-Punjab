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
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: 'https://united-punjab-mine.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Include credentials if needed
};

app.use(cors(corsOptions));

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));


app.get("/", (req, res)=>{
  res.send("Backend is running....")
})
app.use("/api/v1", userRoute);

app.listen(PORT || 5000, ()=>{
  console.log(`Server listening at port ${PORT}`);
})
