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
      width: "24rem",
      height: "14rem",
    },
  }
  return (
    <div className="card" style={styles.exchange}>
      <div className="card-body">
        <h5 className="card-title">Usuario da</h5>
        <div className="row">
          {exchange.stickers_to_give.map((sticker, index) =>
            <div className="col">
              <Sticker player={sticker}
                       style={globalStickerStyles.stickerSmall}
                       displayBadge={true}
              />
            </div>
          )}
        </div>
        <h5 className="card-title">Usuario recibe</h5>
        <div className="row">
          {exchange.stickers_to_receive.map((sticker, index) =>
            <div className="col">
              <Sticker player={sticker}
                       style={globalStickerStyles.stickerSmall}
                       displayBadge={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Exchange
