export type AlbumPage = {
  styles: object
}

const default_page : AlbumPage = {
  styles: {
    backgroundColor: 'lightblue'
  }
}

const ALBUM_PAGES_METADATA = new Map<string, AlbumPage>([
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
    }],
    ['FRA', {
      styles: {
        backgroundColor: '#031583'
      }
    }]
]);

export const ALBUM_PAGES = ["QAT", "MEX", "ARG", "FRA"]

export const DEFAULT_COUNTRY_PAGE = "QAT";

export function getAlbumPage(country: string) : AlbumPage {
  // TODO: no tengo idea de Typescript :)
  // @ts-ignore
  return ALBUM_PAGES_METADATA.has(country) ? ALBUM_PAGES_METADATA.get(country) : default_page;
}
