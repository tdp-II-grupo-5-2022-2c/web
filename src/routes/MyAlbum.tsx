import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";
import StickerPlaceHolder from "../components/StickerPlaceHolder";
import {IPlayers} from "./MyStickers";
import {getAlbumData} from "../data/albumData";
import AlbumPage from "../components/AlbumPage";


class MyStickers extends Component<any, any>{
  state: IPlayers = {
    players: []
  }

  /* el album lo podemos hardcodear porque es siempre el mismo asi que
    una vez montado el album queda asi, pretendo que cada StickerPlaceHolder pueda tener adentro un Sticker
    como un contenedor, los placeholders van a ser estaticos durante toda la aplicacion, lo que cambia
    es si contiene o no una figurita
    */
  componentDidMount() {
    console.log("MyAlbum - Did Mount")
    const _players = getAlbumData()
    this.setState({players: _players})
  }

  //TODO: yo siempre muestro una sola pagina en pantalla a pesar de tener todas
  // hacer una lista de pagina de album y solo renderizar una
  // <AlbumPage players = {this.state.albumPage.at(#numeroDePagina)}

  render() {
    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-auto">
              <AlbumPage players={this.state.players}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyStickers
