import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {ISticker} from "../components/stickers/Sticker";
import {useDrop} from "react-dnd";
import {DraggableTypes} from "../components/Draggable";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import client from "../services/config";
import {MyModal} from "../components/MyModal";
import {useUser} from "../context/UserContext";
import {
  Button,
  CardText,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row, Spinner
} from "reactstrap";
import {ROUTES} from "./RoutesNames";
import {CreateExchangeStrings, MyStickersStrings} from "../res/strings";
import MyToast, {IToast} from "../components/MyToast";
import Error from "../components/modals/Error";
import {globalStickerStyles} from "../res/globalStyles";
import Packet from "../components/Packet";

export type Filters = {
  name?: string,
  country?: string
}

const MyStickers = () => {
  const user = useUser();
  const navigate = useNavigate();
  const {register} = useForm();

  const DESKTOP_SIZE = 1230;
  const [showPasteOk, setShowPasteOk] = useState(false);
  const initialModalState = {
    header: "",
    body: "",
  };
  const [errorModal, setErrorModal] = useState(initialModalState)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])
  const [isMouseOverAlbum, setMouseOverAlbum] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth >= DESKTOP_SIZE);

  const initialFilterState: Filters = {
    name: undefined,
    country: undefined
  }
  const _searchFilters = useRef<Filters>(initialFilterState);

  const countriesToFilter = {
    'Argentina': 'ARG',
    'Mexico': 'MEX',
    'Francia': 'FRA',
    'Brasil': 'BRA',
    'Todos': 'ALL'
  }

  const closeToast = () => {
    setToast({...toast, isOpen:false})
  }

  const [toast, setToast] = useState<IToast>({header:"", body:"", isOpen:false, onClose:closeToast})

  useEffect(() => {
    fetchUserStickers()
  }, [])

  const fetchUserStickers = async () => {
    console.log(_searchFilters.current)
    setLoading(true);
    try {
      const {data: stickers} = await client.get(`/users/${user._id}/stickers`, {
        params: _searchFilters.current
      });
      setFetchedStickers(stickers)
    } catch (error: any) {
      console.error(
        "Request failed, response:",
        error
      );
    }
    setLoading(false);
  }

  const closeShowPasteOk = () => {
    setShowPasteOk(false)
  }

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

  const onChangeHandler = ({target: {id, value}}: any) => {
    // @ts-ignore
    _searchFilters.current[id] = value;
    fetchUserStickers();
  }

  const onCountryClick = (value: string) => {
    _searchFilters.current["country"] = value
    if (value === countriesToFilter.Todos) {
      _searchFilters.current = initialFilterState;
    }
    console.log(_searchFilters)
    fetchUserStickers();
  }

  function handleChange() {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length >= 3 || e.target.value.length === 0) onChangeHandler(e)
    };
  }

  const hasStickers = (stickers: ISticker[]) => {
    return (stickers.findIndex(element => element.quantity > 0) >= 0)
  }

  const goToCreateExchange = () => {
    if(!user.is_profile_complete){
      setErrorModal({header: CreateExchangeStrings.ERROR_PROFILE_NOT_COMPLETED_TITLE,
        body: CreateExchangeStrings.ERROR_PROFILE_NOT_COMPLETED})
      setShowErrorModal(true)
      return
    }
    navigate("../create-exchange")
  }

  function goToDailyPacket() {
    navigate(`../${ROUTES.DAILYPACKET}`)
  }

  const StickersList = ({stickers}: { stickers: ISticker[] }) => {
    return <React.Fragment>
      {loading &&
          <>
            <Row className="m-1">
              <Spinner style={{height: '3rem', width: '3rem'}}
                       className="d-flex img-center" color="light" type="grow">
              </Spinner>
            </Row>
            <Row className="mt-2">
              <h1 className="text-white text-center">Buscando figuritas...</h1>
            </Row>
          </>
      }
      {/* Primero los que no están en el album, luego el resto */}
      {!loading && stickers.sort((a,b) => a.is_on_album < b.is_on_album ? -1 : 0).map((player, index) =>
        player.quantity > 0 &&
          <Col key={player.id} className="col-md-3 p-3 d-flex justify-content-center">
            <Sticker player={player}
                     displayBadge={true}
                     style={globalStickerStyles.stickerSmall}
                     showNotInAlbum={!player.is_on_album}
                     cardClassName={(player.is_on_album ? "" : "card-text-sticker--shadow card-sticker--shadow")}
                     draggable={!player.is_on_album}
            />
          </Col>
      )}
      {!loading && stickers && !hasStickers(stickers) && hasStickers(user.stickers) &&
          <Col className="align-items-center mt-9">
              <CardText className="text-white h1 text-center">No se encontró ninguna figurita con este filtro</CardText>
          </Col>
      }
    </React.Fragment>;
  }

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
      <Container className={"bg-qatar-img " + (isDesktop ? "h-90vh overflow-auto" : "")} fluid>
        <Row>
          <h1 className="mt-4 text-center text-white align-self-center" style={{fontSize: 30}}>MIS FIGURITAS</h1>
        </Row>
        <Row>
          <Col className="col-md-2 col-sm-12">
            <Row className="mt-5 justify-content-center">
              <Col className="col-auto">
                <Button onClick={goToCreateExchange}>Crear Intercambio</Button>
              </Col>
            </Row>
            <Row className="mt-4 align-content-start">
              <Form>
                <FormGroup className="custom-control custom-radio mb-3">
                  <Row className="m-0 p-0">
                    <Label className="text-start"><h1 className="text-white">País</h1></Label>
                  </Row>
                  {Object.entries(countriesToFilter).map(([key, value]) =>
                    <Row className="d-flex justify-content-start mb-2">
                      <Col className="col-auto">
                      <Button key={value}
                        className="text-white"
                        color="warning"
                        onClick={() => onCountryClick(value)}
                      >
                        {key}
                      </Button>
                      </Col>
                    </Row>
                  )}
                </FormGroup>
              </Form>
            </Row>
          </Col>
          <Col className="col-md-8 pr-6 pl-6">
            <Row className="mt-5">
              <Form className="navbar-search">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative bg-translucent-dark text-white">
                    <InputGroupText>
                      <i className="fas fa-search"/>
                    </InputGroupText>
                    <Input placeholder="Buscar"
                           type="text"
                           className="text-white"
                           id="name" {...register("name", {
                      onChange: handleChange()
                    })} />
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
            <Row className="flex-row">
              <Container fluid className="h-65vh bg-translucent-light border rounded mb-1" style={{
                overflowY: "auto",
                overflowX: "hidden"
              }}>
                <Row className="justify-content-center mt-3 mb-3">
                  <StickersList stickers={fetchedStickers}/>
                  {!hasStickers(fetchedStickers) && !hasStickers(user.stickers) &&
                    <Col className="col-auto">
                      <Row>
                        <h1 className="text-white text-center mt-9">No tienes figuritas, abrí un nuevo paquete</h1>
                      </Row>
                      <Row className="row-cols-auto justify-content-center">
                        {/*TODO: FIX ME. Debería validar si no tiene paquetes*/}
                        <Packet
                            onOpenPacket={goToDailyPacket}
                            unopenedPacketsQty={1}
                            style={{maxWidth: "40%", cursor: "pointer"}}
                            loading={loading}
                        />
                      </Row>
                    </Col>
                  }
                </Row>
              </Container>
            </Row>
          </Col>
          <Col className="col-md-2">
            <Row className="justify-content-center h-75">
              <div className="col col-12 d-flex justify-content-center" ref={dropAlbum}>
                {/*TODO: animar el album*/}
                <img
                    src={require("../assets/img/album_book.png")}
                    onMouseOver={() => {setMouseOverAlbum(true)}}
                    onMouseLeave={() => {setMouseOverAlbum(false)}}
                    style={{
                      position: "sticky",
                      top: "20rem",
                      maxWidth: "14rem",
                      maxHeight: "17rem"
                    }}
                />
              </div>
            </Row>
            <MyToast toast={toast} className={"bg-danger"}/>
          </Col>
        </Row>
      </Container>
      <MyModal header={"Figurita Pegada!"} body={"Ya no deberias ver mas tu figurita si era una sola"}
               isOpen={showPasteOk} onAccept={closeShowPasteOk}/>
      <Error modal={errorModal} isOpen={showErrorModal} onAccept={() => setShowErrorModal(false)}/>
    </React.Fragment>
  );

}

export default MyStickers;
