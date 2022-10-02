import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IBackEndSticker} from "../components/Sticker";
import {useDrop} from "react-dnd";
import {Draggable, DraggableTypes} from "../components/Draggable";
import DropBoard from "../components/DropBoard";
import {useNavigate} from "react-router-dom";
import client from "../services/config";
import MyModal from "../components/MyModal";
import {useUser} from "../context/UserContext";
import {Col, Container, Row} from "reactstrap";

const MyStickers = () => {
  const user = useUser();
  const [players, setPlayers] = useState([] as IBackEndSticker[])
  const navigate = useNavigate();
  const [showPasteOk, setShowPasteOk] = useState(false);

  useEffect(() => {
    fetchUserStickers()
  }, [])

  const fetchUserStickers = async () => {
    try{
      const {data: stickers} = await client.get(`/users/${user.id}/stickers`);
      console.log(stickers);
      setPlayers(stickers)

    } catch(error: any){
      console.error(
        "Request failed, response:",
        error
      );
    }
  }

  const closeShowPasteOk = () => {
    setShowPasteOk(false)
  }

  const addStickerToAlbum = async (sticker: IBackEndSticker) => {
    console.log(sticker);
    //console.log("Sticker id " + sticker.id + " into album")

    // Copy-paste de onPaste de MyAlbum
    // TODO: se debe usar el userContext
    // const mockedUser = {id: "63238bf658c62f37cba18c64"}

    /*try {
      const { data: response } = await client.patch(
        `/users/${user.id}/stickers/${playerId}/paste`
      );
      console.log("API REQUEST TO PASTE " + playerId)
      console.log("Response")
      console.log(response)
      setShowPasteOk(true)
    } catch(error: any){
      console.error(
        "Request failed, response:",
        error
      );
    }*/
    // Copy-paste de onPaste de MyAlbum

    navigate("../my-album?stickerIdToBePasted=" + sticker.id + "&country=" + sticker.country)
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (item: IBackEndSticker) => addStickerToAlbum(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }))

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container fluid>
        <Row>
          <Col className="col-md-2">
          {/*  ACA VA EL DROPZONE PARA LA COLA DE FIGUS REPETIDAS */}
          </Col>
          <Col className="col-md-8 pr-6 pl-6">
            <Row>
              {players.map((player, index) =>
                  <Col key={player.id} className="col-md-3 p-3 d-flex justify-content-center">
                    <Draggable sticker={player} type={DraggableTypes.STICKER}>
                      <Sticker player={player}/>
                    </Draggable>
                  </Col>
              )}
            </Row>
          </Col>
          <Col className="col-md-2">
            <div className="h-100vh flex-items-middle" ref={drop}>
              <DropBoard/>
            </div>
          </Col>
        </Row>
      </Container>
      <MyModal header={"Figurita Pegada!"} body={"Ya no deberias ver mas tu figurita si era una sola"} isOpen={showPasteOk} onAccept={closeShowPasteOk}/>
    </React.Fragment>
  );

}

export default MyStickers
