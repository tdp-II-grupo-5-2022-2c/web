import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IPlayer} from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Draggable} from "../components/Draggable";
import DropBoard from "../components/DropBoard";

class MyStickers extends Component<any, any>{
  state: { players: IPlayer[] } = {
    players: getArgentinaPlayersData()
  }

  render() {

    return (
      <React.Fragment>
        <MyNavbar/>
        <DndProvider backend={HTML5Backend}>
          <div className="container text-center">
            <div className="row row-cols-auto">
              {this.state.players.map((player, index) =>
                <div key={player.id} className="gy-5">
                  <Draggable>
                    <Sticker player={player}/>
                  </Draggable>
                </div>
              )}
              <div className="gy-5">
                <DropBoard/>
              </div>
            </div>
          </div>

        </DndProvider>
      </React.Fragment>
    );
  }
}

export default MyStickers
