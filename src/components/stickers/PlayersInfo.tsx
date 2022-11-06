import {ISticker, IStickerData} from "./Sticker";
import React from "react";

const PlayersInfo = ({stickers}: {stickers: ISticker[] | IStickerData[]}) => {
  return (
    <React.Fragment>
      {stickers.map((sticker, index) =>
        <p key={sticker.name} className="text-white m--1 p-0">{`${sticker.country} ${sticker.name} ${sticker.number}`.slice(0,30)}</p>
      )}
    </React.Fragment>
  )
}

export default PlayersInfo
