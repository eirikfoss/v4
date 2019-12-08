import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getMatches() {
  return await http.get(dbUrl.matches);
}

export async function deleteMatch(id) {
  return await http.delete(`${dbUrl.matches}${id}`);
}

export async function postMatch(matchData) {
  const teams = matchData.teams;
  const location = matchData.location;

  const matchOver = matchData.matchOver;

  return await http.post("http://localhost:5000/matches/add/", {
    location,
    teams,
    matchOver
  });
}
