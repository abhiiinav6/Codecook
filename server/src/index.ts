import express, { Request, Response } from 'express'
import { config } from 'dotenv'
import cors from "cors"
import cookieParser from 'cookie-parser'

import { logger } from './middlewares/logger'

import { authRouter } from './routes/auth'
import { problemRouter } from './routes/problem'
import { submissionRouter } from './routes/submissions'

const app = express();


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

app.get("/health", (req, res) => {
  res.status(200);
})


app.use("/auth", authRouter)
app.use("/problems", problemRouter)
app.use("/submissions", submissionRouter)


const server = app.listen(3069, () =>
  console.log(`
🚀 Server ready at: http://localhost:3069`),
)
