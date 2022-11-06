import {qatarColors} from "./themes";

export const globalStickerStyles = {
  sticker:{
    width: "16rem",
    height: "20rem",
  },
  stickerSmall: {
    width: "10rem",
    height: "12rem",
  },
  stickerMedium: {
    width: "12rem",
    height: "15rem",
  }
}

export const globalPacketStyles = {
  packet: {
    width: "18rem"
  },
  packetSmall: {
    width: "14rem"
  }
}

export const globalButtonsStyle = {
  primary:{
    backgroundColor: qatarColors.secondaryDark,
  },
  alternative:{
    backgroundColor: qatarColors.secondary,
  },
  white:{
    backgroundColor: qatarColors.primary,
  }
}

export const debugStyle = {
  container:{
    borderStyle: "solid"
  },
  containerRed:{
    borderStyle: "solid",
    borderColor: "red"
  },
  containerBlue:{
    borderStyle: "solid",
    borderColor:"blue"
  }
}
