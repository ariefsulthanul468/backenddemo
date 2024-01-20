
const jwt = require("jsonwebtoken");
exports.checkJwt = (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies.token;

    if (!tokenFromCookie) {
      return res.status(405).json({ message: "No token found in the cookie" });
    }
    try {
      const decoded = jwt.verify(tokenFromCookie, "random string");
      req.user = decoded;
      console.log("req user", req.user);
      // next();
      res.status(200).json({ message: "Token verified success" });
    } catch (error) {
      console.error("this is the error", error.message);
      res.status(401).json({ message: "Invalid token de" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(405).json({ message: "not allowed to use this api" });
  }
};
