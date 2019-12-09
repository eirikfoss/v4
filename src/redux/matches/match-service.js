import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getMatches() {
  return await http.get(dbUrl.matches);
}

export async function deleteMatch(id) {
  return await http.delete(`${dbUrl.matches}${id}`);
}

export async function postMatch(matchData) {
  return await http.post("http://localhost:5000/matches/add/", matchData);
}

export async function updateMatch(matchData, matchId) {}
