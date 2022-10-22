import React, {useEffect, useRef, useState} from "react";
import Stickers from "../components/stickers/Stickers";
import fetchUserStickers from "../services/apicalls";
import {Filters} from "./MyStickers";
import {useUser} from "../context/UserContext";
import {ISticker} from "../components/Sticker";
import MyNavbar from "../components/MyNavbar";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {debugStyle, globalStickerStyles} from "../res/globalStyles";
import {isSearchValid} from "../services/validator";
import {Button} from "reactstrap";
import StickerStack from "../components/stickers/StickerStack";

const CreateExchange = () => {
  const user = useUser()
  const initialFilterState: Filters = {
    name: undefined,
    country: undefined
  }
  const _searchFilters = useRef<Filters>(initialFilterState);
  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])

  const [isGiving, setIsGiving] = useState(true);

  const PICKING_STATE_TITLE = {
    give: "Selecciona las figuritas a dar",
    receive: "Selecciona las figuritas a recibir"
  }

  useEffect(() => {
    _fetchUserStickers()
  }, [])

  const _fetchUserStickers = async () => {
    console.log(_searchFilters.current)
    const stickers = await fetchUserStickers(user._id, _searchFilters.current)
    setFetchedStickers(stickers)
  }

  const onChangeHandler = ({target: {id, value}}: any) => {
    // @ts-ignore
    _searchFilters.current[id] = value.toLowerCase();
    if(isSearchValid(value)){
      _fetchUserStickers();
    }
  }

  const selectReceive = () => {
    setIsGiving(false)
  }

  const clean = () => {
    //
  }

  const SearchBar = () => {
    return (
      <div className="d-flex flex-row align-items-center">
        <i className="fas fa-search"/>
        <input
          id="name"
          type="text"
          placeholder="Buscar"
          onChange={onChangeHandler}
        />
      </div>
    );
  }

  const StickersPicker = () => {
    return (
      <div className="card p-1" style={debugStyle.containerRed}>
        {/*TODO titulo depende de que estoy eligiendo*/}
        <div className="row">
          <h1>{PICKING_STATE_TITLE.give}</h1>
        </div>
        {/*Buscador y botones*/}
        <div className="row">
          <div className="d-flex flex-row">
            <SearchBar/>
            <Button onClick={selectReceive}>A recibir</Button>
            <Button onClick={clean}>Limpiar</Button>
          </div>
        </div>
        <div className="row">
          {/*Listado de stickers*/}
          <Stickers stickers={fetchedStickers} style={globalStickerStyles.stickerSmall}/>
        </div>
      </div>
    )
  }

  const MyExchangeCreator = () => {
    return (
      <div className="card" style={debugStyle.containerBlue}>
        <div className="row">
          <div className="col">
            <p>Voy a dar</p>
            <StickerStack stickers={[]}/>
          </div>
          <div className="col">
            <p>Voy a recibir</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <React.Fragment>
        <MyNavbar/>
        <div className="container" style={debugStyle.container}>
          <div className="row">
            {/*Selector de figuritas*/}
            <div className="col">
              <StickersPicker/>
            </div>
            {/*Intercambio*/}
            <div className="col">
              <MyExchangeCreator/>
            </div>
          </div>
        </div>
      </React.Fragment>
    </DndProvider>

  )
}

export default CreateExchange
