const DButils = require("./DButils");

//----->ADD MATCHES<------//
async function addMatch(match_id,match_date,match_hour,home_team,away_team,match_referee,match_stadium) {
  await DButils.execQuery(
    `insert into Matches values ('${match_id}','${match_date}','${match_hour}','${home_team}','${away_team}','${match_referee}','${match_stadium}',NULL,NULL)`
  );
}

async function getClosetMatch(CurrentDate) {
  await DButils.execQuery(
    `SELECT TOP 1 * FROM Matches WHERE Matches.match_date <'${CurrentDate}' ORDER BY Matches.match_date DESC`
  );
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
exports.addResult = addResult;
exports.getResultById = getResultById;
exports.getMatches = getMatches;
exports.getClosetMatch = getClosetMatch;
exports.addMatch = addMatch;