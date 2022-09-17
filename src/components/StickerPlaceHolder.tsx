import {IPlayer} from "./Sticker";
import {globalStickerStyles} from "../res/globalStyles";
import {albumColors, qatarColors} from "../res/themes";

type IStickerPlaceHolder = {
  player: IPlayer;
  number: number
}

type Props = IStickerPlaceHolder

const StickerPlaceHolder = ({player, number}: Props) => {

  const styles = {
    stickerPlaceHolder:{
      ...globalStickerStyles.sticker,
      ...{backgroundColor: albumColors.primary},
      ...{  width: "12rem",
        height: "18rem",
      }
    },
    text:{
      color: qatarColors.primary
    }
  }

  const formatPlayerCountry = (playerName : String) => {
    const firstThreeLetters = 3
    return playerName.slice(0,firstThreeLetters).toUpperCase()
  }

  return (
    <div className="card" style={styles.stickerPlaceHolder}>
        <div className="card-body d-flex flex-column justify-content-between">
          <p className="card-text"></p>
          <div>
            <h5 className="card-title" style={styles.text}>{formatPlayerCountry(player.country)}</h5>
            <h5 className="card-title" style={styles.text}>{number}</h5>
          </div>
          <p className="card-text" style={styles.text}>{player.name}</p>
        </div>
    </div>
  )
}

export default StickerPlaceHolder
