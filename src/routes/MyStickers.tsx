import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IBackEndSticker, IPlayer} from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";
import {useDrop} from "react-dnd";
import {Draggable, DraggableTypes} from "../components/Draggable";
import DropBoard from "../components/DropBoard";
import {useNavigate} from "react-router-dom";
import client from "../services/config";
import {useAuth} from "../context/authContext";

const MyStickers = () => {
  const [players, setPlayers] = useState([] as IBackEndSticker[])
  const navigate = useNavigate();
  const {user} = useAuth()

  useEffect(() => {
    fetchUserStickers()
  }, [])

  const fetchUserStickers = async () => {
    // TODO user mockeado
    const mockedUser = {id: "63238bf658c62f37cba18c64"}
    const {data: stickers} = await client.get(`/users/${mockedUser.id}/stickers`);
    setPlayers(stickers)
  }

  const addStickerToAlbum = async (playerId: number) => {
    console.log("Sticker id " + playerId + " into album")

    // Copy-paste de onPaste de MyAlbum
    // TODO: se debe usar el userContext
    const mockedUser = {id: "63238bf658c62f37cba18c64"}

    // TODO: poner aca la api call para pegar la figu en el album
    const { data: response } = await client.patch(
      `/users/${mockedUser.id}/stickers/${playerId}/paste`
    );

    console.log("API REQUEST TO PASTE " + playerId)
    console.log("Response")
    console.log(response)
    // Copy-paste de onPaste de MyAlbum

    // TODO: se quita la navegacion al album pq no esta incluida en los requisitos del Sprint 1
    // navigate("../my-album?stickerIdToBePasted=" + playerId)
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: DraggableTypes.STICKER,
    drop: (item: any) => addStickerToAlbum(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    })
  }))

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container text-center">
        <div className="row row-cols-auto">
          {players.map((player, index) =>
            <div key={player.id} className="gy-5">
              <Draggable childrenId={player.id} type={DraggableTypes.STICKER}>
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
