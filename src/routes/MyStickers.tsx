import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IBackEndSticker, IPlayer} from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";
import {useDrop} from "react-dnd";
import {Draggable} from "../components/Draggable";
import DropBoard from "../components/DropBoard";
import {useNavigate} from "react-router-dom";
import client from "../services/config";
import {useAuth} from "../context/authContext";

const MyStickers = () => {
  const [players, setPlayers] = useState([] as IBackEndSticker[])
  const navigate = useNavigate();
  const {user} = useAuth()

  useEffect(() => {
    //setPlayers(getArgentinaPlayersData())
    fetchUserStickers()
  }, [])

  // TODO: una vez hecho el endpoint hay que probar y quitar el getARgentinaPlayersData que esta mockeado
  const fetchUserStickers = async () => {
    const mockedUser = {id: "63238bf658c62f37cba18c64"}
    const {data: stickers} = await client.get(`/users/${mockedUser.id}/stickers`);
    setPlayers(stickers)
  }

  const addStickerToAlbum = (playerId: number) => {
    console.log("Sticker id " + playerId + " into album")
    //TODO: navegar a MyAlbum pasando por props el id del jugador;
    // una opcion es pasar por queryParams y usar el hook useSearchParams y obtener de ahi el id de figurita a pegar

    // TODO: validar que no este en el album; validar que tampoco este para intercambiar????????
    navigate("../my-album?stickerIdToBePasted=" + playerId)
  }

  // TODO: definir el accept en una constante
  const [{isOver}, drop] = useDrop(() => ({
    accept: "sticker",
    drop: (item: any) => addStickerToAlbum(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }))

  // TODO: a draggable le podria pasar el type por props
  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container text-center">
        <div className="row row-cols-auto">
          {players.map((player, index) =>
            <div key={player.id} className="gy-5">
              <Draggable childrenId={player.id}>
                <Sticker player={player}/>
              </Draggable>
            </div>
          )}
          <div className="gy-5" ref={drop}>
            <DropBoard/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default MyStickers
