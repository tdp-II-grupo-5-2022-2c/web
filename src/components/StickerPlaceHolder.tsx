import {IPlayer} from "./Sticker";
import {globalStickerStyles} from "../res/globalStyles";
import {albumColors, qatarColors} from "../res/themes";
import React from "react";

export type ISlicedPlayer = {
  id: number;
  name: string;
  country: string
}

type IStickerPlaceHolder = {
  player: IPlayer | ISlicedPlayer;
  number: number,
  pasteId?: number,
  onPaste?: (pasteId: number) => void;
}

type Props = IStickerPlaceHolder

const StickerPlaceHolder = ({player, number, pasteId, onPaste}: Props) => {

  const styles = {
    stickerPlaceHolder:{
      ...globalStickerStyles.sticker,
      ...{backgroundColor: albumColors.primary},
      ...{  width: "12rem",
        height: "18rem",
      }
    },
    text:{
      color: qatarColors.primary
    }
  }

  const formatPlayerCountry = (playerName : String) => {
    const firstThreeLetters = 3
    return playerName.slice(0,firstThreeLetters).toUpperCase()
  }

  //TODO: renderizado condicional, si no tengo figurita renderizo el placeholder, caso contrario
  // renderizo la figurita que recibo por props
  return (
    <div className="card" style={styles.stickerPlaceHolder}>
        <div className="card-body d-flex flex-column justify-content-between">
          <p className="card-text"></p>
          <div>
            <h5 className="card-title" style={styles.text}>{formatPlayerCountry(player.country)}</h5>
            <h5 className="card-title" style={styles.text}>{number}</h5>
          </div>
          <p className="card-text" style={styles.text}>{player.name}</p>
          {pasteId && onPaste && player.id === pasteId && <button className={"btn btn-primary btn-sm m-2"} onClick={() => onPaste(pasteId)}>Pegar</button>}
        </div>
    </div>
  )
}

export default StickerPlaceHolder
