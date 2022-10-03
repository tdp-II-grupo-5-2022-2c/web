import {
  Card, CardFooter,
  CardImg, CardImgOverlay,
} from "reactstrap";
import {globalStickerStyles} from "../res/globalStyles";

// TODO: quitar esto pq tiene info de mas que no necesito
export type IPlayer = {
  id: number;
  name: string;
  dateOfBirth: Date;
  weight: number;
  height: number;
  position: string;
  country: string;
  image: string;
  repeatedCount?: number,
  isInAlbum?: boolean,
  isInExchange?: boolean,
}

export type IBackEndSticker = {
  id: number;
  image: string;
  name: string;
  number: number;
  quantity: number
  country: string
  is_on_album: boolean
}

type Props = {
  player: IBackEndSticker,
  style?: object,
  displayBadge?: boolean
}

const Sticker = ({player, style = {}, displayBadge = false}: Props) => {

  //TODO: ver el tema del tamaño de imagen, al parecer corta la imagen si es muy grande y no la estira si es muy chica
  // tener en cuenta que la foto es de 300 por 200; ver de fijar eso como un maximo
  // una buena solucion es que las imagenes NO se ajusten al tamaño de la ventana sino que la persona tenga que scrollear
  // si es muy chica la pantalla, es decir se mantienen siempre del mismo tamaño

  return (
    <Card
        style={{...globalStickerStyles.sticker, ...style}}
    >
      {displayBadge && player.quantity > 1 &&
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
