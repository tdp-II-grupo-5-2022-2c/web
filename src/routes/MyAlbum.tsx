import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {getAlbumData} from "../data/albumData";
import AlbumPage from "../components/AlbumPage";
import {IPlayer} from "../components/Sticker";
import {useSearchParams} from "react-router-dom";

export type ITeam = {
  players: IPlayer[];
  country: string;
  pageNumber: number
}

const MyAlbum = () => {
  // TODO: los equipos son constantes, no tiene sentido que esten en un state
  const [teams, setTeams] = useState([] as ITeam[])
  const [selectedPage, setSelectedPage] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();

  /* el album lo podemos hardcodear porque es siempre el mismo asi que
    una vez montado el album queda asi, pretendo que cada StickerPlaceHolder pueda tener adentro un Sticker
    como un contenedor, los placeholders van a ser estaticos durante toda la aplicacion, lo que cambia
    es si contiene o no una figurita
    */
  useEffect(() => {
    console.log("MyAlbum - Did Mount")
    const _teams = getAlbumData()
    setTeams(_teams)
  }, [])

  // TODO: deberia ejecutarse cada vez que hay un queryParam
  useEffect(() => {
    // TODO: poner en una constante global este queryParam
    const stickerIdToBePasted = searchParams.get("stickerIdToBePasted")
    if(stickerIdToBePasted){
      console.log("stickerIdToBePasted " + stickerIdToBePasted)
    }
  })

  const validateSelectedPage = () => {
    return teams &&
      selectedPage >= 0 &&
      selectedPage < teams.length;
  }

  const nextPage = () => {
    let _nextSelectedPage = selectedPage >= teams.length - 1 ?
      teams.length - 1 :
      (selectedPage + 1)
      setSelectedPage(_nextSelectedPage)
  }

  const previousPage = () => {
    let _previousSelectedPage = selectedPage <= 0 ?
      0 : (selectedPage - 1)
    setSelectedPage( _previousSelectedPage)
  }

    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-auto">
            {validateSelectedPage() &&
              <AlbumPage team={teams[selectedPage]}/>
            }
          </div>
          <button className={"btn btn-primary btn-sm m-2"} onClick={previousPage}>Anterior</button>
          <button className={"btn btn-primary btn-sm m-2"} onClick={nextPage}>Siguiente</button>
        </div>
      </React.Fragment>
    );
}

export default MyAlbum
