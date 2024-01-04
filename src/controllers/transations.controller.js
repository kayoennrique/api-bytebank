import { getConnection } from "../database.js";
import { v4 } from "uuid";

export const getTransations = (req, res) => {
  const userFound = getConnection().data.users.find(
    (user) => user.id === req.params.id
  );

  if (!userFound) res.sendStatus(404);

  const transations = userFound.transactions;
  res.json(transations);
};

export const createTransation = async (req, res) => {
  const { typeTransaction, amount, data, month } = req.body;

  const newTransation = {
    id: v4(),
    typeTransaction: typeTransaction,
    amount: amount,
    data: data,
    month: month,
  };

  try {
    const db = getConnection();
    const userFound = db.data.users.find((user) => user.id === req.params.id);

    if (!userFound) res.sendStatus(404);

    userFound.transactions.push(newTransation);

    db.data.users.map((user) => (user.id === req.params.id ? userFound : user));
    await db.write();
    res.json(userFound);
  } catch (error) {
    return res.status(500).send(error.monthsage);
  }
};
