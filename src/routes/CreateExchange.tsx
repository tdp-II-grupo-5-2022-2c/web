import React, {useEffect, useRef, useState} from "react";
import {Stickers, AllStickers} from "../components/stickers/Stickers";
import {fetchAllStickers, fetchUserStickers} from "../services/apicalls";
import {Filters} from "./MyStickers";
import {useUser} from "../context/UserContext";
import {ISticker, IStickerData} from "../components/Sticker";
import MyNavbar from "../components/MyNavbar";
import {useDrop} from "react-dnd";
import {debugStyle, globalStickerStyles} from "../res/globalStyles";
import {isSearchValid} from "../services/validator";
import {Button} from "reactstrap";
import {StickerStack, StickerStack2} from "../components/stickers/StickerStack";
import {CreateExchangeStrings} from "../res/strings";
import {DraggableTypes} from "../components/Draggable";

const CreateExchange = () => {
  const user = useUser()
  const initialFilterState: Filters = {
    name: undefined,
    country: undefined
  }
  const _searchFilters = useRef<Filters>(initialFilterState);
  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])
  const [allStickers, setAllStickers] = useState<IStickerData[]>([])

  const [isGiving, setIsGiving] = useState(true);
  const _isGiving = useRef(true);
  const [stickersToGive, setStickersToGive] = useState<ISticker[]>([])
  const [stickersToReceive, setStickersToReceive] = useState<IStickerData[]>([])

  const PICKING_STATE_TITLE = {
    give: "Selecciona las figuritas a dar",
    receive: "Selecciona las figuritas a recibir"
  }

  useEffect(() => {
    _fetchUserStickers()
  }, [])

  const _fetchUserStickers = async () => {
    const stickers = await fetchUserStickers(user._id, _searchFilters.current)
    setFetchedStickers(stickers)
  }

  const _fetchAllStickers = async () => {
    const stickers = await fetchAllStickers()
    setAllStickers(stickers)
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
    _isGiving.current = false
    _fetchAllStickers()
  }

  const selectGive = () => {
    setIsGiving(true)
    _isGiving.current = true
  }

  const clean = () => {
    setStickersToGive([])
    setStickersToReceive([])
    setIsGiving(true)
    _isGiving.current = true
  }

  function contains(oldStickers: ISticker[], sticker: ISticker) {
    const result: number = oldStickers.findIndex((element: ISticker) => element.id === sticker.id);
    if(result < 0){
      console.log("no se encontro duplicado")
    }
    return result
  }

  function contains2(oldStickers: IStickerData[], sticker:  IStickerData) {
    const result: number = oldStickers.findIndex((element: IStickerData) => element._id === sticker._id);
    console.log(sticker._id)
    if(result < 0){
      console.log("no se encontro duplicado")
    }
    return result
  }

  const addStickerToExchangeGive = async (sticker: ISticker) => {
    if(_isGiving.current){
      console.log("add sticker to give")
      setStickersToGive(oldStickersToGive => (
        contains(oldStickersToGive, sticker) < 0 ? [...oldStickersToGive, sticker]
          : [...oldStickersToGive]
      ));
    }
  }

  const addStickerToExchangeReceive = async (sticker: IStickerData) => {
    if(!_isGiving.current) {
      console.log("add sticker to receive")
      setStickersToReceive(oldStickersToReceive => (
          contains2(oldStickersToReceive, sticker) < 0 ? [...oldStickersToReceive, sticker]
          : [...oldStickersToReceive]
      ));
    }
  }

  const [{isOverGive}, dropExchangeGive] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (sticker: ISticker) => addStickerToExchangeGive(sticker),
    collect: (monitor) => ({
      isOverGive: monitor.isOver(),
    })
  }))

  const [{isOverReceive}, dropExchangeReceive] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (sticker: IStickerData) => addStickerToExchangeReceive(sticker),
    collect: (monitor) => ({
      isOverReceive: monitor.isOver(),
    })
  }))

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
            {isGiving ? <Button onClick={selectReceive}>A recibir</Button> :
              <Button onClick={selectGive}>A dar</Button>
            }
            <Button onClick={clean}>Limpiar</Button>
          </div>
        </div>
        <div className="row row-cols-auto">
          {/*Listado de stickers*/}
          {isGiving ?
            <Stickers stickers={fetchedStickers} style={globalStickerStyles.stickerSmall}/>
            : <AllStickers stickers={allStickers} style={globalStickerStyles.stickerSmall}/>
          }
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
            <div ref={dropExchangeGive}>
              <StickerStack stickers={stickersToGive}/>
              {isGiving && <div className="card text-center">
                <p>{CreateExchangeStrings.EXCHANGE_GIVE_HINT}</p>
              </div>}
            </div>
          </div>
          <div className="col">
            <p>Voy a recibir</p>
            <div ref={dropExchangeReceive}>
              <StickerStack2 stickers={stickersToReceive}/>
              {!isGiving && <div className="card text-center">
                <p>{CreateExchangeStrings.EXCHANGE_GIVE_HINT}</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
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

  )
}

export default CreateExchange
