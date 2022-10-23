import Sticker, {ISticker, IStickerData} from "../Sticker";
import React from "react";
import {CardText} from "reactstrap";
import {Draggable, DraggableTypes} from "../Draggable";

type Props = {
  stickers: ISticker[],
  style?: object
}

export const Stickers = ({stickers, style} : Props) => {
  return <React.Fragment>
      {stickers && stickers.map((player, index) =>
        (player.quantity > 0) &&
          <div className="p-0 col" key={player.id} >
              <Draggable sticker={player} type={DraggableTypes.STICKER}>
                  <Sticker player={player}
                           displayBadge={true}
                           style={style}
                  />
              </Draggable>
          </div>
      )}
    {stickers.length === 0 &&
        <CardText>No se encontró ninguna figurita con este filtro</CardText>
    }
  </React.Fragment>;
}

type Props2 = {
  stickers: IStickerData[],
  style?: object
}

export const AllStickers = ({stickers, style} : Props2) => {
  return (<React.Fragment>
    {stickers && stickers.map((player, index) =>
        <div className="p-0 col" key={player._id}>
            <Draggable sticker={player} type={DraggableTypes.STICKER} >
                <Sticker player={player}
                         displayBadge={true}
                         style={style}
                />
            </Draggable>
        </div>
    )}
    {stickers.length === 0 &&
        <CardText>No se encontró ninguna figurita con este filtro</CardText>
    }
  </React.Fragment>
  );
}

