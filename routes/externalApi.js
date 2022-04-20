var express = require("express");
var router = express.Router();
const axios = require("axios");
const apiToken = process.env.ACCESS_TOKEN;


const getPlants = async (plantName) => {
    plantName.replace(/\s/g, "%20");
    let url = `https://open.plantbook.io/api/v1/plant/search?alias=${plantName}`;
    try {
        console.log("url", url);
        let response = await axios.get(url, {
          headers: { Authorization: "Bearer " }, //API token here
        });
    console.log("IM HERE inside try", response.data);
   

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

router.get("/getPlants/:plant", async function (req, res) {
    console.log("REQ params", req.params.plant);
    let result = await getPlants(req.params.plant);
    console.log("IM HERE INSE THE ENDPOINT", result);
    res.send(result);
});


const getPlantDetail = async (pid) => {
    
    let url = `https://open.plantbook.io/api/v1/plant/detail/${pid}/`;
    try {
        let response = await axios.get(url, {
          headers: { Authorization: "Bearer " },//API token here
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

router.get("/getPlantDetail/:pid", async function (req, res) {
    console.log("REQ params", req.params.pid);
    let result = await getPlantDetail(req.params.pid);
    console.log("IM HERE INSE THE ENDPOINT", result);
    res.send(result);
});


module.exports = router;