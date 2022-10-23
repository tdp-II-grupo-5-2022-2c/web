import {ISticker, IStickerData} from "../components/Sticker";
import {IExchange} from "../components/Exchange";

export function getMockedExchanges(): IExchange[] {
  return [
    {
      _id: "578524385047398",
      sender_id: "634399969ff91541744bb3d2",
      stickers_to_give: [
        {
          id: "6328a84a45188115b66b51b8",
          image: "https://picsum.photos/300/200",
          name: "Emiliano Martinez",
          number: 1,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker,
        {
          id: "6328a87545188115b66b51b9",
          image: "https://picsum.photos/300/200",
          name: "Julian Alvarez",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker, {
          id: "6328a87545188115b66b51b3",
          image: "https://picsum.photos/300/200",
          name: "Julian Alrez",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker, {
          id: "6328a87545188115b66b51b7",
          image: "https://picsum.photos/300/200",
          name: "Julian Alvaz",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker, {
          id: "6328a87545188115b66b51b8",
          image: "https://picsum.photos/300/200",
          name: "Julian Al",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker,
      ],
      stickers_to_receive: [
        {
          _id: "6328a84a45188115b66b51b8",
          name: "Emiliano Martinez",
          weight: 990,
          height: 170,
          position: "CF",
          country: "ARG",
          image: "https://picsum.photos/300/200",
          number: 1,
          date_of_birth: "1985-02-02"
        } as IStickerData
      ],
      blacklist_user_ids: [],
      completed: false
    },
    {
      _id: "578524385047398asdasdg",
      sender_id: "634399969ff91541744bb3d2",
      stickers_to_give: [
        {
          id: "6328a84a45188115b66b51b8",
          image: "https://picsum.photos/300/200",
          name: "Emiliano Martinez",
          number: 1,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker,
        {
          id: "6328a87545188115b66b51b9",
          image: "https://picsum.photos/300/200",
          name: "Julian Alvarez",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker, {
          id: "6328a87545188115b66b51b3",
          image: "https://picsum.photos/300/200",
          name: "Julian Alrez",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker, {
          id: "6328a87545188115b66b51b7",
          image: "https://picsum.photos/300/200",
          name: "Julian Alvaz",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker, {
          id: "6328a87545188115b66b51b8",
          image: "https://picsum.photos/300/200",
          name: "Julian Al",
          number: 11,
          quantity: 0,
          country: "ARG",
          is_on_album: true
        } as ISticker,
      ],
      stickers_to_receive: [
        {
          _id: "6328a84a45188115b66b51b8",
          name: "Emiliano Martinez",
          weight: 990,
          height: 170,
          position: "CF",
          country: "ARG",
          image: "https://picsum.photos/300/200",
          number: 1,
          date_of_birth: "1985-02-02"
        } as IStickerData
      ],
      blacklist_user_ids: [],
      completed: false
    }

  ]
}

