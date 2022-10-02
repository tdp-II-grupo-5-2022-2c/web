import {IBackEndSticker, IPlayer} from "../components/Sticker";
import {ISlicedPlayer} from "../components/StickerPlaceHolder";

export function getArgentinaPlayersData() {
  return [
    {id: 1, name: "Emiliano Martinez", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 2, name: "Marcos Acuña", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 3, name: "Nahuel Molina", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 4, name: "Nicolás Otamendi", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 5, name: "Cristian Romero", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1, is_on_album: true},
    {id: 6, name: "Rodrigo de Paul", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 7, name: "Angel Di Maria", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1 },
    {id: 8, name: "Giovani Lo Celso", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 9, name: "Leandro Paredes", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 10, name: "Lautaro Martinez", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
    {id: 11, name: "Lionel Messi", country: "Argentina", image: "https://picsum.photos/300/200", quantity:1},
  ] as IBackEndSticker[]
}

export function getMexicoPlayersData() {
  return [
    {id: 12, name: "Guillermo Ochoa", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 13, name: "Néstor Araújo", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 14, name: "Jesús Gallardo", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 15, name: "César Montes", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 16, name: "Jorge Sánchez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200", isInAlbum: true},
    {id: 17, name: "Edson Alvarez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200", isInExchange: true},
    {id: 18, name: "Jesús Manuel Corona", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200", isInAlbum: true, isInExchange: true },
    {id: 19, name: "Héctor Herrera", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 20, name: "Carlos Rodriguez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 21, name: "Raúl Jiménez", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
    {id: 22, name: "Hirving Lozano", dateOfBirth: new Date(), weight: 72, height: 170,  position: "CF", country: "Mexico", image: "https://picsum.photos/300/200"},
  ] as IPlayer[]
}

export function getQatarPlayersData() {
  const country = "Qatar"
  return [
    {id: 23, name: "Guillermo Ochoa", country: country},
    {id: 24, name: "Néstor Araújo", country: country},
    {id: 25, name: "Jesús Gallardo", country: country},
    {id: 26, name: "César Montes", country: country},
    {id: 27, name: "Jorge Sánchez", country: country},
    {id: 28, name: "Edson Alvarez", country: country},
    {id: 29, name: "Jesús Manuel Corona", country: country},
    {id: 30, name: "Héctor Herrera", country: country},
    {id: 31, name: "Carlos Rodriguez", country: country},
    {id: 32, name: "Raúl Jiménez", country: country},
    {id: 33, name: "Hirving Lozano", country: country},
  ] as ISlicedPlayer[]
}
