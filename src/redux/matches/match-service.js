import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getMatches() {
  return await http.get(dbUrl.matches);
}

export async function deleteMatch(match) {
  return await http.delete(`${dbUrl.matches}${match._id}`);
}

export async function postMatch(matchData) {
  return await http.post(`${dbUrl.matches}add/`, matchData);
}

export async function updMatch(matchData) {
  return await http.post(`${dbUrl.matches}update/${matchData._id}`, matchData);
}
