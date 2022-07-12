import Jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(400).send("JWT Token is required");
  }
  try {
    const decoded = Jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
export default auth;
