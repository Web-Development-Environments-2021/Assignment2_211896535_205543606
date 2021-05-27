const DButils = require("./DButils");

//----->ADD MATCHES<------//
async function addMatch(match_id,match_date,match_hour,home_team,away_team,match_referee,match_stadium) {
  await DButils.execQuery(
    `insert into Matches values ('${match_id}','${match_date}','${match_hour}','${home_team}','${away_team}','${match_referee}','${match_stadium}',null,null)`
  );
}
exports.addMatch = addMatch