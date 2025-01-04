const express = require("express");
const app = express();
const PORT = 3000;
const URL = require("./models/url.js");
const { connectToDB } = require("./connection.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const { LoggedInUsersOnly,checkAuth } = require("./middlewares/auth");

const staticRouter = require("./routes/staticRouter.js");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user.js");

connectToDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.use("/url", LoggedInUsersOnly, urlRoute);
app.use("/",checkAuth, staticRouter);
app.use("/user", userRoute);

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
    console.log("shortID did not found!");
  }
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
