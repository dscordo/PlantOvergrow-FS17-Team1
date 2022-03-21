var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");

//working
router.get("/", ensureUserLoggedIn, async (req, res) => {
  try {
    let results = await db(`SELECT * FROM wishlist WHERE userid = ${req.userId}  ORDER BY id ASC;`);

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//working
router.get("/:id", ensureUserLoggedIn, async (req, res, next) => {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM wishlist WHERE  id = ${id} and userid = ${req.userId}`);
    if (result.data.length === 1) {
      res.send(result.data);
    } else {
      res.status(404).send({ error: err.message });
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

//CHECK IF WORKING WITH USERID
router.post("/", ensureUserLoggedIn, async (req, res) => {
  let { pid, image_url } = req.body;

  let sql = `
  INSERT INTO wishlist (userid, pid, image_url) 
  VALUES ('${req.userId}','${pid}','${image_url}');
`;

  try {
    await db(sql);

    let result = await db(`SELECT * FROM wishlist WHERE userid = ${req.userId};`);

    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message }, "***on catch");
  }
});

//CHECK IF WORKING WITH USERID
router.patch("/:id", ensureUserLoggedIn, async (req, res) => {
  let id = req.params.id;
  let { notes } = req.body;
  let sqlCheckID = `SELECT * FROM wishlist WHERE id = ${id} and userid = ${req.userId}`;
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

//CHECK IF WORKING WITH USERID
router.delete("/:id", ensureUserLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM wishlist WHERE  id = ${id} and userid = ${req.userId}`);

    if (result.data.length === 1) {
      await db(`DELETE FROM wishlist WHERE id = ${id} and userid = ${req.userId}`);
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
