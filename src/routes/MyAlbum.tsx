import React, {useEffect, useRef, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {getAlbumData} from "../data/albumData";
import AlbumPage from "../components/AlbumPage";
import {IPlayer} from "../components/Sticker";
import {useSearchParams} from "react-router-dom";
import {ISlicedPlayer} from "../components/StickerPlaceHolder";
import client from "../services/config";
import {useAuth} from "../context/authContext";

// TODO: despues eliminar el IPlayer[] dado que es data mockeada
export type ITeam = {
  players: IPlayer[] | ISlicedPlayer[];
  country: string;
  pageNumber: number
}

const MyAlbum = () => {
  //TODO: los equipos son constantes, no tiene sentido que esten en un state
  // si tiene sentido si los obtengo de una query al back que es lo que supongo que va a pasar

  const [teams, setTeams] = useState([] as ITeam[])
  const refTeams = useRef([] as ITeam[])
  const [selectedPage, setSelectedPage] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();

  const [isPasting, setIsPasting] = useState(false);
  const [pasteId, setPasteId] = useState<number | undefined>(0);

  const {user} = useAuth()

  /* el album lo podemos hardcodear porque es siempre el mismo asi que
    una vez montado el album queda asi, pretendo que cada StickerPlaceHolder pueda tener adentro un Sticker
    como un contenedor, los placeholders van a ser estaticos durante toda la aplicacion, lo que cambia
    es si contiene o no una figurita
    */
  useEffect(() => {
    console.log("MyAlbum - Did Mount")
    //TODO: hacer una unica request al back con la data de todos los jugadores del album con sus ids; por country
    // entonces se llenan los placeholders de cada album
    const _teams = getAlbumData()
    setTeams(_teams)
    refTeams.current = getAlbumData()
  }, [])

  useEffect(() => {
    // TODO: poner en una constante global este queryParam
    const stickerIdToBePasted = searchParams.get("stickerIdToBePasted")
    if (stickerIdToBePasted) {
      console.log("stickerIdToBePasted " + stickerIdToBePasted)
      goToAlbumPage(stickerIdToBePasted)
    }
  }, [searchParams])

  const goToAlbumPage = (stickerId: string) => {
    const PLAYERS_PER_ALBUM_PAGE = 11
    let newSelectedPage = selectedPage
    let counter = 1
    let notFound = true
    let teamIndex = 0
    // TODO: no se que tan mal esta pero la unica forma de tener el state cuando entro por el navigate es usando un useRef
    while (notFound && teamIndex < refTeams.current.length) {
      const players = refTeams.current[teamIndex].players
      let playerIndex = 0
      while (notFound && playerIndex < players.length) {
        const player = players[playerIndex]
        if (player.id.toString() === stickerId) {
          newSelectedPage = (counter - 1) / (PLAYERS_PER_ALBUM_PAGE)
          notFound = false
        }
        counter++
        playerIndex++
      }
      teamIndex++
    }

    newSelectedPage = Math.floor(newSelectedPage)
    console.log("goToAlbumPage - Paste id album page " + newSelectedPage)
    setSelectedPage(newSelectedPage)
    setPasteId(Number(stickerId));
    setIsPasting(true)

  }

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
    setSelectedPage(_previousSelectedPage)
  }

  const onPaste = async (pasteId : number) => {
    console.log(user)

    // TODO: poner aca la api call para pegar la figu en el album
    /*const { data: response } = await client.patch(
      `/users/${user._id}/stickers/${pasteId}/paste`
    );*/

    console.log("API REQUEST TO PASTE " + pasteId)
    console.log("Response")
    //console.log(response)

    setIsPasting(false)
    setPasteId(undefined)
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container text-center">
        <div className="row row-cols-auto">
          {validateSelectedPage() &&
              <div>
                {!isPasting && <AlbumPage team={teams[selectedPage]}/>}
                {isPasting && <AlbumPage team={teams[selectedPage]} pasteId={pasteId} onPaste={onPaste}/>}
              </div>
          }
        </div>
        <button className={"btn btn-primary btn-sm m-2"} onClick={previousPage}>Anterior</button>
        <button className={"btn btn-primary btn-sm m-2"} onClick={nextPage}>Siguiente</button>
      </div>
    </React.Fragment>
  );
}

export default MyAlbum
