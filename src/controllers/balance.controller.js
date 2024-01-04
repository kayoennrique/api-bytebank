import { getConnection } from "../database.js";

export const getBalance = (req, res) => {
  const db = getConnection();
  const userFound = db.data.users.find((user) => user.id === req.params.id);
  if (!userFound) res.sendStatus(404);

  const balance = userFound.balance;
  res.json(balance);
};

export const updateBalance = async (req, res) => {
  const { balance } = req.body;

  try {
    const db = getConnection();
    const userFound = db.data.users.find((user) => user.id === req.params.id);

    if (!userFound) return res.sendStatus(404);

    userFound.balance = Number(balance);

    db.data.users.map((user) => (user.id === req.params.id ? userFound : user));

    await db.write();

    res.json(userFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
