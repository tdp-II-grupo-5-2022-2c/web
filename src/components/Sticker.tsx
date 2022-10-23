import {Card, CardImg, CardImgOverlay,} from "reactstrap";
import {globalStickerStyles} from "../res/globalStyles";

export type ISticker = {
  id: string;
  image: string;
  name: string;
  number: number;
  quantity: number
  country: string
  is_on_album: boolean
}

export type IStickerData = {
  _id: string,
  name: string,
  weight: number,
  height: number,
  position: string,
  country: string,
  image: string,
  number: number,
  date_of_birth: string
  quantity: number | undefined

}

type Props = {
  player: ISticker | IStickerData,
  style?: object,
  displayBadge?: boolean
}

const Sticker = ({player, style = {}, displayBadge = false}: Props) => {

  return (
    <Card
        style={{...globalStickerStyles.sticker, ...style}}
        className="debugRed"
    >
      {displayBadge && player.quantity !== undefined && player.quantity > 1 &&
          <span style={{fontSize: 25 }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gradient-gray">
            &nbsp;{player.quantity}&nbsp;
          </span>}
      <CardImg
          className="w-100 h-100"
          src={require("../assets/img/stickers/ARG11.png")}
      />
      {/* El CardImgOverlay es sólo para ver los filtros,
      porque ahora cargamos solo el sticker de messi y es dificil de ver,
      despues hay que volar esto*/}
      {displayBadge &&
          <CardImgOverlay>
            <span className="text-bg-light">{player.name}</span>
            <br/>
            <span className="text-bg-light">{player.country}</span>
          </CardImgOverlay> }
    </Card>
  )
}

export default Sticker
