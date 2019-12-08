import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getMatches() {
  return await http.get(dbUrl.matches);
}

export async function deletePlayer(id) {
  return await http.delete(`${dbUrl.matches}${id}`);
}
