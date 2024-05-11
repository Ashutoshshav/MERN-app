const jwt = require('jsonwebtoken');
const SecretKey = "ASHU$SHAV";

function setUser(user) {
  const token = jwt.sign({
    email: user.email,
    password: user.password
  }, SecretKey);
  return token;
}

function getUser(token) {
  //console.log(token);
  if(!token) { return null };

  try {
    return jwt.verify(token, SecretKey);
  } catch {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
