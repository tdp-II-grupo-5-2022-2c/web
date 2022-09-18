import {stickerColors} from "./themes";

export const globalStickerStyles = {
  sticker:{
    width: "12rem",
    height: "18rem",
    backgroundColor: stickerColors.secondary
  },
  playerName:{
    backgroundColor: stickerColors.white,
    color: stickerColors.primary,
    fontSize: '18px',
    fontWeight: 'bold'
  },
  playerBirth:{
    backgroundColor: stickerColors.primary,
    color: stickerColors.white,
    fontSize: '12px',
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
