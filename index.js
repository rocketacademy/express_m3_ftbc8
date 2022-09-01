const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");

const { Client } = require("pg");

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

client.connect();

const GreetingsRouter = require("./Routers.js/GreetingsRouter");
const greetingRouter = new GreetingsRouter(express);

const DataController = require("./Controllers/Data");
const dataController = new DataController(client);

const DataRouter = require("./Routers.js/DataRouter");
const dataRouter = new DataRouter(express, dataController);

// browser is making a request to http://localhost:8080/

let count = 0;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// own custom middle that does NOTHING!
app.use("/greeting", (req, res, next) => {
  console.log(req.method);
  count++;
  console.log(`request number : ${count}`);
  next();
});

app.use("/data", (req, res, next) => {
  console.log(req.method);
  count++;
  console.log(`request number : ${count}`);
  next();
});

const cache = [];

app.use("/greeting", greetingRouter.routes());

app.use("/data", dataRouter.routes());

app.listen(8080, () => {
  console.log("Application listening to port 8080");
});

// GET --> retreive information from the server

// POST --> set new information into the servers model

// PUT --> altering information already set in the servers model

// DELETE --> delete information already set in the servers model
