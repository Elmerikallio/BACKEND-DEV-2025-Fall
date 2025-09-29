import express from "express";

import { selfServiceWarehouse } from "./selfServiceWareHouse.js";

const app = express();
const port = 3000;

// app.get("/customers/ids", (req, res) => {
//   const customerIds = Object.keys(selfServiceWarehouse);
//   res.send(`Customer ids: ${customerIds.join(", ")}.`);
// });

app.get("/customers/ids", (req, res) => {
  const customerIds = Object.keys(selfServiceWarehouse);
  const sortOrder = req.query.sort;
  if (sortOrder === "asc") {
    customerIds.sort((a, b) => a.localeCompare(b));
  } else if (sortOrder === "desc") {
    customerIds.sort((a, b) => b.localeCompare(a));
  }
  res.send(`Customer ids: ${customerIds.join(", ")}.`);
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
