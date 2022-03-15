var express = require("express");
var router = express.Router();
const db = require("../model/helper");
//working
router.get("/", async (req, res) => {
  try {
    let results = await db("SELECT * FROM wishlist ORDER BY id ASC;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//working
router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM wishlist WHERE  id = ${id}`);
    if (result.data.length === 1) {
      res.send(result.data);
    } else {
      res.status(404).send({ error: err.message });
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});
//working
router.post("/", async (req, res) => {
  let { userid, pid, notes } = req.body;

  let sql = `
  INSERT INTO wishlist (userid, pid, notes) 
  VALUES ('${userid}','${pid}','${notes}');
`;

  try {
    await db(sql);

    let result = await db("SELECT * FROM wishlist");

    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message }, "***on catch");
  }
});
//working for notes and we don't need anymore.
router.patch("/:id", async (req, res) => {
  let id = req.params.id;
  let { notes } = req.body;
  let sqlCheckID = `SELECT * FROM wishlist WHERE id = ${id}`;
  let sqlUpdate = `UPDATE wishlist SET notes = '${notes}' WHERE id = ${id}`;

  try {
    let result = await db(sqlCheckID);
    if (result.data.length === 0) {
      res.status(404).send({ error: "plant not found!" });
    } else {
      await db(sqlUpdate);
      let result = await db("SELECT * FROM wishlist");
      res.status(201).send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//working
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM wishlist WHERE  id = ${id}`);

    if (result.data.length === 1) {
      await db(`DELETE FROM wishlist WHERE id = ${id}`);
      result = await db("SELECT * FROM wishlist");
      res.send(result.data);
    } else {
      res
        .status(404)
        .send({ error: "Item not found, we don't have a plant with that id" });
    }
  } catch (err) {
    res.status(500).send("catch error on delete", { error: err.message });
  }
});
module.exports = router;
