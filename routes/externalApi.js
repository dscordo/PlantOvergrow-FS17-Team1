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
          headers: { Authorization: "Bearer QkgbbNgJsBvV1IZjMYNpM1oXs1M9j8" },
        });
    console.log("IM HERE inside try", response.data);
    // let result = await response.json();

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
          headers: { Authorization: "Bearer QkgbbNgJsBvV1IZjMYNpM1oXs1M9j8" },
        });
    // console.log("IM HERE inside try", response.data);
    // let result = await response.json();

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


// const getToken = async () => {
//     let url = `https://open.plantbook.io/api/v1/token/`;
//     try {
//         let response = await axios.get(url, {
//         headers: { Authorization: "Bearer EonTkCUPsSuaG4jxQIN3HpOG8NRarW" },
//         });
//       // console.log("IM HERE inside try", response.data);
//       // let result = await response.json();

//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }

// };

// router.get("/getPlantDetail/:pid", async function (req, res) {
//     let result = await getToken();
//     console.log("IM HERE INSE THE ENDPOINT", result);
//     res.send(result);
// });


module.exports = router;