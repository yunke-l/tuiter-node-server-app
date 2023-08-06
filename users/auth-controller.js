import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
  const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401); // Unauthorized
      return;
    }

    const updatedUser = req.body;
    const updateResult = usersDao.updateUser(currentUser._id, updatedUser);

    if (updateResult && updateResult.status === 'ok') {
      // Update the current user in the session
      req.session["currentUser"] = { ...currentUser, ...updatedUser };
      res.sendStatus(200); // OK
    } else {
      res.sendStatus(500); // Internal Server Error or User Not Found
    }
  };


  app.post("/api/users/register", register);
  app.post("/api/users/login",    login);
  app.post("/api/users/profile",  profile);
  app.post("/api/users/logout",   logout);
  app.put ("/api/users",          update);
};
export default AuthController;