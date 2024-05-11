const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.json({ msg: "Please login" });
  }

  const user = getUser(token);
  //console.log(user)

  if (!user) {
    //return res.render("login");
    return res.json({ msg: "Please login" });
  }

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};
