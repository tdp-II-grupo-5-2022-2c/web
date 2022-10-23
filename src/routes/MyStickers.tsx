import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {ISticker, IStickerData} from "../components/Sticker";
import {useDrop} from "react-dnd";
import {Draggable, DraggableTypes} from "../components/Draggable";
import DropBoard from "../components/DropBoard";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import client from "../services/config";
import {MyModal} from "../components/MyModal";
import {useUser} from "../context/UserContext";
import {Button, CardText, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import {ROUTES} from "./RoutesNames";
import {MyStickersStrings} from "../res/strings";

export type Filters = {
  name?: string,
  country?: string
}

const MyStickers = () => {
  const user = useUser();
  const navigate = useNavigate();
  const {register} = useForm();

  const [showPasteOk, setShowPasteOk] = useState(false);

  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])
  const initialFilterState: Filters = {
    name: undefined,
    country: undefined
  }
  const _searchFilters = useRef<Filters>(initialFilterState);

  const countriesToFilter = {
    'Argentina': 'ARG',
    'Mexico': 'MEX',
    'Francia': 'FRA',
    'Qatar': 'QAT',
    'Todos': 'ALL'
  }

  useEffect(() => {
    fetchUserStickers()
  }, [])

  const fetchUserStickers = async () => {
    console.log(_searchFilters.current)
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
  }

  const closeShowPasteOk = () => {
    setShowPasteOk(false)
  }

  const addStickerToAlbum = async (sticker: ISticker) => {
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

  const StickersList = ({stickers}: { stickers: ISticker[] }) => {
    return <React.Fragment>
      {stickers.map((player, index) =>
        player.quantity > 0 &&
          <Col key={player.id} className="col-md-3 p-3 d-flex justify-content-center">
              <Draggable sticker={player} type={DraggableTypes.STICKER}>
                  <Sticker player={player}
                           displayBadge={true}/>
              </Draggable>
          </Col>
      )}
      {stickers && stickers.length === 0 && user.stickers.length > 0 &&
          <Col>
              <CardText>No se encontró ninguna figurita con este filtro</CardText>
          </Col>
      }
    </React.Fragment>;
  }

  const goToCreateExchange = () => {
    navigate("../create-exchange")
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container fluid>
        <Row>
          <Col className="col-md-2">
            <Button onClick={goToCreateExchange}>Intercambiar</Button>
            <Row className="h-100 m-7">
              <Form>
                <h3 className="text-gray">Pais</h3>
                {Object.entries(countriesToFilter).map(([key, value]) =>
                  <FormGroup key={value} className="custom-control custom-radio mb-3">
                    <Button
                      color="primary"
                      outline
                      onClick={() => onCountryClick(value)}
                    >
                      {key}
                    </Button>
                  </FormGroup>
                )}
              </Form>
            </Row>
          </Col>
          <Col className="col-md-8 pr-6 pl-6">
            <Row>
              <Form className="navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      <i className="fas fa-search"/>
                    </InputGroupText>
                    <Input placeholder="Buscar" type="text" id="name" {...register("name", {
                      onChange: handleChange()
                    })} />
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
            <Row>
              <StickersList stickers={fetchedStickers}/>
              {user.stickers.length === 0 && fetchedStickers.length === 0 &&
                  <Col>
                      <CardText>No tienes figuritas, abrí un nuevo paquete</CardText>
                      <Button>
                          <a className="nav-link" href={ROUTES.DAILYPACKET}>Abrir paquete</a>
                      </Button>
                  </Col>
              }
            </Row>
          </Col>
          <Col className="col-md-2">
            <div className="row" ref={dropAlbum}>
              <DropBoard title={MyStickersStrings.PASTE_TO_ALBUM_TITLE} body={MyStickersStrings.PASTE_TO_ALBUM_BODY}/>
            </div>
          </Col>
        </Row>
      </Container>
      <MyModal header={"Figurita Pegada!"} body={"Ya no deberias ver mas tu figurita si era una sola"}
               isOpen={showPasteOk} onAccept={closeShowPasteOk}/>
    </React.Fragment>
  );

}

export default MyStickers
