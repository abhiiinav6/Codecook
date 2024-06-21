import express from 'express'
import { logger } from './middlewares/logger'

const app = express()

app.use(express.json())
app.use(logger)

app.get("/", (req,res)=>{
  res.send("hiiii")
})

app.get("/ping", (req, res) => {
  res.json({ "ping": "pong" })
})


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
)
