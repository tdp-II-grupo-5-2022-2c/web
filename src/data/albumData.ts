export type AlbumPage = {
  styles: object,
  flagIcon: string
}

const default_page : AlbumPage = {
  styles: {
    backgroundColor: 'rgba(117,169,219,0.5)'
  },
  flagIcon: ''
}

// Iconos de banderas: https://flagicons.lipis.dev/
const ALBUM_PAGES_METADATA = new Map<string, AlbumPage>([
    ['ARG', {
      styles: {
        backgroundColor: "rgba(117,169,219,0.5)"
      },
      flagIcon: 'fi-ar'
    }],
    ['BRA', {
      styles: {
        backgroundColor: 'rgba(232,186,11,0.5)'
      },
      flagIcon: 'fi-br'
    }],
    ['MEX', {
      styles: {
        backgroundColor: 'rgba(57,70,46,0.5)'
      },
      flagIcon: 'fi-mx'
    }],
    ['FRA', {
      styles: {
        backgroundColor: 'rgba(3,21,131,0.5)',
      },
      flagIcon: 'fi-fr'
    }]
]);

const COUNTRIES_MAP = new Map<string,string>([
  ['ARG', 'Argentina'],
  ['MEX', 'Mexico'],
  ['FRA', 'Francia'],
  ['BRA', 'Brasil'],
]);

export enum COUNTRIES {
  Arg = "ARG",
  Mex = "MEX",
  Fra = "FRA",
  Bra = "BRA",
}

export const COUNTRIES_TO_FLAG = new Map<COUNTRIES, string>([
  [COUNTRIES.Arg, 'ar'],
  [COUNTRIES.Mex, 'mx'],
  [COUNTRIES.Fra, 'fr'],
  [COUNTRIES.Bra, 'br'],
]);

export const STRING_TO_ENUM = new Map<string, COUNTRIES>([
  ["ARG", COUNTRIES.Arg],
  ["MEX", COUNTRIES.Mex],
  ["FRA", COUNTRIES.Fra],
  ["BRA", COUNTRIES.Bra],
]);


export const ALBUM_PAGES = ["BRA", "MEX", "ARG", "FRA"]

export const DEFAULT_COUNTRY_PAGE = "ARG";

export function getAlbumPage(country: string) : AlbumPage {
  // TODO: no tengo idea de Typescript :)
  // @ts-ignore
  return ALBUM_PAGES_METADATA.has(country) ? ALBUM_PAGES_METADATA.get(country) : default_page;
}

export function getAlbumCountryName(country: string) : string {
  return COUNTRIES_MAP.get(country) || "";
}
