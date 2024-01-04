import { getConnection } from "../database.js";
import { emailExist, createToken, userExist } from "../validators.js";
import { v4 } from "uuid";

export const getUsers = (req, res) => {
  const users = getConnection().data.users;
  res.json(users);
};

export const createUser = async (req, res) => {
  const { email, password, name } = req.body;

  if (emailExist(email)) {
    const status = 401;
    const message = "E-mail já cadastrado!";
    res.status(status).json({ status, message });
  }

  const newUser = {
    id: v4(),
    name: name,
    email: email,
    password: password,
    transactions: [],
    balance: 0,
  };

  try {
    const db = getConnection();

    db.data.users.push(newUser);
    await db.write();

    const access_token = createToken({ email, password });
    res.status(201).json({ access_token });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!userExist({ email, password })) {
    const status = 401;
    const message = "E-mail ou senha incorretos";
    res.status(status).json({ status, message });
    return;
  }

  const access_token = createToken({ email, password });

  try {
    const db = getConnection();

    let user = {
      ...db.data.users.find(
        (user) => user.email === email && user.password === password
      ),
    };

    delete user.password;
    res.status(200).json({ access_token, user });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getUser = (req, res) => {
  const userFound = getConnection().data.users.find(
    (user) => user.id === req.params.id
  );
  if (!userFound) res.sendStatus(404);
  res.json(userFound);
};

export const updateUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const db = getConnection();
    const userFound = db.data.users.find((user) => user.id === req.params.id);
    if (!userFound) return res.sendStatus(404);

    userFound.name = name;
    userFound.password = password;

    db.data.users.map((user) => (user.id === req.params.id ? userFound : user));

    await db.write();

    res.json(userFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
