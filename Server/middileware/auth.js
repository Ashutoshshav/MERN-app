const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ msg: "Please login" });
  }

  const user = getUser(token);

  if (!user) {
    return res.status(400).json({ msg: "Please login" });
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};
