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

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Usuário já existe!" });
  }

  customers.push({ id: uuuidv4(), cpf, name, statement: [] });

  return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Usuário não existe" });
  }

  return response.json(customer.statement);
});

app.get("/health", (request, response) => {
  return response.status(202).json({ msg: "Status ok!" });
});
