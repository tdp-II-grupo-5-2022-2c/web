import {getArgentinaPlayersData, getMexicoPlayersData, getQatarPlayersData} from "./playersData";
import {ITeam} from "../routes/MyAlbum";

export type AlbumPage = {
  styles: object
}

const default_page : AlbumPage = {
  styles: {
    backgroundColor: 'lightblue'
  }
}

const album_pages = new Map<string, AlbumPage>([
    ['ARG', {
      styles: {
        backgroundColor: '#75a9db'
      }
    }],
    ['QAT', {
      styles: {
        backgroundColor: '#76273f'
      }
    }],
    ['MEX', {
      styles: {
        backgroundColor: '#39462e'
      }
    }]
]);

export const DEFAULT_COUNTRY_PAGE = "QAT";

export function getAlbumPages() : Map<number, string> {
  return new Map<number, string>([
    [1, "QAT"],
    [2, "ARG"],
    [3, "MEX"]
  ]);
}

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

export function getAlbumPage(country: string) : AlbumPage {
  // TODO: no tengo idea de Typescript :)
  // @ts-ignore
  return album_pages.has(country) ? album_pages.get(country) : default_page;
}
