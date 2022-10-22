import {debugStyle} from "../res/globalStyles";

const MyCard = ({children}: any) => {

  return (
    <div className="card border-default">
        <div className="card-body">
          {children}
        </div>
    </div>
  )
}

export default MyCard
