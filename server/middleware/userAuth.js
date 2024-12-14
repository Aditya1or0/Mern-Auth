import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ success: false, message: "Unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.id) {
      req.body.userId = decodedToken.id;
      next();
    } else {
      return res.json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
