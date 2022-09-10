import React, {Component} from "react";
import MyNavbar from "../components/MyNavbar";

class MyStickers extends Component<any, any>{

  render() {
    return (
      <React.Fragment>
        <MyNavbar/>
        <div className="container text-center">
          <div className="row row-cols-2">
            <div className="col">Column</div>
            <div className="col">Column</div>
            <div className="col">Column</div>
            <div className="col">Column</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyStickers
