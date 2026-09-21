import express from "express";
import dotenv from "dotenv";
import connectDb from "./models/config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";

dotenv.config();

const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview",interviewRouter);

// Port
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
});