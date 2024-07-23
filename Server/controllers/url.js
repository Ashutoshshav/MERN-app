const shortid = require("shortid");
const URL = require("../models/url");
const User = require("../models/user");

async function handleGenereateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is requires" });
  }
  
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user.id,
  });

  return res.send(shortID);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  const user = await User.findById(result.createdBy);
  return res.send({
    createdBy: user.name,
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenereateNewShortURL,
  handleGetAnalytics,
};
