var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");
const fs = require('fs/promises');
const path = require('path');

//working
router.get("/", ensureUserLoggedIn, async (req, res) => {
  try {
    let results = await db(
      `SELECT * FROM plantinfo WHERE userid = ${req.userId} ORDER BY id ASC;`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//working
router.get("/:id", ensureUserLoggedIn, async (req, res, next) => {
  let id = req.params.id;
  try {
    let result = await db(
      `SELECT * FROM plantinfo WHERE id = ${id} and userid = ${req.userId};`
    );
    if (result.data.length === 1) {
      res.send(result.data);
    } else {
      res.status(404).send({ error: err.message });
    }
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

//POST - CHECK IF WORKING WITH FILE UPLOAD
router.post("/", ensureUserLoggedIn, async (req, res) => {

  // if req.file - do this
  let {
    pid,
    pname,
    lastwater,
    lastfert,
    lastrepot,
    wfreq,
    fertfreq,
    notes,
    startdate,
  } = req.body;

  let image;
  if(req.files) {
  let { file } = req.files;  

    // Determine from/to paths for moving file to someplace permanent
    let fromPath = file.tempFilePath;
    let toPath = path.join(__dirname, '../public/images/') + file.name;
    await fs.rename(fromPath, toPath);
    image = file.name;
  } else {
    image = req.body.userimage;
  }
  
  let sql = `
  INSERT INTO plantinfo ( userid, pid, pname, lastwater, lastfert, lastrepot, wfreq, fertfreq, notes, userimage, startdate) 
  VALUES ('${req.userId}','${pid}','${pname}','${lastwater}','${lastfert}','${lastrepot}','${wfreq}','${fertfreq}','${notes}','${image}','${startdate}');
`;

  try {

    // await fs.rename(fromPath, toPath);

    await db(sql);

    let result = await db(
      `SELECT * FROM plantinfo WHERE userid = ${req.userId}`
    );

    res.send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message }, "***on catch");
  }
});

//working
router.patch("/:id", ensureUserLoggedIn, async (req, res) => {
  let { id } = req.params;
  let sql = makePatchSql(req.body, id);
  let sqlcheck = `SELECT * FROM plantinfo WHERE id = ${id} AND userid = ${req.userId}`; 
  try {
    let result = await db(sqlcheck);
    if (result.data.length === 0) {
      res.status(404).send({ error: "plant not found!" });
    } else {
      await db(sql);
      let result = await db(
        `select * from plantinfo WHERE id = ${id} AND userid = ${req.userId}`
      );
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
  if ("pname" in body) {
    parts.push(`pname = '${body["pname"]}'`);
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

//CHECK IF WORKING WITH USERID
router.delete("/:id", ensureUserLoggedIn, async (req, res) => {
  let id = req.params.id;
  try {
    let result = await db(
      `SELECT * FROM plantinfo WHERE  id = ${id} and userid = ${req.userId};`
    );

    if (result.data.length === 1) {
      await db(
        `DELETE FROM plantinfo WHERE id = ${id} and userid = ${req.userId};`
      );
      result = await db(
        `SELECT * FROM plantinfo WHERE  id = ${id} and userid = ${req.userId};`
      );
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
