const User = require("../models/user");

const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

//ethereal SMTP details
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "jenifer.towne@ethereal.email",
    pass: "gnNutbGwneGGZeUtDm",
  },
});

//JWT key
const SecretKey = "ASHU$SHAV";

// Using a Map to store OTPs
const otpStore = new Map();

async function findUser(email, password = undefined) {
  if(email && password) {
    const user = await User.findOne({ email, password });
    return user;
  } else if(email) {
    console.log(email);
    const user = await User.findOne({ email });
    return user;
  } else {
    return ""
  }
}

function setUser(user) {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    SecretKey
  );
  return token;
}

function getUser(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, SecretKey);
  } catch {
    return null;
  }
}

function getOTP() {
  let OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  return OTP;
}

function storeOTP(email, OTP) {
  otpStore.set(email, OTP);
  
  // Set a timeout to delete the OTP after 5 minutes (300000 milliseconds)
  setTimeout(() => otpStore.delete(email), 300000);
}

async function sendMail(email, OTP) {
  const info = await transporter.sendMail({
    from: '"URL Shortner" <jenifer.towne@ethereal.email>', // sender address
    to: `${email}`, // list of receivers
    subject: "OTP for creating new Password", // Subject line
    text: `OTP is ${OTP}`, // plain text body
    html:`<b>OTP sended ${OTP}</b>`, // html body
  });

  return info;
}

function checkOTP(email, OTP) {
  console.log(email, OTP);
  
  const storedOTP = otpStore.get(email);

  if (storedOTP && storedOTP === OTP) {
    otpStore.delete(email);
    return true
  } else {
    return false
  }
}

module.exports = {
  findUser,
  setUser,
  getUser,
  getOTP,
  storeOTP,
  sendMail,
  checkOTP,
};
