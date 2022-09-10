import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IPlayer} from "../components/Sticker";
import {getPlayersData} from "../data/playersData";

type IPlayers = {
  players: IPlayer[]
}

class MyStickers extends Component<any, any>{
  state: IPlayers = {
    players: getPlayersData()
  }

  render() {

    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-auto">
            {this.state.players.map((player, index) =>
              <div key={player.id} className="my-1">
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
