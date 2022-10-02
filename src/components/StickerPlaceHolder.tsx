import {IPlayer} from "./Sticker";
import {globalStickerStyles} from "../res/globalStyles";
import {albumColors, qatarColors} from "../res/themes";
import React from "react";
import {Button} from "reactstrap";

// TODO: quitar esto pq solo me sirve para data mockeada
export type ISlicedPlayer = {
  id: number;
  name: string;
  country: string
}

type IStickerPlaceHolder = {
  country: string,
  number: number,
  pasteId?: string,
  onPaste?: (pasteId: string) => void;
}

type Props = IStickerPlaceHolder

const StickerPlaceHolder = ({country, number, pasteId, onPaste}: Props) => {

  const styles = {
    stickerPlaceHolder:{
      ...globalStickerStyles.sticker,
      ...{backgroundColor: albumColors.primary},
      ...{  width: "12rem",
        height: "16rem",
      }
    },
    text:{
      color: qatarColors.primary
    }
  }

  const formatCountry = (countryName : String) => {
    const firstThreeLetters = 3
    return countryName.slice(0,firstThreeLetters).toUpperCase()
  }

  const formatNumber = (number : Number) => {
    return number.toLocaleString('en-US',{
      minimumIntegerDigits: 2
    })
  }

  //TODO: renderizado condicional, si no tengo figurita renderizo el placeholder, caso contrario
  // renderizo la figurita que recibo por props
  return (
    <div className="card" style={styles.stickerPlaceHolder}>
        <div className="card-body d-flex flex-column justify-content-between">
          <p className="card-text"></p>
          <div>
            <h5 className="card-title" style={styles.text}>{formatCountry(country)}</h5>
            <h5 className="card-title" style={styles.text}>{formatNumber(number)}</h5>
          </div>
          {/*<p className="card-text" style={styles.text}>{player.name}</p>*/}
          {pasteId && onPaste && <Button color="primary" size="sm" className="m-2" onClick={() => onPaste(pasteId)}>Pegar</Button>}
        </div>
    </div>
  )
}

export default StickerPlaceHolder
