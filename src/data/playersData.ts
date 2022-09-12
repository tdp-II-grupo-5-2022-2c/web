import {IPlayer} from "../components/Sticker";

export function getPlayersData() {
  return [
    {id: 1, name: "Lionel Messi", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 2, name: "Paulo Dybala", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200", isInAlbum: true},
    {id: 3, name: "Emiliano Martinez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200", isInExchange: true},
    {id: 4, name: "Julían Alvarez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200", isInAlbum: true, isInExchange: true },
    {id: 5, name: "Angel Di Maria", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 6, name: "Lisandro Martinez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 7, name: "Lautaro Martinez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
    {id: 8, name: "Rodrigo De Paul", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Argentina", image: "https://picsum.photos/300/200"},
  ] as IPlayer[]
}
