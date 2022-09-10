import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";
import Sticker, {IPlayer} from "../components/Sticker";
import {getPlayersData} from "../data/playersData";

type IPlayers = {
  players: IPlayer[]
}

/*
id: number;
name: string;
dateOfBirth: Date;
weight: number;
height: number;
position: number;
country: string;
image: string;
 */

class MyStickers extends Component<any, any>{
  state: IPlayers = {
    players: getPlayersData()
  }


  render() {
    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-4">
            {this.state.players.map((player, index) =>
              <div key={player.id} className="col"><Sticker player={player}/></div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyStickers
