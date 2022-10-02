import {Card} from "reactstrap";
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
  quantity: number
  country: string
  is_on_album: boolean
}

type Props = {
  player: IBackEndSticker
}

const Sticker = ({player}: Props) => {

  //TODO: ver el tema del tamaño de imagen, al parecer corta la imagen si es muy grande y no la estira si es muy chica
  // tener en cuenta que la foto es de 300 por 200; ver de fijar eso como un maximo
  // una buena solucion es que las imagenes NO se ajusten al tamaño de la ventana sino que la persona tenga que scrollear
  // si es muy chica la pantalla, es decir se mantienen siempre del mismo tamaño

  const styles = {
    image: {
      backgroundImage: `url(${player.image})`,
      backgroundRepeat: 'no-repeat',
    },
  }

  return (
    <Card
      style={globalStickerStyles.sticker}
    >
      <div
        className="w-100 h-100"
        style={styles.image}
      >
        <div className="d-flex flex-row justify-content-end my-1">
          {player.quantity > 0 &&
              <span className="badge text-bg-secondary mx-1">{player.quantity}
                </span>}
        </div>
      </div>
    </Card>
  )
}

export default Sticker
