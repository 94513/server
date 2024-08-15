// server.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
 
app.use(bodyParser.json());
 
// In-memory storage for items
let items = [];
let nextId = 1;
 
// Define routes
app.post("/items", (req, res) => {
  const newItem = { id: nextId++, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});
 
app.get("/items", (req, res) => {
  res.json(items);
});
 
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  res.json(item);
});
 
app.put("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  items[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(items[index]);
});
 
app.delete("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  items.splice(index, 1);
  res.status(204).send();
});
 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});