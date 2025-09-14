import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./db/conection1.db.js";
import userRoute from "./routes/user.routes.js";
dotenv.config();

const PORT = process.env.PORT;

connectToDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
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

// app.options("/api/v1/*", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend is running....");
});
app.use("/api/v1", userRoute);

app.listen(PORT || 5000, () => {
  console.log(`Server listening at port ${PORT}`);
});
