const DButils = require("./DButils");
const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const teams_utils = require("./teams_utils");
const players_utils = require("./players_utils");


async function searchPlayers(player_query){
    try{
        let players_list = [];
        const players_results_array = await axios.get(`${api_domain}/players/search/${player_query}`, {
            params:{
                include: team,
                api_token: process.env.api_token,
            },
        });
        let search_query = player_query.split(" ");
        players_results_array.data.data.map((player)=>{
            if (player.team_id != null){
                console.log(player.team_id);
                if (search_query.length === 1){
                    players_list.push(
                        {
                            player_id: player.player_id,
                            player_full_name: player.fullname,
                            //player_team_name: player.team.data.name,
                            player_team_name: player.team_id,
                            player_image: player.image_path,
                            player_position: player.position_id            
                        });
                }
                else{
                    if(search_query[0] === player.firstname && search_query[1] === player.lastname){
                        players_list.push(
                        {
                            player_id: player.player_id,
                            player_full_name: player.fullname,
                            //player_team_name: player.team.data.name,
                            player_team_name: player.team_id,
                            player_image: player.image_path,
                            player_position: player.position_id            
                        });
                    }
                }
            }
        });
        return players_list;
    }
    catch{
        return "one or more of the players do not exist!"
    }
}

exports.searchPlayers = searchPlayers;