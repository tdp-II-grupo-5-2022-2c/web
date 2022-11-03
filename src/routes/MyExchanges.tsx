import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import client from "../services/config";
import Exchange, {IExchange} from "../components/Exchange";
import {IStickerData} from "../components/Sticker";

const MyExchanges = () => {
  const user = useUser();
  const [userExchanges, setUserExchanges] = useState<IExchange[]>([]);

  useEffect(() => {
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

  const swapLastToFirst = (oldExchanges: IExchange[], index: number, isReceive: boolean) => {
    const oldExchangesCpy = oldExchanges.slice()
    // obtengo exchange del array
    const exchange = oldExchangesCpy[index]
    // obtengo stickers
    let stickersCpy: IStickerData[] = []
    if (isReceive) {
      stickersCpy = exchange.stickers_to_receive
    } else {
      stickersCpy = exchange.stickers_to_give
    }
    // saco el ultimo
    const last = stickersCpy.pop()
    if (last) {
      // lo pongo al principio
      stickersCpy.unshift(last)
    }
    if (isReceive) {
      // seteo los cambios en el exchange
      exchange.stickers_to_receive = stickersCpy
    } else {
      exchange.stickers_to_give = stickersCpy
    }
    // seteo el exchange en el array de exchanges
    oldExchanges[index] = exchange
    return oldExchangesCpy
  }

  const swapReceive = (index: number) => {
    console.log("Swap receive")
    setUserExchanges(oldExchanges => swapLastToFirst(oldExchanges, index, true))
  }

  const swapGive = (index: number) => {
    console.log("Swap give")
    setUserExchanges(oldExchanges => swapLastToFirst(oldExchanges, index, false))
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="container-fluid">
        <div className="row">
            <h1>Mis Intercambios</h1>
            <div className="card col-md-auto">
              <div className="card-body d-flex flex-row justify-content-around">
                <div className="d-flex flex-row align-items-center justify-content-start">
                  <i className="ni ni-bold-right text-danger ni-3x"></i>
                  <p className="">Figuritas a dar</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start">
                  <i className="ni ni-bold-left text-success ni-3x"></i>
                  <p className="">Figuritas a recibir</p>
                </div>
              </div>
            </div>
          </div>
        <div className="row">
          <div className="card">
            <div className="card-body row">
              {userExchanges.map((exchange, index) =>
                <div key={exchange._id} className="col-4 my-1">
                  <Exchange exchange={exchange} onClickReceive={() => swapReceive(index)}
                            onClickGive={() => swapGive(index)}/>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </React.Fragment>
  );

}

export default MyExchanges
