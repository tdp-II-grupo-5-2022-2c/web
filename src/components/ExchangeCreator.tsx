import React from "react";
import Sticker, {ISticker, IStickerData} from "./Sticker";
import {Button} from "reactstrap";

type Props = {
  placedStickers: ISticker[] | IStickerData[],
  hint?: string
  title?: string
  disable: boolean
}

const ExchangeCreator = ({placedStickers, hint, title, disable}: Props) => {

  const styles = {
    card:{
      width: "18rem"
    },
    sticker:{
      width: "12rem",
      height: "8rem"
    }
  }

  return (
    <div className={disable ? "card bg-gradient-gray" : "card"} style={styles.card}>
        <div className="card-body">
          <div className="row">
            <div className="row">
              {placedStickers.length === 0 && <p className="card-text">{hint ? hint : "Suelta aqui las figuritas que quieres agregar"}</p>}
            </div>
            <div className="row">
              <div className="col">
                {placedStickers.length > 0 && <p className="card-text">{title ? title : "Figuritas colocadas"}</p>}
                {placedStickers.map((sticker, index) =>
                  <div key={sticker.id} className="col col-sm-3">
                    <Sticker player={sticker} style={styles.sticker}/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )

}

export default ExchangeCreator
