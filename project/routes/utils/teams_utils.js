const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


async function getTeamNameByID(team_id){
  try{
    const team = await axios.get(
      `${api_domain}/teams/${team_id}`,
      {
        params: {
          api_token: process.env.api_token
        },
      }
    );
    return team.data.data.name;
  }
  catch{
    return "team not found in API";
  }
    
  }

async function getTeamsInfo(team_ids_array){
  let promises = [];
  team_ids_array.map((id) =>
    promises.push(
      getTeamNameByID(id)
    )
  );
  let teams_info = await Promise.all(promises);
  return teams_info;
}
    
exports.getTeamNameByID = getTeamNameByID;
exports.getTeamsInfo =getTeamsInfo;