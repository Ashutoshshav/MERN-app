const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allURL = await URL.find({});
  res.send({ allURL });
});

router.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  //console.log(shortId);

  const url = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } 
  );
  //console.log(url);
  res.send(url.redirectURL);
});

module.exports = router;
