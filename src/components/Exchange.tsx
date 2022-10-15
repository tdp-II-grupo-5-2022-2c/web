import React, {useState} from "react";
import Sticker, {ISticker} from "./Sticker";
import {Button} from "reactstrap";

type Props = {
  stickersToGive: ISticker[],
  stickersToReceive: ISticker[]
  onCreateExchange: () => void;
  onClearExchange: () => void;
}

const Exchange = ({stickersToGive, stickersToReceive, onCreateExchange, onClearExchange}: Props) => {

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
    <div className="card" style={styles.card}>
        <div className="card-body">
          {stickersToGive.length === 0 && <p className="card-text">Suelta aqui las figuritas que quieras intercambiar</p>}
          {stickersToGive.length !== 0 &&
              <React.Fragment>
                <Button onClick={onCreateExchange}>Crear Intercambio</Button>
                <Button onClick={onClearExchange}>Limpiar</Button>
              </React.Fragment>
          }
          {stickersToGive.map((sticker, index) =>
            <div key={sticker.id} className="col col-sm-3">
              <Sticker player={sticker} style={styles.sticker}/>
            </div>
          )}
        </div>
    </div>
  )

}

export default Exchange
