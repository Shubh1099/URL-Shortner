const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url.js");
const { connectToDB } = require("./connection.js");

const app = express();
const PORT = 3000;

connectToDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: new Date() },
      },
    },
    { new: true }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server Started at "${PORT}`);
});
