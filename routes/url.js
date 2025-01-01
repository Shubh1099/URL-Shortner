const express = require("express");
const {
  handleNewShortURL,
  handleDelete,
  handleAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleNewShortURL);
router.delete("/:id", handleDelete);
router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
