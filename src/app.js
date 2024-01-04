import express from "express";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import transationRoutes from "./routes/transations-routes.js";
import balanceRoutes from "./routes/balance-routes.js";
import { validateToken } from "./validators.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(transationRoutes);
app.use(balanceRoutes);
app.use(/^(?!\/(users|transactions|balance)).*$/, validateToken);

export default app;
