const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url.js");
const { connectToDB } = require("./connection.js");
const path = require("path");
const staticRouter = require("./routes/staticRouter.js");

const app = express();
const PORT = 3000;

connectToDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https: data: fonts.googleapis.com fonts.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com;"
  );
  next();
});

app.get("/url/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
});

app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  console.log(shortId);

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: new Date() },
      },
    },
    { new: true }
  );
  if (!entry) {
    //  return res.status(404).send("Short URL not found");

    console.log("shortID did not found!");
  }
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server Started at "${PORT}`);
});
