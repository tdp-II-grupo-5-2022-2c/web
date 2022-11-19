import {Spinner} from "reactstrap";
import React from "react";

type Props = {
  message: string,
  className?: string
}

const MySpinner = ({message, className}: Props) => {
  return(
    <div className="container text-center">
      <div className="row">
        <Spinner className={`${className} img-center d-flex`} type="grow" style={{height: '3rem', width: '3rem'}}></Spinner>
      </div>
      <div className="row mt-5">
        <h1 className={`${className} text-center`}>{message}</h1>
      </div>
    </div>
  )
}

export default MySpinner
