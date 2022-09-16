import {IPlayer} from "../components/Sticker";

export function getAlbumData() {
  return [
    {id: 1, name: "Emiliano Martinez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 2, name: "Marcos Acuña", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 3, name: "Nahuel Molina", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 4, name: "Nicolás Otamendi", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 5, name: "Cristian Romero", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200", isInAlbum: true},
    {id: 6, name: "Rodrigo de Paul", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200", isInExchange: true},
    {id: 7, name: "Angel Di Maria", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200", isInAlbum: true, isInExchange: true },
    {id: 8, name: "Giovani Lo Celso", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 9, name: "Leandro Paredes", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 10, name: "Lautaro Martinez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 11, name: "Lionel Messi", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
  ] as IPlayer[]
}
