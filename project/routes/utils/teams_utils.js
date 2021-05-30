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

//should add additional information maybe, not only name
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



async function getCoachByTeam(team_id){
  try{
    const team = await axios.get(
      `${api_domain}/teams/${team_id}`,
      {
        params: {
          api_token: process.env.api_token,
          include: "coach"
        },
      }
    );
    return team.data.data.coach;
  }
  catch{
    return "team not found in API";
  }  
}

async function checkIfTeamExist(team_id) {
  try{
    await axios.get(
      `${api_domain}/teams/${team_id}`,
      {
        params: {
          api_token: process.env.api_token
        },
      }
    );
    return true;
  }
  catch{
    return false;
  }
}
exports.checkIfTeamExist = checkIfTeamExist;
exports.getCoachByTeam = getCoachByTeam;
exports.getTeamNameByID = getTeamNameByID;
exports.getTeamsInfo =getTeamsInfo;