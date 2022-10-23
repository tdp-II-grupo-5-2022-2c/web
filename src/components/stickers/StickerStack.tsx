import Sticker, {ISticker, IStickerData} from "../Sticker";
import {globalStickerStyles} from "../../res/globalStyles";
import React from "react";

type Props = {
  stickers: ISticker[],
  offset?: number
}

export const StickerStack = ({stickers, offset}: Props) => {
  const OFFSET = offset || 1

  return(
    <div className="d-flex flex-row position-relative">
      {stickers && stickers.length > 0 &&
        (
          <>
            <div key={stickers[0].id} className="position-relative">
              <Sticker player={stickers[0]}
                       style={globalStickerStyles.stickerSmall}
                       displayBadge={true}
              />
            </div>
            {stickers.slice(1).map((sticker, index) =>
              <div key={sticker.id} className="position-absolute" style={{left:`${(1+index) * OFFSET}rem`}}>
                <Sticker player={sticker}
                         style={globalStickerStyles.stickerSmall}
                         displayBadge={true}
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
}

export const StickerStack2 = ({stickers, offset}: Props2) => {
  const OFFSET = offset || 1

  return(
    <div className="d-flex flex-row position-relative">
      {stickers && stickers.length > 0 &&
        (
          <>
            <div key={stickers[0]._id} className="position-relative">
              <Sticker player={stickers[0]}
                       style={globalStickerStyles.stickerSmall}
                       displayBadge={true}
              />
            </div>
            {stickers.slice(1).map((sticker, index) =>
              <div key={sticker._id} className="position-absolute" style={{left:`${(1+index) * OFFSET}rem`}}>
                <Sticker player={sticker}
                         style={globalStickerStyles.stickerSmall}
                         displayBadge={true}
                />
              </div>
            )}
          </>
        )
      }
    </div>
  )

}

