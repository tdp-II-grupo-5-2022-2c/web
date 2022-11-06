import {CardImg, CardImgOverlay, Row} from "reactstrap";
import {ISticker, IStickerData} from "./Sticker";

type Props = {
  player: ISticker | IStickerData,
  showNotInAlbum?: boolean
}

const StickerImg = ({
    player,
    showNotInAlbum = false
                    } : Props) => {

  return (
      <>
        <CardImg
            className="w-100 h-100"
            src={require("../../assets/img/stickers/ARG11.png")}
        />
        {/* El CardImgOverlay es sólo para ver los filtros,
    porque ahora cargamos solo el sticker de messi y es dificil de ver,
    despues hay que volar esto*/}

        <CardImgOverlay>
          <span className="text-bg-light">{player.name}</span>
          <br/>
          <span className="text-bg-light">{player.country}</span>
        </CardImgOverlay>
        {showNotInAlbum && <CardImgOverlay>
          <Row className="align-items-center d-flex h-75">
              <span className="text-white text-center text-not-in-album">
                ¡Arrastra hasta el album para pegar!
              </span>
          </Row>
        </CardImgOverlay>}
      </>
  )
}

export default StickerImg;