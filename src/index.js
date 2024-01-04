import app from "./app.js";
import { createConnection } from "./database.js";

createConnection();
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
