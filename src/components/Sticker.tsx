import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {formatDate} from "../utils/formatDate";
import {colors} from "../res/themes";

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

export type ISticker = {
  player: IPlayer
  readOnly?: boolean,
}

type Props = ISticker

const Sticker = ({player, readOnly = false}: Props) => {

  //TODO: ver el tema del tamaño de imagen, al parecer corta la imagen si es muy grande y no la estira si es muy chica
  // tener en cuenta que la foto es de 300 por 200; ver de fijar eso como un maximo
  // una buena solucion es que las imagenes NO se ajusten al tamaño de la ventana sino que la persona tenga que scrollear
  // si es muy chica la pantalla
  const styles = {
    sticker:{
      width: "18rem",
      height: "26rem",
      backgroundColor: colors.secondary
    },
    image:{
      backgroundImage: `url(${player.image})`,
      backgroundRepeat: 'no-repeat',
    },
    playerName:{
      backgroundColor: colors.white,
      color: colors.primary,
      fontSize: '24px',
      fontWeight: 'bold'
    },
    playerBirth:{
      backgroundColor: colors.primary,
      color: colors.white,
      fontSize: '16px',
      fontWeight: 'bold',
    },
    button:{
      backgroundColor: colors.primary,
      color: colors.white,
    }
  }

  return (
    <Card
      style={styles.sticker}
    >
        <div
          className="w-100 h-100"
          style={styles.image}
        >
          <div className="d-flex flex-row justify-content-end my-1">
            {player.isInAlbum && <span className="badge text-bg-secondary mx-1">En album</span>}
            {player.repeatedCount && player.repeatedCount > 0 &&
                <span className="badge text-bg-secondary mx-1">{player.repeatedCount}
                </span>}
            {player.isInExchange && <span className="badge text-bg-secondary">En intercambio</span>}
          </div>
        </div>

      <CardBody className="d-flex flex-column justify-content-end align-items-center">
        <CardTitle className="w-100" style={styles.playerName}>
          {player.name}
        </CardTitle>
        <CardSubtitle
          className="w-50"
          style={styles.playerBirth}
        >
          {formatDate(player.dateOfBirth)}
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
