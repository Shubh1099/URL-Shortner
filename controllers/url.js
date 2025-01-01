const shortid = require("shortid");
const URL = require("../models/url");

async function handleNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required!" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ shortID });
}

async function handleDelete(req, res) {
  const id = req.params.id;

  await URL.findByIdAndDelete(id);

  return res.json({ msg: "success!" });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;

  console.log("ShortId is:", shortId);
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleNewShortURL, handleDelete, handleAnalytics };
