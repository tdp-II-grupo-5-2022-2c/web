import {Component} from "react";

class MyStickers extends Component<any, any>{

  render() {
    return (
      <div className="container text-center">
        <div className="row row-cols-2">
          <div className="col">Column</div>
          <div className="col">Column</div>
          <div className="col">Column</div>
          <div className="col">Column</div>
        </div>
      </div>
    );
  }
}

export default MyStickers
