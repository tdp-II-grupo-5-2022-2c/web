import React, {useEffect, useRef, useState} from "react";
import Stickers from "../components/stickers/Stickers";
import client from "../services/config";
import fetchUserStickers from "../services/apicalls";
import {Filters} from "./MyStickers";
import {useUser} from "../context/UserContext";
import {ISticker} from "../components/Sticker";
import MyNavbar from "../components/MyNavbar";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {debugStyle} from "../res/globalStyles";

const CreateExchange = () => {
  const user = useUser()
  const initialFilterState: Filters = {
    name: undefined,
    country: undefined
  }
  const _searchFilters = useRef<Filters>(initialFilterState);
  const [fetchedStickers, setFetchedStickers] = useState<ISticker[]>([])

  useEffect(() => {
    _fetchUserStickers()
  }, [])

  const _fetchUserStickers = async () => {
    console.log(_searchFilters.current)
    const stickers = await fetchUserStickers(user._id, _searchFilters.current)
    setFetchedStickers(stickers)
  }

  const StickersPicker = () => {
    return (
      <div className="card" style={debugStyle.containerRed}>
        {/*TODO titulo depende de que estoy eligiendo*/}
        <div className="row">

        </div>
        {/*Buscador y botones*/}
        <div className="row">

        </div>
        <div className="row">
          {/*Listado de stickers*/}
          {/*TODO: crear un componente reutilizable
          para la lista de figuritas pq lo uso mucho*/}
          <Stickers stickers={fetchedStickers}/>
        </div>
      </div>
    )
  }

  const MyExchangeCreator = () => {
    return(
      <div className="card" style={debugStyle.containerBlue}>
        <p>Aca va el creador de intercambio</p>
      </div>
    )
  }

  return(
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
