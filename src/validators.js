import jwt from "jsonwebtoken";
import { getConnection } from "./database.js";

const SECRET_KEY = "987456321";

function createToken(payload, expiresIn = "6h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function userExist({ email, password }) {
  const userdb = getConnection();
  return (
    userdb.data.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function emailExist(email) {
  const userdb = getConnection();
  return userdb.data.users.findIndex((user) => user.email === email) !== -1;
}

const validateToken = (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Token inválido";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Token de autenticação não encontrado";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Token revogado";
    res.status(status).json({ status, message });
  }
};

export { createToken, verifyToken, userExist, emailExist, validateToken };
