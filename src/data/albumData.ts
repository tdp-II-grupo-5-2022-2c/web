import {getArgentinaPlayersData, getMexicoPlayersData, getQatarPlayersData} from "./playersData";
import {ITeam} from "../routes/MyAlbum";

export function getAlbumData() {

  return [
    {
      players: getQatarPlayersData(),
      country: "Qatar",
      pageNumber: 1,
    },
    {
      players: getArgentinaPlayersData(),
      country: "Argentina",
      pageNumber: 2,
    },
    {
      players: getMexicoPlayersData(),
      country: "Mexico",
      pageNumber: 3,
    },
  ] as ITeam[]
}
