const DButils = require("./DButils");
const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const LEAGUE_ID = 271;


/**
 * This function gets a player query and returns the list of player match the query
 * @param {string} player_query - player's name query
 */
async function searchPlayers(player_query){
    try{
        let players_list = [];
        const players_results_array = await axios.get(`${api_domain}/players/search/${player_query}`, {
            params:{
                include: "team.league, position",
                api_token: process.env.api_token,
            },
        });
        // If name is 1 word or 2
        let search_query = player_query.split(" ");
        players_results_array.data.data.map((player)=>{
            if (player.team_id != null && player.position != null && player.team.data.league != null){
                if (player.team.data.league.data.id == LEAGUE_ID){
                    if (search_query.length === 1){
                        addPlayerToArray(players_list, player);
                    }
                    else{
                        if(search_query[0] === player.firstname && search_query[1] === player.lastname){
                            addPlayerToArray(players_list, player);
                        }
                    }
                }
            }
        });
        return players_list;
    }
    catch{
        return "There seems to be a problem searching players"
    }
}

/**
 * This function gets a player query and returns the list of player match the query
 * @param {string} player_query - player's name query
 * @param {string} position_query - position's name query
 */
async function searchPlayersFilterPos(player_query, position_query){
    try{
        let players_list = [];
        const players_results_array = await axios.get(`${api_domain}/players/search/${player_query}`, {
            params:{
                include: "team.league, position",
                api_token: process.env.api_token,
            },
        });
        // If name is 1 word or 2
        let search_query = player_query.split(" ");
        players_results_array.data.data.map((player)=>{
            if (player.team_id != null && player.position != null && player.team.data.league != null){
                cur_player_pos = player.position.data.name;
                if (player.team.data.league.data.id == LEAGUE_ID && cur_player_pos == position_query){
                    if (search_query.length === 1){
                        addPlayerToArray(players_list, player);
                    }
                    else{
                        if(search_query[0] === player.firstname && search_query[1] === player.lastname){
                            addPlayerToArray(players_list, player);
                        }
                    }
                }
            }
        });
        return players_list;
    }
    catch{
        return "There seems to be a problem searching players"
    }
}

/**
 * This function gets a player query and returns the list of player match the query
 * @param {string} player_query - player's name query
 * @param {string} team_query - team's name query
 */
async function searchPlayersFilterTeam(player_query, team_query){
    try{
        let players_list = [];
        const players_results_array = await axios.get(`${api_domain}/players/search/${player_query}`, {
            params:{
                include: "team.league, position",
                api_token: process.env.api_token,
            },
        });
        // If name is 1 word or 2
        let search_query = player_query.split(" ");
        players_results_array.data.data.map((player)=>{
            if (player.team_id != null && player.position != null && player.team.data.league != null){
                cur_player_team = player.team.data.name;
                if (player.team.data.league.data.id == LEAGUE_ID && cur_player_team == team_query){
                    if (search_query.length === 1){
                        addPlayerToArray(players_list, player);
                    }
                    else{
                        if(search_query[0] === player.firstname && search_query[1] === player.lastname){
                            addPlayerToArray(players_list, player);
                        }
                    }
                }
            }
        });
        return players_list;
    }
    catch{
        return "There seems to be a problem searching players"
    }
}

/**
 * This function gets an array and pushes a player to it for search results
 * @param {Array} players_arr 
 * @param {Object} player 
 */
function addPlayerToArray(players_arr, player){
    players_arr.push(
        {
            player_id: player.player_id,
            player_full_name: player.fullname,
            player_team_name: player.team.data.name,
            player_image: player.image_path,
            player_position: cur_player_pos         
    });
}


/**
 * This function gets a team query and returns the list of teams match the query 
 * @param {string} team_query - team's name query
 */
async function searchTeams(team_query){
    try{
        let teams_list = [];
        const teams_results_array = await axios.get(`${api_domain}/teams/search/${team_query}`, {
            params:{
                include: "league",
                api_token: process.env.api_token,
            },
        });
        teams_results_array.data.data.map((team)=>{
            if(team.league.data.id == LEAGUE_ID){
                teams_list.push({
                    team_id: team.id,
                    team_name: team.name,
                    team_logo: team.logo_path
                });
            }
        });
        return teams_list;
    }
    catch{
        return "There seems to be a problem searching teams"
    }
}

exports.searchPlayers = searchPlayers;
exports.searchTeams = searchTeams;
exports.searchPlayersFilterPos = searchPlayersFilterPos;
exports.searchPlayersFilterTeam = searchPlayersFilterTeam;