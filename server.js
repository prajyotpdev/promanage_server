
const express = require("express");
const cors = require("cors")
const app = express()
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const authRoutes = require('./src/routes/auth')
const taskRoutes = require("./src/routes/tasks")
const subTaskRoutes = require("./src/routes/subtasks")

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
require('dotenv').config()

const port = process.env.PORT

console.log(process.env.DB_URI);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/subtask", subTaskRoutes);

app.post("/", (req, res)=>{
   const {email, password} = req.body
   console.log(`Your Email is ${email} and your password is ${password}`)
})
app.get("/", (req, res)=>{
    res.json({
        server: "task listing server",
    });
})

mongoose
    .connect(process.env.DB_URI,{
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => console.log("Db connected!"))
    .catch((error) => console.log("Failed to connect", error));



    app.get("/health", (req, res) => {
      res.json({
          service: "task listing server",
          status: "Active",
          time: new Date(),
      });
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:8000/`);
});