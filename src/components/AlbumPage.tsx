import React from "react";
import StickerPlaceHolder from "../components/StickerPlaceHolder";
import {IPlayers} from "../routes/MyStickers";

type Props = IPlayers

const AlbumPage = ({players}:Props) => {

    // TODO: pasar por Prop el color del background de la pagina del album
    // TODO: pasar por Prop el pais
    const styles = {
      albumBg:{
        backgroundColor: "lightblue"
      }
    }

    const OFFSET = 1

    return (
      <React.Fragment>
        <div className="container" style={styles.albumBg}>
          <div className="row row-cols-auto">
            {players.map((player, index) =>
              <div key={player.id} className="gy-5">
                <StickerPlaceHolder player={player} number={index + OFFSET}/>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
}

export default AlbumPage
