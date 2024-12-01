/*
Task tracker is a project used to track and manage your tasks. In this task, you will build a simple command line interface (CLI) to track what you need to do, what you have done, and what you are currently working on. This project will help you practice your programming skills, including working with the filesystem, handling user inputs, and building a simple CLI application.

Requirements
The application should run from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file. The user should be able to:

Add, Update, and Delete tasks
Mark a task as in progress or done
List all tasks
List all tasks that are done
List all tasks that are not done
List all tasks that are in progress
Here are some constraints to guide the implementation:

You can use any programming language to build this project.
Use positional arguments in command line to accept user inputs.
Use a JSON file to store the tasks in the current directory.
The JSON file should be created if it does not exist.
Use the native file system module of your programming language to interact with the JSON file.
Do not use any external libraries or frameworks to build this project.
Ensure to handle errors and edge cases gracefully.
*/

const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const userRoute = require("./route/user");
const taskRoute = require("./route/task");

const app = express();
require("dotenv").config();

app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose
.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.listen(port, () => {
    console.log(`Task tracker app listening on port ${port}`)
})