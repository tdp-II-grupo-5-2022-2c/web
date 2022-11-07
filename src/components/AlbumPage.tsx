import React, {useEffect} from "react";
import StickerPlaceHolder from "../components/StickerPlaceHolder";
import Sticker, {ISticker} from "./stickers/Sticker";
import {Col, Container, Fade, Row} from "reactstrap";
import {getAlbumCountryName, getAlbumPage} from "../data/albumData";

type Props = {
  albumStickers: ISticker[] | {id: string, is_on_album: false}[]
  country: string,
  position?: number,
  pasteId?: string
  onPaste: (pasteId?: string) => void;
  pasteIdAnimation?: string
}

const AlbumPage = ({albumStickers, country, position, pasteId, onPaste, pasteIdAnimation}: Props) => {

  const styles = {
    sticker: {
      maxHeight: '11rem',
      minWidth: '8.5rem',
      maxWidth: '8.5rem',
      margin: '0.7rem'
    }
  }

  useEffect(() => {
    console.log("Album stickers changed")
  }, [albumStickers])

  const animatePasteId = (stickerId: string) => {
    return pasteIdAnimation === stickerId;
  }

  return (
    <React.Fragment>
      <Container className="border border-dark bg-qatar-img p-0 m-0 overflow-hidden"
      >
        <Row className="h-75vh" style={{...getAlbumPage(country).styles, backdropFilter: "blur(1px)"}}>
          <Col className="col-md-6 p-0">
            <Row style={{height: "30%"}} className="bg-translucent-light m-0 p-0 align-items-center">
              <h1 className="text-white text-center" style={{fontSize: 40}}>{getAlbumCountryName(country)}</h1>
            </Row>
            <Row className="justify-content-center m-0 p-0 mr-4 ml-4">
              { albumStickers.length > 0 &&
                  albumStickers.slice(0,6).map((sticker, index) =>
                      <Col key={sticker.id} className={`col-md-4 justify-content-center ${animatePasteId(sticker.id) ? "sticker-zoom-animate" : ""}`}>
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
          </Col>
          <Col className="col-md-6 border-left border-left-3 border-dark p-0">
            <Row className="bg-translucent-light justify-content-center m-0 p-0" style={{height: "30%"}}>
              <i className={`fi ${getAlbumPage(country).flagIcon}`} style={{fontSize: 100}}></i>
            </Row>
            <Row className="justify-content-center m-0 p-0 mr-4 ml-4">
              { albumStickers.length > 0 &&
                  albumStickers.slice(-6).map((sticker, index) =>
                      <Col key={sticker.id} className="col-md-4 justify-content-center">
                        {sticker.is_on_album && <Sticker player={sticker}
                                                         style={styles.sticker}
                        />}
                        {!sticker.is_on_album && <StickerPlaceHolder country={country}
                                                                     position={position}
                                                                     index={index + 6}
                                                                     pasteId={pasteId}
                                                                     onPaste={() => onPaste(pasteId)}
                                                                     style={styles.sticker}
                        />}
                      </Col>
                  )
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AlbumPage
