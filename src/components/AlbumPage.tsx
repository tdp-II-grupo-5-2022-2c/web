import React from "react";
import StickerPlaceHolder from "../components/StickerPlaceHolder";
import {ITeam} from "../routes/MyAlbum";

type Props = {
  team: ITeam,
  pasteId?: number
  onPaste?: (pasteId: number) => void;
}

const AlbumPage = ({team, pasteId, onPaste}: Props) => {

  // TODO: pasar por Prop el color del background de la pagina del album
  // TODO: pasar por Prop el pais
  const styles = {
    albumBg: {
      backgroundColor: "lightblue"
    }
  }

  const OFFSET = 1

  return (
    <React.Fragment>
      <div className="container" style={styles.albumBg}>
        {team && team.players && <div className="row row-cols-auto">
          {team.players.map((player, index) =>
            <div key={player.id} className="gy-5">
              {!pasteId && !onPaste && <StickerPlaceHolder player={player} number={index + OFFSET}/>}
              {pasteId && onPaste && <StickerPlaceHolder player={player} number={index + OFFSET} pasteId={pasteId} onPaste={() => onPaste(pasteId)}/>}
            </div>
          )}
        </div>}
      </div>
    </React.Fragment>
  );
}

export default AlbumPage
