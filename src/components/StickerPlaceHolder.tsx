import {Button, Card, CardBody, CardSubtitle, CardTitle} from "reactstrap";
import {formatDate} from "../utils/formatDate";
import {IPlayer} from "./Sticker";
import {colors} from "../res/themes";


type IStickerPlaceHolder = {
  player: IPlayer
}

type Props = IStickerPlaceHolder

const StickerPlaceHolder = ({player}: Props) => {

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
    </Card>
  )
}

export default StickerPlaceHolder
