const { getUser } = require("../service/auth");

async function LoggedInUsersOnly(req, res, next) {
  try {
    const userUid = req.cookies?.uid;

    if (!userUid) {
      return res.redirect("/login");
    }

    // Add await here since getUser is likely async
    const user = await getUser(userUid);

    if (!user) {
      return res.redirect("/login");
    }

    // Set the user on the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).redirect("/login");
  }
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  // Add await here since getUser is likely async
  const user = await getUser(userUid);

  // Set the user on the request object
  req.user = user;
  next();
}

module.exports = {
  LoggedInUsersOnly,
  checkAuth,
};
