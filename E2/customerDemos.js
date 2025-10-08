import express from "express";

import { selfServiceWarehouse } from "./selfServiceWareHouse.js";

const app = express();
const port = 3000;

// app.get("/customers/ids", (req, res) => {
//   const customerIds = Object.keys(selfServiceWarehouse);
//   res.send(`Customer ids: ${customerIds.join(", ")}.`);
// });

const logRequestInfo = (req, res, next) => {
  const { method, url, params, query } = req;
  console.log(`
    Request Method: ${method},
    Request URL: ${url}
    Request Params: ${JSON.stringify(params)}
    Request Query: ${JSON.stringify(query)}
  `);
  next();
};

//app.use(logRequestInfo);

app.get("/customers/ids", logRequestInfo, (req, res) => {
  const customerIds = Object.keys(selfServiceWarehouse);
  const sortOrder = req.query.sort;
  if (sortOrder === "asc") {
    customerIds.sort((a, b) => a.localeCompare(b));
  } else if (sortOrder === "desc") {
    customerIds.sort((a, b) => b.localeCompare(a));
  }
  res.send(`Customer ids: ${customerIds.join(", ")}.`);
});

app.get("/customers/:customerId", logRequestInfo, (req, res) => {
  const customerId = req.params.customerId;
  const customer = selfServiceWarehouse[customerId];
  if (customer) {
    res.send(customer);
  } else {
    res.send(`Customer with id ${customerId} not found.`);
  }
});

app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
