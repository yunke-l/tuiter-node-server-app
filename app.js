import express from 'express';
import session from "express-session";
import "dotenv/config";
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";

const app = express();

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://a6--capable-marzipan-0a2656.netlify.app"],
    })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());

TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(process.env.PORT || 4000);