var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const search_utils = require("./utils/search_utils");

router.get("/players/:player_query", async (req, res, next)=>{
    try{
        const players_list = await search_utils.searchPlayers(req.params.player_query);
        res.send(players_list);
    }
    catch(error){
        next(error)
    }
});

module.exports = router;