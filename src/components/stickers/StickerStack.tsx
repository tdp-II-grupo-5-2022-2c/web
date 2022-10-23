import Sticker, {ISticker, IStickerData} from "../Sticker";
import {debugStyle, globalStickerStyles} from "../../res/globalStyles";
import React from "react";

type Props = {
  stickers: ISticker[]
}

export const StickerStack = ({stickers}: Props) => {
  const OFFSET = 1

  return(
    <div className="d-flex flex-row position-relative" style={debugStyle.container}>
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
  stickers: IStickerData[]
}

export const StickerStack2 = ({stickers}: Props2) => {
  const OFFSET = 1

  return(
    <div className="d-flex flex-row position-relative" style={debugStyle.container}>
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


