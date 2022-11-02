import {ISticker, IStickerData} from "./Sticker";
import React from "react";
import {StickerStack, StickerStack2} from "./stickers/StickerStack";
import PlayersInfo from "./stickers/PlayersInfo";
import {Button} from "reactstrap";
import {debugStyle, globalButtonsStyle} from "../res/globalStyles";
import {User} from "../context/UserContext";

export type IExchange = {
  _id: string,
  sender_id: string,
  sender: User,
  stickers_to_give: IStickerData[],
  stickers_to_receive: IStickerData[],
  blacklist_user_ids: string[],
  completed: boolean
}

type Props = {
  exchange: IExchange,
  isOwner?: boolean,
  onAccept?: (id: string) => void,
  onReject?: (id: string) => void
  onClickGive?: (e: any) => void
  onClickReceive?: (e: any) => void
}

const Exchange = ({exchange, isOwner = true, onAccept, onReject, onClickGive, onClickReceive}: Props) => {
  const styles = {
    exchange: {
      width: "29rem",
      height: "24rem",
      backgroundImage: `url("/images/bg_exchange.jpg")`
    },
    arrows: {
      fontSize: "70px",
    }
  }

  return (
    <div className="card" style={styles.exchange}>
      <div className="card-body text-center">
        <div className="row mb-1">
          <div className="col-3">
            {!isOwner && onAccept &&
                <Button style={globalButtonsStyle.alternative} onClick={() => onAccept(exchange._id)}>
                    <p className="text-white m-0">Aceptar</p>
                </Button>}
          </div>
          <div className="col-6">
            <h1 className="text-white">{exchange.sender.name}</h1>
          </div>
          <div className="col-3">
            {!isOwner && onReject &&
                <Button style={globalButtonsStyle.white} onClick={() => onReject(exchange._id)}>
                    <p className="text-qatar-secondary m-0">Rechazar</p>
                </Button>}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <StickerStack2 stickers={exchange.stickers_to_give} offset={0.5} onClick={onClickGive}/>
            <PlayersInfo stickers={exchange.stickers_to_give}/>
          </div>
          <div className="col position-absolute">
            <h1 className="text-red" style={styles.arrows}>{">"}</h1>
            <h1 className="text-green" style={styles.arrows}>{"<"}</h1>
          </div>
          <div className="col ml-2">
            <StickerStack2 stickers={exchange.stickers_to_receive} offset={0.5} onClick={onClickReceive}/>
            <PlayersInfo stickers={exchange.stickers_to_receive}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exchange
