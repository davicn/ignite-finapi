const { response, request } = require("express");
const express = require("express");
const { v4: uuuidv4 } = require("uuid");

const app = express();

app.use(express.json());

app.listen(3333, () => {
  console.log("Server ON!");
});

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const id = uuuidv4();

  customers.push({ id, cpf, name });

  return response.status(201).send();
});

app.get("/health", (request, response) => {
  return response.status(202).json({ msg: "Status ok!" });
});
