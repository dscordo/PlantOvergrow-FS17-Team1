var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async (req, res) => {
  try {
    let results = await db("SELECT * FROM plantinfo ORDER BY id ASC;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
