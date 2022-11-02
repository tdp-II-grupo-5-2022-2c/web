import {IStickerData} from "./Sticker";
import React from "react";
import {StickerStack2} from "./stickers/StickerStack";
import {Button} from "reactstrap";
import {globalButtonsStyle} from "../res/globalStyles";
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
      width: "32rem",
      backgroundImage: `url("/images/bg_exchange.jpg")`
    },
    arrows: {
      fontSize: "70px",
    }
  }

  return (
    <div className="card" style={styles.exchange}>
      <div className="card-body text-center">
        <div className="d-flex flex-row justify-content-around mb-1">
            {!isOwner && onAccept &&
                <Button style={globalButtonsStyle.alternative} onClick={() => onAccept(exchange._id)}>
                    <p className="text-white m-0">Aceptar</p>
                </Button>}
            <h1 className="text-white">{exchange.sender.name} {exchange.sender.lastname}</h1>
            {!isOwner && onReject &&
                <Button style={globalButtonsStyle.white} onClick={() => onReject(exchange._id)}>
                    <p className="text-qatar-secondary m-0">Rechazar</p>
                </Button>}
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <StickerStack2 stickers={exchange.stickers_to_give} step={0.5} onClick={onClickGive}/>
          <div className="d-flex flex-column">
            <i className="ni ni-bold-right text-danger ni-3x"></i>
            <hr/>
            <i className="ni ni-bold-left text-success ni-3x"></i>
          </div>
          <StickerStack2 stickers={exchange.stickers_to_receive} step={0.5} onClick={onClickReceive}/>
        </div>
      </div>
    </div>
  )
}

export default Exchange
