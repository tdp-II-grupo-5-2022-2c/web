import React, {useEffect} from "react";
import StickerPlaceHolder from "../components/StickerPlaceHolder";
import Sticker, {ISticker} from "./Sticker";
import {Col, Container, Row} from "reactstrap";
import {getAlbumPage} from "../data/albumData";

type Props = {
  albumStickers: ISticker[] | {id: string, is_on_album: false}[]
  country: string,
  position?: number,
  pasteId?: string
  onPaste: (pasteId?: string) => void;
}

const AlbumPage = ({albumStickers, country, position, pasteId, onPaste}: Props) => {

  const styles = {
    sticker: {
      height: '16rem',
      width: '12rem',
      margin: '0.7rem'
    }
  }

  useEffect(() => {
    console.log("Album stickers changed")
  }, [albumStickers])

  return (
    <React.Fragment>
      <Container style={getAlbumPage(country).styles}>
        <Row>
        { albumStickers.length > 0 &&
          albumStickers.map((sticker, index) =>
            <Col key={sticker.id} className="col-md-3 d-flex justify-content-center">
              {sticker.is_on_album && <Sticker player={sticker}
                                               style={styles.sticker}
              />}
              {!sticker.is_on_album && <StickerPlaceHolder country={country}
                                                           position={position}
                                                           index={index}
                                                           pasteId={pasteId}
                                                           onPaste={() => onPaste(pasteId)}
                                                           style={styles.sticker}
              />}
            </Col>
          )
        }
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AlbumPage
