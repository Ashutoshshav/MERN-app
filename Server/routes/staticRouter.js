const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allURL = await URL.find({});
  res.status(200).send({ allURL });
});

router.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

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
  res.status(200).redirect(url.redirectURL);
});

module.exports = router;
