const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./db.json");
let userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "987456321";

function createToken(payload, expiresIn = "6h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function checkToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function userExist({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function emailExist(email) {
  return userdb.users.findIndex((user) => user.email === email) !== -1;
}

server.post("/public/cadastrar", (req, res) => {
  const { email, password, name } = req.body;

  if (emailExist(email)) {
    const status = 401;
    const message = "E-mail já cadastrado!";
    res.status(status).json({ status, message });
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
    }

    const json = JSON.parse(data.toString());

    const last_item_id =
      json.users.length > 0 ? json.users[json.users.length - 1].id : 0;

    json.users.push({ id: last_item_id + 1, email, password, name });
    fs.writeFile("./users.json", JSON.stringify(json), (err) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }
    });
    userdb = json;
  });

  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

server.post("/public/login", (req, res) => {
  const { email, password } = req.body;
  if (!userExist({ email, password })) {
    const status = 401;
    const message = "E-mail ou senha incorretos";
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ email, password });
  let user = {
    ...userdb.users.find(
      (user) => user.email === email && user.password === password
    ),
  };
  delete user.password;
  res.status(200).json({ access_token, user });
});

server.use(/^(?!\/(public|transactions|balance)).*$/, (req, res, next) => {
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
    let checkTokenResult;
    checkTokenResult = checkToken(
      req.headers.authorization.split(" ")[1]
    );

    if (checkTokenResult instanceof Error) {
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
});

server.use(router);

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000");
});
