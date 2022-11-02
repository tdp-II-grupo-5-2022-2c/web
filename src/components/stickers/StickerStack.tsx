import Sticker, {ISticker, IStickerData} from "../Sticker";
import {globalStickerStyles} from "../../res/globalStyles";
import React from "react";

type Props = {
  stickers: ISticker[],
  offset?: number,
  isCreating?: boolean,
}

export const StickerStack = ({stickers, offset, isCreating = false}: Props) => {
  const OFFSET = offset || 1

  return (
    <div className="d-flex flex-row position-relative">
      {isCreating && stickers.length >= 5 && <span style={{fontSize: 20}}
                                     className="position-absolute badge top-0 start-100 rounded-pill bg-gradient-danger mx-2">
              &nbsp;{stickers.length}/5&nbsp;
          </span>}
      {stickers && stickers.length > 0 &&
        (
          <>
            <div key={stickers[0].id} className="position-relative">
              <Sticker player={stickers[0]}
                       style={globalStickerStyles.stickerSmall}
                       displayBadge={true}
                       displayQuantity={false}
              />
            </div>
            {stickers.slice(1).map((sticker, index) =>
              <div key={sticker.id} className="position-absolute" style={{left: `${(1 + index) * OFFSET}rem`}}>
                <Sticker player={sticker}
                         style={globalStickerStyles.stickerSmall}
                         displayBadge={true}
                         displayQuantity={false}
                />
              </div>
            )}
          </>
        )
      }
    </div>
  )

}

type Props2 = {
  stickers: IStickerData[],
  offset?: number
  isCreating?: boolean,
  onClick?: (e: any) => void,
}

export const StickerStack2 = ({stickers, offset, isCreating = false, onClick}: Props2) => {
  const OFFSET = offset || 1

  return (
    <div className="d-flex flex-row position-relative" onClick={onClick}>
      {isCreating && stickers.length >= 5 && <span style={{fontSize: 20}}
            className="position-absolute badge top-0 start-100 rounded-pill bg-gradient-danger mx-2">
              &nbsp;{stickers.length}/5&nbsp;
          </span>}
      {stickers && stickers.length > 0 &&
        (
          <>
            <div key={stickers[0]._id} className="position-relative">
              <Sticker player={stickers[0]}
                       style={globalStickerStyles.stickerSmall}
                       displayBadge={true}
              />
            </div>
            <div>
              {stickers.slice(1).map((sticker, index) =>
                <div key={sticker._id} className="position-absolute" style={{left: `${(1 + index) * OFFSET}rem`}}>
                  <Sticker player={sticker}
                           style={globalStickerStyles.stickerSmall}
                           displayBadge={true}
                  />
                </div>
              )}
            </div>
          </>
        )
      }
    </div>
  )

}


