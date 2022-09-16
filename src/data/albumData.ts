import {getArgentinaPlayersData, getMexicoPlayersData} from "./playersData";
import {ITeam} from "../routes/MyAlbum";

export function getAlbumData() {
  return [
        {
          players: getArgentinaPlayersData(),
          country: "Argentina",
          pageNumber: 1,
        },
        {
          players: getMexicoPlayersData(),
          country: "Mexico",
          pageNumber: 2,
        }
      ] as ITeam[]
}
