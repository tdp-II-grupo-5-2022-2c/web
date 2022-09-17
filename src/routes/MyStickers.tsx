import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IPlayer} from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";

class MyStickers extends Component<any, any>{
  state: { players: IPlayer[] } = {
    players: getArgentinaPlayersData()
  }

  render() {

    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-auto">
            {this.state.players.map((player, index) =>
              <div key={player.id} className="gy-5">
                <Sticker player={player}/>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyStickers
