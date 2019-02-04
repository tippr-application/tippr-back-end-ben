const express = require("express");
const route = express.Router();
const db = require("../../data/dbConfig");

route.get("/", async (req, res) => {
  try {
    const workers = await db("workers");
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const worker = await db("workers")
      .where({ id })
      .first();
    res.status(200).json(worker);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.post("/", async (req, res) => {
  const newWorker = req.body;
  try {
    const result = await db("workers").insert(newWorker);
    res
      .status(201)
      .json({ message: `worker created with the id of ${result}` });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const chosen = await db("workers")
      .where({ id })
      .first();
    if (chosen) {
      const updateId = await db("workers")
        .where({ id })
        .first()
        .update(change);
      res.status(202).json({
        message: `worker with the id of ${updateId} has been updated`
      });
    } else {
      res.status(404).json({ message: "worker not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = route;
