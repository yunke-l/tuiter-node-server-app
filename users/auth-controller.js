import * as usersDao from "./users-dao.js";

var currentUserVar;
const AuthController = (app) => {
  const register = async (req, res) => {
    const username = req.body.username;
    const user = await usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = await usersDao.createUser(req.body);
    currentUserVar = newUser;
    res.json(newUser);
  };


  const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      const user = await usersDao.findUserByCredentials(username, password);
      if (user) {
        currentUserVar = user;
        res.json(user);
        // console.log("User logged in: " + user.username);
        } else {
          res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
  };

  const profile = async (req, res) => {
    const currentUser = currentUserVar
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    // console.log("User logged out: " + currentUserVar.username);
  };

  const update = (req, res) => {
    let currentUser = currentUserVar;
    if(!currentUser){
      return res.status(404).send({ error: "Please login first" });
    }
    // console.log(req.body);
    currentUser = { ...currentUser, ...req.body };
    usersDao.updateUser(currentUser._id, currentUser);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };


  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put("/api/users", update);

};
export default AuthController;


