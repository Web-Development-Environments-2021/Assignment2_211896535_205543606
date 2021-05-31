const DButils = require("./DButils");
const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const LEAGUE_ID = 271;



async function searchPlayers(player_query){
    try{
        let players_list = [];
        const players_results_array = await axios.get(`${api_domain}/players/search/${player_query}`, {
            params:{
                include: "team.league, position",
                api_token: process.env.api_token,
            },
        });
        let search_query = player_query.split(" ");
        players_results_array.data.data.map((player)=>{
            if (player.team_id != null && player.position != null && player.team.data.league != null){
                if (player.team.data.league.data.id == LEAGUE_ID){
                    if (search_query.length === 1){
                        players_list.push(
                            {
                                player_id: player.player_id,
                                player_full_name: player.fullname,
                                player_team_name: player.team.data.name,
                                player_image: player.image_path,
                                player_position: player.position.data.name         
                            });
                    }
                    else{
                        if(search_query[0] === player.firstname && search_query[1] === player.lastname){
                            players_list.push(
                            {
                                player_id: player.player_id,
                                player_full_name: player.fullname,
                                player_team_name: player.team.data.name,
                                player_image: player.image_path,
                                player_position: player.position.data.name            
                            });
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