import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";
import {getAlbumData} from "../data/albumData";
import AlbumPage from "../components/AlbumPage";
import {IPlayer} from "../components/Sticker";

export type ITeam = {
  players: IPlayer[];
  country: string;
  pageNumber: number
}

type IAlbum = {
  teams : ITeam[];
  selectedPage: number
}

class MyAlbum extends Component<any, any>{
  // TODO: los equipos son constantes, no tiene sentido que esten en un state
  state: IAlbum = {
    teams:[],
    selectedPage: 0
  }

  /* el album lo podemos hardcodear porque es siempre el mismo asi que
    una vez montado el album queda asi, pretendo que cada StickerPlaceHolder pueda tener adentro un Sticker
    como un contenedor, los placeholders van a ser estaticos durante toda la aplicacion, lo que cambia
    es si contiene o no una figurita
    */
  componentDidMount() {
    console.log("MyAlbum - Did Mount")
    const _teams = getAlbumData()
    this.setState({teams: _teams})
  }

  //TODO: yo siempre muestro una sola pagina en pantalla a pesar de tener todas
  // hacer una lista de pagina de album y solo renderizar una
  // <AlbumPage players = {this.state.albumPage.at(#numeroDePagina)}

  private validateSelectedPage() {
    return this.state.teams &&
      this.state.selectedPage >= 0 &&
      this.state.selectedPage < this.state.teams.length;
  }

  render() {
    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-auto">
            {this.validateSelectedPage() &&
                <AlbumPage team={this.state.teams[this.state.selectedPage]}/>}
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default MyAlbum
