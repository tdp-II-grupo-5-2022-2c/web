import React, {ChangeEvent, useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IBackEndSticker} from "../components/Sticker";
import {useDrop} from "react-dnd";
import {Draggable, DraggableTypes} from "../components/Draggable";
import DropBoard from "../components/DropBoard";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import client from "../services/config";
import MyModal from "../components/MyModal";
import {useUser} from "../context/UserContext";
import {Button, CardText, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Row} from "reactstrap";

type Filters = {
  name?: string,
  country?: string
}

const MyStickers = () => {
  const user = useUser();
  const [fetchedStickers, setFetchedStickers] = useState([] as IBackEndSticker[])
  const navigate = useNavigate();
  const [showPasteOk, setShowPasteOk] = useState(false);
  const [searchFilters, setSearchFilters] = useState<Filters>({name: undefined, country: undefined});
  const {register} = useForm();

  const countriesToFilter = {
    'Argentina': 'ARG',
    'Mexico': 'MEX',
    'Francia': 'FRA',
    'Qatar': 'QAT'
  }

  useEffect(() => {
    fetchUserStickers()
  }, [])

  const fetchUserStickers = async () => {
    try{
      const {data: stickers} = await client.get(`/users/${user.id}/stickers`, {
        params: searchFilters
      });
      setFetchedStickers(stickers)

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
    navigate("../my-album?country=" + sticker.country + "&position=" + sticker.number + "&stickerId=" + sticker.id)
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (item: IBackEndSticker) => addStickerToAlbum(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }))

  const onChangeHandler = ({target: {id, value}}: any) => {
    let _searchFilters = searchFilters;
    console.log("Search filters")
    console.log("id:" + id + " value:" + value)
    // @ts-ignore
    _searchFilters[id] = value;
    setSearchFilters(_searchFilters);
    fetchUserStickers();
  }

  const onRadioClick = (value: string) => {
    console.log("Clicked" + value)
    let _searchFilters = searchFilters;
    _searchFilters["country"] = value;
    setSearchFilters(_searchFilters);
    fetchUserStickers();
  }

  function handleChange() {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length >= 3 || e.target.value.length === 0) onChangeHandler(e)
    };
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container fluid>
        <Row>
          <Col className="col-md-2">
            <Row className="h-100 m-7">
              <Form>
                <h3 className="text-gray">Pais</h3>
                {Object.entries(countriesToFilter).map(([key, value]) =>
                  <FormGroup key={value} className="custom-control custom-radio mb-3">
                    <Button
                      color="primary"
                      outline
                      onClick={() => onRadioClick(value)}
                      active={searchFilters.country === key}
                    >         {key}
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
                      <i className="fas fa-search" />
                    </InputGroupText>
                    <Input placeholder="Buscar" type="text" id="name" {...register("name", {
                      onChange: handleChange()
                    })} />
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
            <Row>
              {fetchedStickers.map((player, index) =>
                  player.quantity > 0 &&
                    <Col key={player.id} className="col-md-3 p-3 d-flex justify-content-center">
                      <Draggable sticker={player} type={DraggableTypes.STICKER}>
                        <Sticker player={player}
                          displayBadge={true}/>
                      </Draggable>
                    </Col>
              )}
              {fetchedStickers && fetchedStickers.length === 0 &&
                <Col>
                    <CardText>No se encontró ninguna figurita con este filtro</CardText>
                </Col>
              }
              {/*  ACA VA EL DROPZONE PARA LA COLA DE FIGUS REPETIDAS */}
            </Row>
          </Col>
          <Col className="col-md-2">
            <div className="h-100" ref={drop}>
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
