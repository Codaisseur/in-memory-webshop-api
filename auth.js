const jwt = require("jsonwebtoken");
const database = require("./dummy_database.js");

const secret = process.env.JWT_SECRET || "nivty3mo2y43ogyco2x37yo2n3o259";

function createJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function authMiddleware(request, response, next) {
  const pieces = (request.headers.authorization || "").split(" ");
  const token = pieces[1];

  if (pieces[0] !== "Bearer" || !token) {
    return response.status(401).json({
      error:
        "Sorry, you'll need to pass the Authorization header with a token for this API call!",
    });
  }

  try {
    const { userId } = jwt.verify(token, secret);
    const user = database.users.find((user) => {
      return user.id === userId;
    });
    if (!user) {
      return response.status(401).json({ error: "Could not find that user!" });
    }
    request.user = user;
    next();
  } catch {
    return response
      .status(401)
      .json({ error: "Sorry, that doesn't seem like a valid token!" });
  }
}

module.exports = { createJWT, authMiddleware };
