import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectToDB } from "./db/conection1.db.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";

const PORT = process.env.PORT;
connectToDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.1.5:5173",
  "https://united-punjab-mine.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);

app.get("/", (req, res) => {
  res.send("Backend is running....");
});

app.listen(PORT || 5000, () => {
  console.log(`Server listening at port ${PORT}`);
});
