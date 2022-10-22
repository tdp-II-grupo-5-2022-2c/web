import Sticker, {ISticker, IStickerData} from "../Sticker";
import React from "react";
import {CardText, Col} from "reactstrap";
import {Draggable, DraggableTypes} from "../Draggable";

type Props = {
  stickers: ISticker[] | IStickerData[],
  style?: object
}

const Stickers = ({stickers, style} : Props) => {
  return <React.Fragment>
    <div className="d-flex flex-row">
      {stickers && stickers.map((player, index) =>
        (player.quantity !== undefined && player.quantity) > 0 &&
          <div className="m-1" key={player.id} >
              <Draggable sticker={player} type={DraggableTypes.STICKER}>
                  <Sticker player={player}
                           displayBadge={true}
                           style={style}
                  />
              </Draggable>
          </div>
      )}
    </div>
    {stickers.length === 0 &&
        <CardText>No se encontró ninguna figurita con este filtro</CardText>
    }
  </React.Fragment>;
}

export default Stickers
