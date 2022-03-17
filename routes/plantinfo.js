var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");

//working
router.get("/", ensureUserLoggedIn, async (req, res) => {
  try {
    let results = await db("SELECT * FROM plantinfo ORDER BY id ASC;");

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//working
router.get("/:id", ensureUserLoggedIn, async (req, res, next) => {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM plantinfo WHERE  id = ${id}`);
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
router.post("/", ensureUserLoggedIn, async (req, res) => {
  let {
    userid,
    pid,
    lastwater,
    lastfert,
    lastrepot,
    notes,
    userimage,
    startdate,
  } = req.body;

  let sql = `
  INSERT INTO plantinfo (userid, pid, lastwater, lastfert, lastrepot, notes, userimage, startdate) 
  VALUES ('${userid}','${pid}','${lastwater}','${lastfert}','${lastrepot}','${notes}','${userimage}','${startdate}');
`;

  try {
    await db(sql);

    let result = await db("SELECT * FROM plantinfo");

    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message }, "***on catch");
  }
});

//working
router.patch("/:id", ensureUserLoggedIn, async (req, res) => {
  let { id } = req.params;
  let sql = makePatchSql(req.body, id);
  let sqlcheck = `SELECT * FROM plantinfo WHERE id = ${id}`;
  try {
    let result = await db(sqlcheck);
    if (result.data.length === 0) {
      res.status(404).send({ error: "plant not found!" }); //sending me here after patch
    } else {
      await db(sql);
      let result = await db("select * from plantinfo");
      res.status(201).send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PATCH helper function
function makePatchSql(body, id) {
  let parts = [];

  if ("pid" in body) {
    parts.push(`pid = '${body["pid"]}'`);
  }
  if ("lastwater" in body) {
    parts.push(`lastwater = NOW()`);
  }
  if ("lastfert" in body) {
    parts.push(`lastfert = NOW()`);
  }
  if ("lastrepot" in body) {
    parts.push(`lastrepot = NOW()`);
  }
  if ("notes" in body) {
    parts.push(`notes = '${body["notes"]}'`);
  }
  if ("userimage" in body) {
    parts.push(`userimage = '${body["userimage"]}'`);
  }
  if ("startdate" in body) {
    parts.push(`startdate = '${body["startdate"]}'`);
  }

  let sql = "UPDATE plantinfo SET ";
  sql += parts.join(", ");
  sql += ` WHERE id = ${id}`;

  return sql;
}

//working
router.delete("/:id", ensureUserLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    let result = await db(`SELECT * FROM plantinfo WHERE  id = ${id}`);

    if (result.data.length === 1) {
      await db(`DELETE FROM plantinfo WHERE id = ${id}`);
      result = await db("SELECT * FROM plantinfo");
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
