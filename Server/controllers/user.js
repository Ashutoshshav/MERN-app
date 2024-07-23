const User = require("../models/user");
const { findUser, setUser, getUser, getOTP, storeOTP, sendMail, checkOTP } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  
  const user = findUser(email, password);
  if (!user) {
    return res.send({ token: null });
  }
  
  const token = setUser(user);
  res.send({ auth: true, token: token });
}

async function handleForgetPassword(req, res) {
  const { email } = req.body;
  
  if(email) {
    let user = await findUser(email);
    if(user) {
      let OTP = getOTP();
      console.log(OTP);
  
      await sendMail(email, OTP).then((info) => {
        console.log("Message sent:", info.messageId);
        storeOTP(email, OTP);
        res.status(200).send("OTP Sended");
      }).catch((err) => {
        console.log(err);
      })
    } else {
      console.log("User doesn't exist");
      res.status(400).send("User doesn't exist")
    }
  } else {
    console.log("email is not getting");
    res.status(400).send("email is not getting")
  }
}

async function handleCheckOTP(req, res) {
  const { email, OTP } = req.body;

  const verified = checkOTP(email, OTP)
  console.log(verified);
  if(verified) {
    res.status(200).send("OTP verified successfully")
  } else {
    res.status(400).send('Invalid or expired OTP');
  }
}

async function resetPassword(req, res) {
  const { email, newPassword, confirmPassword } = req.body;

  const user = await findUser(email)
  
  if(user) {
    if(newPassword == confirmPassword) {
      await User.findOneAndUpdate({ email: email }, { password: confirmPassword });
      res.status(200).send("Password Reset Successfully");
    } else {
      res.status(400).send("New Password and Confirm Password is not same");
    }
  } else {
    res.status(400).send("User doesn't exist");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleForgetPassword,
  handleCheckOTP,
  resetPassword,
};
