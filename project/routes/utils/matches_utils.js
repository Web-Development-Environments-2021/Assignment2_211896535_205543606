const DButils = require("./DButils");
const axios = require("axios");


async function addMatch(match_id,match_date,match_hour,home_team,away_team,match_referee,match_stadium) {
  await DButils.execQuery(
    `insert into Matches values ('${match_id}','${match_date}','${match_hour}','${home_team}','${away_team}','${match_referee}','${match_stadium}',NULL,NULL)`
  );
}

//should fix
async function getClosetMatch(CurrentDate) {
  const closest_match = await DButils.execQuery(
    `SELECT TOP 1 match_id, MIN(Matches.match_hour) FROM Matches WHERE Matches.match_hour>='${CurrentDate}' GROUP BY Matches.match_id`
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
  return preview[0]; //only one game not an table
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

async function getAllMatches() {
  const mathces = await DButils.execQuery(
    `select * from Matches`
  );
  return mathces;
}

async function getAllMatchesSortByDate() {
  const mathces = await DButils.execQuery(
    `select * from Matches ORDER BY match_date`
  );
  return mathces;
}


async function getAllMatchesSortByTeam() {
  const mathces = await DButils.execQuery(
    `select * from Matches ORDER BY home_team`
  );
  return mathces;
}


async function getPastGames() {
  const today = new Date();
  const mathces = await DButils.execQuery(
    `select * from Matches where match_hour<='${today.toISOString()}'`
  );
  return mathces;
}
async function getFutureGames() {
  const today = new Date();
  const mathces = await DButils.execQuery(
    `select match_id,match_date,match_hour,home_team,away_team,referee_id,stadium from Matches where match_hour>'${today.toISOString()}'`
  );
  return mathces;
}

async function getPastMatchesByTeam(team_id) {
  const today = new Date();
  const mathces = await DButils.execQuery(
    `select * from Matches where match_hour<='${today.toISOString()}' and (home_team='${team_id}' or away_team='${team_id}')`
  );
  return mathces;
}
async function getFutureMatchesByTeam(team_id) {
  const today = new Date();
  const mathces = await DButils.execQuery(
    `select match_id,match_date,match_hour,home_team,away_team,referee_id,stadium from Matches where match_hour>'${today.toISOString()}' and (home_team='${team_id}' or away_team='${team_id}')`
  );
  return mathces;
}
exports.getFutureMatchesByTeam = getFutureMatchesByTeam;
exports.getPastMatchesByTeam = getPastMatchesByTeam;
exports.getFutureGames = getFutureGames;
exports.getPastGames = getPastGames;
exports.getAllMatches=getAllMatches;
exports.getAllMatchesSortByDate=getAllMatchesSortByDate;
exports.getAllMatchesSortByTeam = getAllMatchesSortByTeam;
exports.getMatchesInfo= getMatchesInfo;
exports.getMatchPreviewById = getMatchPreviewById;
exports.addResult = addResult;
exports.getResultById = getResultById;
exports.getMatches = getMatches;
exports.getClosetMatch = getClosetMatch;
exports.addMatch = addMatch;