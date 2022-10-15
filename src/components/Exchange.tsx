import React from "react";
import Sticker, {ISticker} from "./Sticker";
import {Button} from "reactstrap";

type Props = {
  stickersToGive: ISticker[],
  stickersToReceive: ISticker[]
  onCreateExchange: () => void;
  onConfirmExchange: () => void;
  onClearExchange: () => void;
  isCreatingExchange: boolean
}

const Exchange = ({stickersToGive, stickersToReceive, onCreateExchange, onConfirmExchange, onClearExchange, isCreatingExchange}: Props) => {

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
          <div className="row">
            <div className="row">
              {stickersToGive.length === 0 && <p className="card-text">Suelta aqui las figuritas que quieras intercambiar</p>}
              {stickersToGive.length !== 0 &&
                  <React.Fragment>
                      <Button onClick={isCreatingExchange ? onConfirmExchange : onCreateExchange}> {isCreatingExchange ? "Confirmar" : "Crear Intercambio"}</Button>
                      <Button onClick={onClearExchange}>Cancelar</Button>
                  </React.Fragment>
              }
            </div>
            <div className="row">
              <div className="col">
                {isCreatingExchange && <p className="card-text">Figuritas a intercambiar</p>}
                {stickersToGive.map((sticker, index) =>
                  <div key={sticker.id} className="col col-sm-3">
                    <Sticker player={sticker} style={styles.sticker}/>
                  </div>
                )}
              </div>
              {isCreatingExchange && <div className="col">
                {stickersToReceive.length === 0 && <p className="card-text">Suelta aqui las figuritas que quieras recibir</p>}
                {stickersToReceive.length > 0 && <p className="card-text">Figuritas a recibir</p>}
                {stickersToReceive.map((sticker, index) =>
                  <div key={sticker.id} className="col col-sm-3">
                    <Sticker player={sticker} style={styles.sticker}/>
                  </div>
                )}
              </div>}
            </div>
          </div>
        </div>
    </div>
  )

}

export default Exchange
