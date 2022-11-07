import React, {useEffect, useState} from "react";
import {Row, Container, Col, Fade, UncontrolledTooltip, Spinner} from "reactstrap";
import Sticker, {ISticker} from "../components/stickers/Sticker";
import {useNavigate} from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Packet from "../components/Packet";
import client from "../services/config";
import {useUser} from "../context/UserContext";
import {ROUTES} from "./RoutesNames";
import {MyModal} from "../components/MyModal";
import {globalStickerStyles} from "../res/globalStyles";
import {useDrop} from "react-dnd";
import {DraggableTypes} from "../components/Draggable";
import {MyStickersStrings} from "../res/strings";
import {IToast} from "../components/MyToast";

const PACKET_OPENING_ERROR_MESSAGES = {
  NOT_ENOUGH_STICKERS: "En este momento no tenemos paquetes disponibles",
  SERVER_ERROR: "Ha ocurrido un error al intentar abrir el paquete",
  USER_DOESNT_HAVE_PACKETS: "No tienes paquetes para abrir."
}

//TODO: VALIDAR QUE EL USUARIO TIENE PAQUETES PARA ABRIR

function PacketOpen() {
  const user = useUser();
  /*Tiene las 5 figuritas que se muestran*/
  /*TODO: ojo que este estado es local, no actualiza el user context
  *  este se actualiza recien en el momento que se hace un restore*/
  const DESKTOP_SIZE = 1230;
  const [openedPacketStickers, setOpenedPacketStickers] = useState<ISticker[]>([])
  const [showPacketOpeningError, setShowPacketOpeningError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false)
  const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth >= DESKTOP_SIZE);
  const [isMouseOverAlbum, setMouseOverAlbum] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fadeInTimeout = 600;
  const navigate = useNavigate();

  const openPacket = async () => {
    const requestBody = {
      user_id: user._id
    }
    if (user.package_counter === 0) {
      return;
    }
    setLoading(true);
    try{
      const {data: openedPacketStickers}  = await client.post(`/stickers/package`, requestBody);
      setOpenedPacketStickers(openedPacketStickers)
      await user.restore(user.mail)
      setLoading(false);
      setOpened(true);
    } catch (error : any){
      // TODO: meter toda la logica de manejo de error en un servicio global o algo asi
      if (error.response) {
        if(error.response.data?.detail.includes("No stickers at the moment to create a package")){
          setErrorMessage(PACKET_OPENING_ERROR_MESSAGES.NOT_ENOUGH_STICKERS)
        }
        if(error.response.data?.detail.includes("doesn't have any packages to open")) {
          setErrorMessage(PACKET_OPENING_ERROR_MESSAGES.USER_DOESNT_HAVE_PACKETS)
        }
        if(errorMessage === undefined || errorMessage.length === 0) {
          setErrorMessage(PACKET_OPENING_ERROR_MESSAGES.SERVER_ERROR)
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        setErrorMessage(PACKET_OPENING_ERROR_MESSAGES.SERVER_ERROR)
        console.log('Error', error.message);
      }
      console.log(error.config);
      setLoading(false);
      setShowPacketOpeningError(true)
    }
  }

  const goToMyStickers = () => {
    navigate(ROUTES.MYSTICKERS);
  }

  const goToAlbum = () => {
    navigate(ROUTES.MYALBUM);
  }

  const closeshowPacketOpeningError = () => {
    setShowPacketOpeningError(false)
  }

  const closeToast = () => {
    setToast({...toast, isOpen:false})
  }

  const [toast, setToast] = useState<IToast>({header:"", body:"", isOpen:false, onClose: closeToast})

  const addStickerToAlbum = async (sticker: ISticker) => {
    if(sticker.is_on_album){
      setToast({...toast, header: "", body:MyStickersStrings.STICKERS_TOAST_PASTE_ERROR, isOpen:true})
      return
    }
    navigate("../my-album?country=" + sticker.country + "&position=" + sticker.number + "&stickerId=" + sticker.id)
  }

  const [{isOverAlbum}, dropAlbum] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (item: ISticker) => addStickerToAlbum(item),
    collect: (monitor) => ({
      isOverAlbum: monitor.isOver(),
    })
  }))

  const updateMedia = () => {
    setDesktop(window.innerWidth >= DESKTOP_SIZE)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  })

  return (
      <React.Fragment>
        <MyNavbar/>
        <Container className={"bg-gradient-orange m-0 p-0" + (isDesktop ? " overflow-hidden h-90vh" : "")} fluid>
          {opened &&
              <>
              <Row className="h-25">
                <h1 className="mt-4 text-center text-white align-self-center" style={{fontSize: 30}}>RECIBISTE</h1>
              </Row>
              {/* Los stickers del paquete abierto */}
              <Row className="justify-content-center m-0 p-0 align-items-center">
                <Col className="col-10 justify-content-center d-flex">
                  <Row className="justify-content-center">
                    {openedPacketStickers.map((player, index) =>
                        <Col className="d-flex justify-content-center m-0 ml-2" key={index} >
                          <Row className="justify-content-center pb-5 d-flex">
                            <Fade className="d-flex justify-content-center "
                                  appear={true}
                                  timeout={index * fadeInTimeout}>
                                <Sticker
                                    player={player}
                                    style={globalStickerStyles.stickerMedium}
                                    showNotInAlbum={!player.is_on_album}
                                    cardClassName={"floating " + (player.is_on_album ? "" : "card-text-sticker--shadow card-sticker--shadow")}
                                    draggable={!player.is_on_album}
                                />
                            </Fade>
                          </Row>
                        </Col>
                    )}
                  </Row>
                </Col>
                {/* GO TO MY STICKERS */}
                {isDesktop &&
                    <Col className="col-1 justify-content-center d-flex ">
                      <span>
                        <i onClick={goToMyStickers}
                           className="ni ni-bold-right text-white"
                           style={{fontSize: 60, cursor: "pointer"}}
                           id="mystickers-pointer"
                        >
                          <UncontrolledTooltip
                              target="mystickers-pointer"
                          >
                            Mis Figuritas
                          </UncontrolledTooltip>
                        </i>
                      </span>
                    </Col>}
              </Row>
              {/*  ALBUM */}
              <Row className="m-0 p-0 justify-content-center">
                <Col className="d-flex col-2 justify-content-center">
                  {isMouseOverAlbum &&
                      <span className="floating text-white text-center">Ir al Album</span>
                  }
                </Col>
              </Row>
              <Row className="m-0 p-0 justify-content-center">
                <div className={"col col-md-4 col-sm-12 card-packet-album-image d-flex justify-content-center "
                + (isOverAlbum ? "card-packet-album-image-drop" : "")}
                     ref={dropAlbum}
                     onClick={goToAlbum}
                >
                  <img src={require("../assets/img/album_book.png")}
                       onMouseOver={() => {setMouseOverAlbum(true)}}
                       onMouseLeave={() => {setMouseOverAlbum(false)}}
                  />
                </div>
              </Row>
              </>
          }
          {/* OPEN PACKET VIEW */}
          {!opened &&
              <>
                <Row className="h-25">
                  <h1 className="mt-4 text-center text-white align-self-center" style={{fontSize: 30, cursor: "default"}}>ABRIR PAQUETE</h1>
                </Row>
                <Row className="h-90vh m-0 p-0" >
                  <Col className="justify-content-center" >
                    <Packet
                        onOpenPacket={openPacket}
                        unopenedPacketsQty={user.package_counter}
                        style={{maxWidth: "80%", cursor: "pointer"}}
                        loading={loading}
                    />
                  </Col>
                </Row>
              </>
          }
          <MyModal header={"Error al abrir paquete"}
                   body={errorMessage}
                   isOpen={showPacketOpeningError}
                   onAccept={closeshowPacketOpeningError}/>
        </Container>
      </React.Fragment>
  )
}

export default PacketOpen;
