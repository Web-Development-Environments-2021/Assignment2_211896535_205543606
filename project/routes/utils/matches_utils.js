const DButils = require("./DButils");
//const axios = require("axios");
//const { nextTick } = require("process");

/**
 * This function adds a new match to the Matches table
 * @param {integer} match_id - match's id
 * @param {Date} match_date - the match's date
 * @param {Datetime} match_hour - the match's date and time
 * @param {string} home_team - home team's name
 * @param {string} away_team - away team's name
 * @param {integer} referee_id - referee's id
 * @param {string} stadium - stadium's name
 */
async function addMatch(match_id,match_date,match_hour,home_team,away_team,referee_id,stadium) {
  await DButils.execQuery(
    `insert into Matches values ('${match_id}','${match_date}','${match_hour}','${home_team}','${away_team}','${referee_id}','${stadium}',NULL, NULL)`
  );
}

/**
 * This function gets a date and time and returns the closest future match to it
 * @param {Datetime} CurrentDate - date and time
 */
async function getClosestMatch(CurrentDate) {
  const closest_match = await DButils.execQuery(
    `SELECT TOP 1 match_id, MIN(Matches.match_hour) FROM Matches WHERE Matches.match_hour>='${CurrentDate}' GROUP BY Matches.match_id`
  );
  if (closest_match==null) return null;
  return closest_match;
}

/**
 * This function returns the match_id column from Matches table
 */
async function getMatches() {
  const matches = await DButils.execQuery(
      `SELECT match_id FROM Matches`
  );
  return matches;
}

/**
 * This function returns the result of a given match_id
 * @param {integer} match_id - the id of a match
 */
async function getResultById(match_id) {
  const result = await DButils.execQuery(
    `SELECT result FROM Matches WHERE Matches.match_id ='${match_id}'`
  );
  return result;
}

/**
 * This function gets a match id and returns all of it's events 
 * @param {integer} match_id - id of a match to find it's events
 */
async function getEventsForMatch(match_id){
  const events = await DButils.execQuery(
    `SELECT * FROM EventsCalendar WHERE match_id = '${match_id}'`
  );
  return events;
}

/**
 * This function updates the given match record in Matches table with a given result
 * @param {integer} match_id - the id of the match to add result to
 * @param {string} match_result - the result to add to the given match
 */
async function addResult(match_id,match_result) {
  await DButils.execQuery(
    `UPDATE Matches SET result = '${match_result}' WHERE match_id = '${match_id}'`
  );
}

/**
 * This function adds a new event to a given match
 * @param {integer} event_id - the event id
 * @param {Date} event_date - the event's date
 * @param {Datetime} event_hour - Date and time of the event
 * @param {integer} event_minute - the event's minute of the game
 * @param {string} event_description - description of the event
 * @param {integer} match_id - the match's id
 */
async function addEventCalendar(event_id,event_date,event_hour,event_minute,event_description,match_id) {
  await DButils.execQuery(
    `insert into EventsCalendar values ('${event_id}','${event_date}','${event_hour}','${event_minute}','${event_description}','${match_id}')`
  );
}


async function getMatchPreviewById(match_id) {
  const preview = await DButils.execQuery(
    `SELECT match_date,match_hour,home_team,away_team,stadium FROM Matches WHERE Matches.match_id ='${match_id}'`
  );
  if (preview)
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

/**
 * This function gets an array of matches and return the matches and events.
 *  @param {Array} matches - array of matches to add events to 
 */
async function getMatchesAndEvents(matches){
  let matchesAndEvents = [];
  try{
    await Promise.all(matches.map(async (match)=>{
      // get the events of the current match
      let events = await getEventsForMatch(match.match_id);
      if (events != null && events.length > 0){
        matchesAndEvents.push(
        {
          match: match,
          match_events: events
        }
      )}
      else{
        matchesAndEvents.push(
          {
            match: match
          }
      )}
    }));
    return matchesAndEvents;
  }
  catch(error){
    next(error);
  }
}

/**
 * This function returns all matches (and events if they exist)
 */
async function getAllMatches() {  
    const matches = await DButils.execQuery(
      `select * from Matches`
    );
    return await getMatchesAndEvents(matches);
}

/**
 * This function returns all matches (and events if they exist) sorted by match's date
 */
async function getAllMatchesSortByDate() {
  const matches = await DButils.execQuery(
    `select * from Matches ORDER BY match_date`
  );
  return await getMatchesAndEvents(matches);
}

/**
 * This function returns all matches (and events if they exist) sorted by match's team
 */
async function getAllMatchesSortByTeam() {
  const mathces = await DButils.execQuery(
    `select * from Matches ORDER BY home_team`
  );
  return await getMatchesAndEvents(matches);
}

/**
 * This function returns all past matches (and events if they exist)
 */
async function getPastGames() {
  const today = new Date();
  const matches = await DButils.execQuery(
    `select * from Matches where match_hour<='${today.toISOString()}'`
  );
  return await getMatchesAndEvents(matches);
}

/**
 * This function returns all future games
 */
async function getFutureGames() {
  const today = new Date();
  const mathces = await DButils.execQuery(
    `select match_id,match_date,match_hour,home_team,away_team,referee_id,stadium from Matches where match_hour>'${today.toISOString()}'`
  );
  return mathces;
}

/**
 * This function returns all past matches (and events if they exist) for a given team
 * @param {integer} team_id - the team's id
 */
async function getPastMatchesByTeam(team_id) {
  const today = new Date();
  const matches = await DButils.execQuery(
    `select * from Matches where match_hour<='${today.toISOString()}' and (home_team='${team_id}' or away_team='${team_id}')`
  );
  
  return await getMatchesAndEvents(matches);
}

/**
 * This function returns all future matches for a given team
 * @param {integer} team_id - the team's id
 */
async function getFutureMatchesByTeam(team_id) {
  const today = new Date();
  const mathces = await DButils.execQuery(
    `select match_id,match_date,match_hour,home_team,away_team,referee_id,stadium from Matches where match_hour>'${today.toISOString()}' and (home_team='${team_id}' or away_team='${team_id}')`
  );
  return mathces;
}

/**
 * This function gets an event id and checks if it exists
 * @param {intgegr} event_id - the event's id
 */
async function checkIfEventExist(event_id) {
  const event = await DButils.execQuery(
    `select * from EventsCalendar where event_id ='${event_id}'`
  );
  console.log(event);
  if (event && event.length>0) return true;
  else return false;
}

/**
 * This function gets a match id and checks if it exists
 * @param {intgegr} event_id - the match's id
 */
async function checkIfMatchExist(match_id) {
  const match = await DButils.execQuery(
    `select * from Matches where match_id ='${match_id}'`
  );
  console.log(match);
  if (match && match.length>0) return true;
  else return false;
}
async function checkIfMatchFuture(match_id){
  const match_hour = await DButils.execQuery(
    `select match_hour from Matches where match_id ='${match_id}'`
  ); 
  const today = new Date();
  const match_date = new Date(match_hour[0].match_hour);
    if (match_date > today)
      return true;
    else 
      return false;
  
}

exports.checkIfMatchFuture=checkIfMatchFuture;
exports.checkIfEventExist = checkIfEventExist;
exports.checkIfMatchExist = checkIfMatchExist;
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
exports.getClosestMatch = getClosestMatch;
exports.addMatch = addMatch;
exports.addEventCalendar = addEventCalendar;
exports.getEventsForMatch = getEventsForMatch;
exports.getMatchesAndEvents = getMatchesAndEvents;