import Jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const isCustomToken = token;
    let decodeData;
    if (token && isCustomToken) {
      decodeData = Jwt.verify(token, "test");
      req.userId = decodeData?.id;
    } else {
      decodedData = Jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
