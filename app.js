import express from 'express';
import session from "express-session";
import "dotenv/config";
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";


const app = express();


app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "https://a5--capable-marzipan-0a2656.netlify.app"],
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
const port = process.env.PORT || 4000;

TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});