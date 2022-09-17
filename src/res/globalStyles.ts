import {stickerColors} from "./themes";

export const globalStickerStyles = {
  sticker:{
    width: "18rem",
    height: "26rem",
    backgroundColor: stickerColors.secondary
  },
  playerName:{
    backgroundColor: stickerColors.white,
    color: stickerColors.primary,
    fontSize: '24px',
    fontWeight: 'bold'
  },
  playerBirth:{
    backgroundColor: stickerColors.primary,
    color: stickerColors.white,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  button:{
    backgroundColor: stickerColors.primary,
    color: stickerColors.white,
  }
}

export const debug = {
  container:{
    borderStyle: "solid"
  }
}
