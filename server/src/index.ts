import express from "express";

const app = express();

app.get("/", (req, res)=>{
    res.json({"namaste": "world"})
})

app.listen("3001", ()=>{
    console.log("Server started on http://localhost:3001")
})