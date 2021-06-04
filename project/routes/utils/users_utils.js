const DButils = require("./DButils");
const matches_utils = require("./matches_utils");

async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into FavoritePlayers values ('${user_id}',${player_id})`
  );
}

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select player_id from FavoritePlayers where username='${user_id}'`
  );
  return player_ids;
}

async function markMatchAsFavorite(user_id, match_id) {
  await DButils.execQuery(
    `insert into FavoriteMatches values ('${user_id}',${match_id})`
  );
}

async function getFavoriteMatches(user_id) {
  const match_ids = await DButils.execQuery(
    `select match_id from FavoriteMatches where username='${user_id}'`
  );
  let future_matches =[];
  for (match_id in match_ids){
    if (await matches_utils.checkIfMatchFuture(match_ids[match_id].match_id))
      future_matches.push(match_ids[match_id].match_id)
  } 
  return future_matches;
}

async function getUpTo3favoriteMatches(user_id) {
  const match_ids = await DButils.execQuery(
    `select TOP 3 match_id from FavoriteMatches where username='${user_id}'`
  );
  return match_ids;
}

async function markTeamAsFavorite(user_id, team_id) {
  await DButils.execQuery(
    `insert into FavoriteTeams values ('${user_id}',${team_id})`
  );
}

async function getFavoriteTeams(user_id) {
  const team_ids = await DButils.execQuery(
    `select team_id from FavoriteTeams where username='${user_id}'`
  );
  return team_ids;
}

exports.getUpTo3favoriteMatches = getUpTo3favoriteMatches;
exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;
exports.getFavoriteMatches = getFavoriteMatches;
exports.markMatchAsFavorite = markMatchAsFavorite;
exports.getFavoriteTeams = getFavoriteTeams;
exports.markTeamAsFavorite = markTeamAsFavorite;
