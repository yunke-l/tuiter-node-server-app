let users = [];


export const findAllUsers = () => users;


export const findUserById = (uid) => {
  const index = users.findIndex((u) => u._id === uid);
  if (index !== -1) return users[index];
  return null;
};


export const findUserByUsername = (username) => {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) return users[index];
  return null;
};


export const findUserByCredentials = (username, password) => {
  const index = users.findIndex((u) => u.username === username && u.password === password);
  // console.log(`User found at index: ${index}`);
  if (index !== -1) return users[index];
  return null;
};


export const createUser = (user) => {
  user._id = (new Date()).getTime() + '';
  users.push(user);
  // console.log('Users list: ')
  // console.log(users);
  // console.log('User created: \n'
  //     + 'username: ' + user.username + '\n'
  //     + 'firstname: '+ user.firstName + '\n'
  //     + 'lastname: ' + user.lastName + '\n'
  //     + 'password: ' + user.password);
}


export const updateUser = (uid, user) => {
  const index = users.findIndex((u) => u._id === uid);
  users[index] = { ...users[index], ...user };
  // console.log('User updated: \n'
  //     + 'username: ' + users[index].username + '\n'
  //     + 'firstname: '+ users[index].firstName + '\n'
  //     + 'lastname: ' + users[index].lastName + '\n'
  //     + 'password: ' + users[index].password)
  return {status: 'ok'}
};
export const deleteUser = (uid) => {
  const index = users.findIndex((u) => u._id === uid);
  users.splice(index, 1);
  return {status: 'ok'}
};
