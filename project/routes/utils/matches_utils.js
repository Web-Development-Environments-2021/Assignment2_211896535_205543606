const DButils = require("./DButils");
const axios = require("axios");


//----->ADD MATCHES<------//
async function addMatch(match_id,match_date,match_hour,home_team,away_team,match_referee,match_stadium) {
  await DButils.execQuery(
    `insert into Matches values ('${match_id}','${match_date}','${match_hour}','${home_team}','${away_team}','${match_referee}','${match_stadium}',NULL,NULL)`
  );
}

//should fix
async function getClosetMatch(CurrentDate) {
  const closest_match = await DButils.execQuery(
    `SELECT TOP 1 match_id, MIN(match_hour) FROM Matches GROUP BY match_id`
  );
  return closest_match;
}

async function getMatches() {
  const matches = await DButils.execQuery(
      `SELECT match_id FROM Matches`
  );
  return matches;
}

async function getResultById(match_id) {
  const result = await DButils.execQuery(
    `SELECT result FROM Matches WHERE Matches.match_id ='${match_id}'`
  );
  return result;
}

async function addResult(match_id,match_result) {
  await DButils.execQuery(
    `UPDATE Matches SET result = '${match_result}' WHERE match_id = '${match_id}'`

  );
}

async function getMatchPreviewById(match_id) {
  const preview = await DButils.execQuery(
    `SELECT match_date,match_hour,home_team,away_team,stadium FROM Matches WHERE Matches.match_id ='${match_id}'`
  );
  return preview;
}

async function getMatchesInfo(matches_ids_list) {
  let promises = [];
  matches_ids_list.map((id) =>
    promises.push(
      getMatchPreviewById(id)
    )
  );
  let macthes_info = await Promise.all(promises);
  return macthes_info;
}

exports.getMatchesInfo= getMatchesInfo;
exports.getMatchPreviewById = getMatchPreviewById;
exports.addResult = addResult;
exports.getResultById = getResultById;
exports.getMatches = getMatches;
exports.getClosetMatch = getClosetMatch;
exports.addMatch = addMatch;