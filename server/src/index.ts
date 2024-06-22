import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import cors from "cors"
import { logger } from './middlewares/logger'
import { authRouter } from './routes/auth'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser());
config()
app.use(
  cors({
    origin: (origin, callback) => {
      const origins = String(process.env.CORS_ORIGIN).split(",");
      if (!origin || origins.includes(String(origin))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed."), false);
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["set-cookie"],
  })
);



app.use(express.json())
app.use(logger)

app.get("/", (req, res) => {
  res.send("hiiii")
})

app.get("/ping", (req, res) => {
  res.cookie("ping", "pong")
  res.json({ "ping": "pong" })
})

app.use("/auth", authRouter)


const server = app.listen(3069, () =>
  console.log(`
🚀 Server ready at: http://localhost:3069`),
)
