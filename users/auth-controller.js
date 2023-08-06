import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      console.log("Username already exists");
      return res.status(409).send({ error: "Username already exists" });
    }
    const newUser =  { _id: new Date().getTime() + "", firstName:req.body.firstName, lastName:req.body.lastName, username:req.body.username, password:req.body.password }
    usersDao.createUser(newUser);
    req.session["currentUser"] = newUser;
    res.json(newUser);
    console.log("User registered");
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user !== null) {
      req.session["currentUser"] = user;
      res.json(user);
      console.log("User logged in");
    } else {
      res.sendStatus(404);
      console.log("User not found");
    }
  };


  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      console.log("Unauthorized before reaching profile");
      return res.status(401).send({ error: "Unauthorized before reaching profile" }); // Unauthorized
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
    console.log("User logged out");
  };

  // update user's first and lastname via the profile screen
  const update = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      console.log("Unauthorized before update");
      return res.status(401).send({ error: "Unauthorized before update" });
    }

    const updatedUser = req.body;
    const updateResult = usersDao.updateUser(currentUser._id, updatedUser);

    if (updateResult && updateResult.status === 'ok') {
      // Update the current user in the session
      req.session["currentUser"] = { ...currentUser, ...updatedUser };
      res.sendStatus(200); // OK
    }  else if (updateResult && updateResult.status === "not_found") {
      console.log("User not found");
      return res.status(404).send({ error: "User Not Found" });
    } else {
      console.log("Internal Server Error");
      return res.status(500).send({ error: "Internal Server Error" });
    }
  };


  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/profile", profile);
  app.post("/api/users/logout", logout);
  app.put ("/api/users",   update);
};
export default AuthController;