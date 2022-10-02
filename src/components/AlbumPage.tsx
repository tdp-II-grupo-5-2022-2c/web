import React, {useEffect, useState} from "react";
import StickerPlaceHolder from "../components/StickerPlaceHolder";
import Sticker, {IBackEndSticker, IPlayer} from "./Sticker";
import {Col, Container, Placeholder, Row} from "reactstrap";
import {getAlbumPage} from "../data/albumData";
import client from "../services/config";
import {useUser} from "../context/UserContext";

type Props = {
  country: string,
  pasteId?: string
  onPaste: (pasteId?: string) => void;
}

const AlbumPage = ({country, pasteId, onPaste}: Props) => {

  const NUM_PLAYERS = 11;

  const user = useUser();
  const [albumStickers, setAlbumStickers] = useState([] as any[]);

  useEffect(() => {
    findPastedStickers().then(r => {
      //TODO agregar loader
      processPageData(r);
    });
  }, [])

  const findPastedStickers = async () => {
    const { data: response } = await client.get(`/users/${user.id}/stickers?country=${country}&is_on_album=true`)
    console.log("Response from findPastedStickers");
    console.log(response);
    return response;
  }

  const processPageData = (stickersOnAlbum: IBackEndSticker[]) => {
    let stickers = albumStickers;
    console.log("process page data");
    console.log(stickersOnAlbum);
    stickersOnAlbum.forEach((sticker: IBackEndSticker) => {
      stickers[sticker.number] = sticker;
    });

    for (let i = 0; i <= NUM_PLAYERS; i++) {
      console.log("valor en " + i);
      console.log(stickers.at(i));
      if (!stickers.at(i)) {
        stickers[i] = {is_on_album: false}
      } else {
        console.log("Hay sticker en index: " + i);
      }
    }
    setAlbumStickers(stickers);
  }

  return (
    <React.Fragment>
      <Container style={getAlbumPage(country).styles}>
        <Row>
        { albumStickers.length > 0 &&
          albumStickers.map((sticker, index) =>
            <Col key={index} className="col-md-3 d-flex justify-content-center">
              {sticker.is_on_album && <Sticker player={sticker}/>}
              {!sticker.is_on_album && <StickerPlaceHolder country={country} number={index} pasteId={pasteId} onPaste={() => onPaste(pasteId)} />}
            </Col>
          )
        }
        </Row>
        {/*{
        }
        {team && team.players && <div className="row row-cols-auto">
          {team.players.map((player, index) =>
            <div key={player.id} className="gy-5">
              {!pasteId && !onPaste && <StickerPlaceHolder country= number={index + OFFSET}/>}
              {pasteId && onPaste && <StickerPlaceHolder country= number={index + OFFSET} pasteId={pasteId} onPaste={() => onPaste(pasteId)}/>}
            </div>
          )}
        </div>}*/}
      </Container>
    </React.Fragment>
  );
}

export default AlbumPage
