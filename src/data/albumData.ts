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

export enum ECOUNTRIES {
  Arg = "ARG",
  Ksa = "KSA",
  Mex = "MEX",
  Pol = "POL",
}

export const COUNTRIES = {
  ARG: "ARG",
  KSA: "KSA",
  MEX: "MEX",
  POL: "POL",
}

// Iconos de banderas: https://flagicons.lipis.dev/
const ALBUM_PAGES_METADATA = new Map<string, AlbumPage>([
    [COUNTRIES.ARG, {
      styles: {
        backgroundColor: "rgba(117,169,219,0.5)"
      },
      flagIcon: 'fi-ar'
    }],
    [COUNTRIES.KSA, {
      styles: {
        backgroundColor: 'rgba(21, 97, 55, 0.8)'
      },
      flagIcon: 'fi-sa'
    }],
    [COUNTRIES.MEX, {
      styles: {
        backgroundColor: 'rgba(57,70,46,0.5)'
      },
      flagIcon: 'fi-mx'
    }],
    [COUNTRIES.POL, {
      styles: {
        backgroundColor: 'rgba(226, 4, 4, 0.8)',
      },
      flagIcon: 'fi-pl'
    }]
]);

export const COUNTRIES_MAP = new Map<string,string>([
  [COUNTRIES.ARG, 'Argentina'],
  [COUNTRIES.KSA, 'Arabia Saudita'],
  [COUNTRIES.MEX, 'Mexico'],
  [COUNTRIES.POL, 'Polonia'],
]);

export const COUNTRIES_NAMES = {
  ARG: 'Argentina',
  KSA: 'Arabia Saudita',
  MEX: 'Mexico',
  POL: 'Polonia',
  ALL: 'Todos',
}

export const COUNTRIES_TO_FLAG = new Map<ECOUNTRIES, string>([
  [ECOUNTRIES.Arg, 'ar'],
  [ECOUNTRIES.Ksa, 'sa'],
  [ECOUNTRIES.Mex, 'mx'],
  [ECOUNTRIES.Pol, 'pl'],
]);

export const STRING_TO_ENUM = new Map<string, ECOUNTRIES>([
  ["ARG", ECOUNTRIES.Arg],
  ["KSA", ECOUNTRIES.Ksa],
  ["MEX", ECOUNTRIES.Mex],
  ["POL", ECOUNTRIES.Pol],
]);


export const ALBUM_PAGES = [COUNTRIES.ARG, COUNTRIES.KSA, COUNTRIES.MEX, COUNTRIES.POL]

export const DEFAULT_COUNTRY_PAGE = COUNTRIES.ARG;

export function getAlbumPage(country: string) : AlbumPage {
  return ALBUM_PAGES_METADATA.get(country) || default_page;
}

export function getAlbumCountryName(country: string) : string {
  return COUNTRIES_MAP.get(country) || "";
}
