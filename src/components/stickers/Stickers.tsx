import Sticker, {ISticker, IStickerData} from "../Sticker";
import React from "react";
import {CardText, Col} from "reactstrap";
import {Draggable, DraggableTypes} from "../Draggable";

type Props = {
  stickers: ISticker[] | IStickerData[],
}

const Stickers = ({stickers} : Props) => {
  return <React.Fragment>
    {stickers && stickers.map((player, index) =>
      (player.quantity !== undefined && player.quantity) > 0 &&
        <div className="col col-md-3 p-3 d-flex justify-content-center" key={player.id} >
            <Draggable sticker={player} type={DraggableTypes.STICKER}>
                <Sticker player={player}
                         displayBadge={true}/>
            </Draggable>
        </div>
    )}
    {stickers.length === 0 &&
        <CardText>No se encontró ninguna figurita con este filtro</CardText>
    }
  </React.Fragment>;
}

export default Stickers
