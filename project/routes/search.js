var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const search_utils = require("./utils/search_utils");

router.get("/players/:player_query", async (req, res, next)=>{
    try{
        const players_list = await search_utils.searchPlayers(req.params.player_query);
        // On client side we will check if it's empty
        if (typeof players_list === 'string' || players_list instanceof String){
            res.status(404).send(players_list);
        }
        else{
            res.status(200).send(players_list);
        }
    }
    catch(error){
        next(error)
    }
});

router.get("/teams/:team_query", async (req, res, next)=>{
    try{
        const teams_list = await search_utils.searchTeams(req.params.team_query);
        // On client side we will check if it's empty
        if (typeof teams_list === 'string' || teams_list instanceof String){
            res.status(404).send(teams_list);
        }
        else{
            res.status(200).send(teams_list);
        }
    }
    catch(error){
        next(error)
    }
});

module.exports = router;