import express from "express";

import { selfServiceWareHouse } from "./selfServiceWareHouse.js";

const app = express();
const port = 3000;

app.get("/customers/ids", (req, res) => {
  const customerIds = Object.keys(selfServiceWareHouse);
  res.send(`Customer ids: ${customerIds.join(", ")}.`);
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
