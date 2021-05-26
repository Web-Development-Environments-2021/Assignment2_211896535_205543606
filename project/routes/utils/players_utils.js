const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const teams_utils = require("./teams_utils");
// const TEAM_ID = "85";

async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}

function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
    };
  });
}

async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}

// OUR NEW FUNCTIONS
async function getPlayerDetailsById(player_id){
  const player = await axios.get(
    `${api_domain}/players/${player_id}`,
    {
      params: {
        api_token: process.env.api_token
      },
    }
  );
  const team_name= await teams_utils.getTeamNameByID(player.data.data.team_id);
  return {
    player_full_name: player.data.data.fullname,
    player_team:team_name,
    player_image: player.data.data.image_path,
    player_position:player.data.data.position_id,
    player_common_name:player.data.data.common_name,
    player_nationality:player.data.data.nationality,
    player_birthdate:player.data.data.birthdate,
    player_height:player.data.data.height,
    player_weight:player.data.data.weight
  };
}
  

exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getPlayerDetailsById = getPlayerDetailsById;
