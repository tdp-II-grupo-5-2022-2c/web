import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {formatDate} from "../utils/formatDate";
import {stickerColors} from "../res/themes";
import {globalStickerStyles} from "../res/globalStyles";

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

export type ISticker = {
  player: IBackEndSticker
  readOnly?: boolean,
}

type Props = ISticker

const Sticker = ({player, readOnly = false}: Props) => {

  //TODO: ver el tema del tamaño de imagen, al parecer corta la imagen si es muy grande y no la estira si es muy chica
  // tener en cuenta que la foto es de 300 por 200; ver de fijar eso como un maximo
  // una buena solucion es que las imagenes NO se ajusten al tamaño de la ventana sino que la persona tenga que scrollear
  // si es muy chica la pantalla, es decir se mantienen siempre del mismo tamaño

  // TODO: corregir el estilo
  const styles = {
    image:{
      backgroundImage: `url(${player.image})`,
      backgroundRepeat: 'no-repeat',
    },
    button:{
      backgroundColor: stickerColors.primary,
      color: stickerColors.white,
    }
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

      <CardBody className="d-flex flex-column justify-content-end align-items-center">
        <CardTitle className="w-100" style={globalStickerStyles.playerName}>
          {player.name}
        </CardTitle>
        <CardSubtitle
          className="w-50"
          style={globalStickerStyles.playerBirth}
        >
        </CardSubtitle>
      </CardBody>
      {!readOnly &&
          <div className="d-flex flex-row justify-content-around">
              <Button className="w-50 mx-1 btn-outline-danger" style={styles.button}>
                  Pegar
              </Button>
              <Button className="w-50 mx-1 btn-outline-danger" style={styles.button}>
                  Intercambiar
              </Button>
          </div>
      }
    </Card>
  )
}

export default Sticker
