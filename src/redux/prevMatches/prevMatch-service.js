import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getPrevMatches() {
  return await http.get(dbUrl.prevMatches);
}

export async function addToPrevMatches(match) {
  return await http.post(`${dbUrl.prevMatches}add/`, match);
}

export async function deletePrevMatch(id) {
  return await http.delete(`${dbUrl.prevMatches}${id}`);
}
