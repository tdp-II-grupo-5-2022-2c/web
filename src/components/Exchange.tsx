import Sticker, {ISticker, IStickerData} from "./Sticker";
import React from "react";
import {globalStickerStyles} from "../res/globalStyles";

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
      width: "26rem",
      height: "24rem",
      backgroundImage: `url("/images/qatar_bg_3.jpeg")`
    },
    arrows: {
      fontSize: "50px"
    }
  }

  const OFFSET = 5
  const BASE = 25

  return (
    <div className="card" style={styles.exchange}>
      <div className="card-body">
        <div className="row">
          <h1 className="text-white">Jessica Jones</h1>
        </div>
        <div className="row">
          <div className="col">
            {exchange.stickers_to_give.map((sticker, index) =>
              <div style={{position: "absolute", left: `${BASE - index * OFFSET}px`}}>
                <Sticker player={sticker}
                         style={globalStickerStyles.stickerSmall}
                         displayBadge={true}
                />
              </div>
            )}
            <div className="row" style={{position: "absolute", top: "170px"}}>
              {exchange.stickers_to_give.map((sticker, index) =>
                <p className="text-white my--1 text-truncate">{sticker.country} {sticker.number} {sticker.name}</p>
              )}
            </div>
          </div>
          <div className="col" style={{position: "absolute", left: "170px"}}>
            <h1 className="text-red" style={styles.arrows}>{"->"}</h1>
            <h1 className="text-green" style={styles.arrows}>{"<-"}</h1>
          </div>
          <div className="col">
            {exchange.stickers_to_receive.map((sticker, index) =>
              <div style={{position: "absolute", left: `${BASE * 2 - index * OFFSET}px`}}>
                <Sticker player={sticker}
                         style={globalStickerStyles.stickerSmall}
                         displayBadge={true}
                />
              </div>
            )}
            <div className="row" style={{position: "absolute", left: "20px", top: "170px"}}>
              {exchange.stickers_to_give.map((sticker, index) =>
                <p className="text-white my--1 text-truncate">{sticker.country} {sticker.number} {sticker.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exchange
