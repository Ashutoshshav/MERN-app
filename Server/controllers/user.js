const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
  //return res.json({ msg: "User created" });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    //console.log(email, password);
    return res.send({ token: null });
  }
  //console.log(user);
  const token = setUser(user);
  //console.log(token);
  res.send({ auth: true, token: token })
  //return res.json({ msg: "User Login" });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
