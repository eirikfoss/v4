import http from "../../http-service";
import { dbUrl } from "../../api-config";

export async function getPlayers() {
  return await http.get(dbUrl.players);
}

export async function deletePlayer(id) {
  return await http.delete(`${dbUrl.players}${id}`);
}
