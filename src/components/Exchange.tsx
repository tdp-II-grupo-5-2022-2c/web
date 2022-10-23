import Sticker, {ISticker, IStickerData} from "./Sticker";
import React from "react";
import {StickerStack, StickerStack2} from "./stickers/StickerStack";
import PlayersInfo from "./stickers/PlayersInfo";

export type IExchange = {
  _id: string,
  sender_id: string,
  stickers_to_give: ISticker[],
  stickers_to_receive: IStickerData[],
  blacklist_user_ids: string[],
  completed: boolean
}

type Props = {
  exchange: IExchange,
}

const Exchange = ({exchange}: Props) => {
  const styles = {
    exchange: {
      width: "29rem",
      height: "24rem",
      backgroundImage: `url("/images/bg_exchange.jpg")`
    },
    arrows: {
      fontSize: "50px"
    }
  }

  const OFFSET = 5
  const BASE = 25

  return (
    <div className="card" style={styles.exchange}>
      <div className="card-body text-center">
        <div className="row">
          <h1 className="text-white">Jessica Jones</h1>
        </div>
        <div className="row">
          <div className="col">
            <StickerStack stickers={exchange.stickers_to_give} offset={0.5}/>
            <PlayersInfo stickers={exchange.stickers_to_give}/>
          </div>
          <div className="col position-absolute">
            <h1 className="text-red" style={styles.arrows}>{"->"}</h1>
            <h1 className="text-green" style={styles.arrows}>{"<-"}</h1>
          </div>
          <div className="col">
            <StickerStack2 stickers={exchange.stickers_to_receive}/>
              <PlayersInfo stickers={exchange.stickers_to_receive}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exchange
