import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import client from "../services/config";
import Exchange, {IExchange} from "../components/Exchange";
import {globalExchangesStyles} from "../res/globalStyles";
import {getMockedExchanges} from "../data/exchangesData";


const MyExchanges = () => {
  const user = useUser();
  const [userExchanges, setUserExchanges] = useState<IExchange[]>([]);

  useEffect(() => {
    //mockCommunitiesExchanges()
    fetchCommunitiesExchanges()
  }, [])

  const fetchCommunitiesExchanges = async () => {
    try {
      const response = await client.get(`/exchanges/?sender_id=${user._id}&completed=false`)
      console.log(response.data)
      setUserExchanges(response.data)
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }

  const mockCommunitiesExchanges = () => {
    setUserExchanges(getMockedExchanges())
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="row">
        <h1>Mis Intercambios</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-9 py-4 card">
            {userExchanges.map((exchange, index) =>
              <div key={exchange._id} className="col col-md-3">
                <Exchange exchange={exchange}/>
              </div>
            )}
          </div>
          <div className="col-md-3 card py-4">
            <p>Leyenda</p>
            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-content-start">
                <p className="text-red" style={globalExchangesStyles.arrows}>{"->"}</p>
              </div>
              <div className="col-9 d-flex align-content-start">
                <p>{"Figuritas a dar"}</p>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-3 d-flex align-content-start">
                <p className="text-green" style={globalExchangesStyles.arrows}>{"<-"}</p>
              </div>
              <div className="col-9 d-flex align-content-start">
                {"Figuritas a recibir"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default MyExchanges
