import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import client from "../services/config";
import Exchange, {IExchange} from "../components/Exchange";
import {IStickerData} from "../components/stickers/Sticker";
import MySpinner from "../components/spinner/MySpinner";

const MyExchanges = () => {
  const user = useUser();
  const [userExchanges, setUserExchanges] = useState<IExchange[]>([]);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCommunitiesExchanges()
  }, [])

  const fetchCommunitiesExchanges = async () => {
    try {
      setIsLoading(true)
      const response = await client.get(`/exchanges?sender_id=${user._id}&completed=false`)
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
    setIsLoading(false)
  }

  // TODO: codigo repetido
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
    oldExchangesCpy[index] = exchange
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
      <div className="container-fluid bg-gradient-orange h-90vh">
        <div className="row">
          <h1 className="text-center text-white mt-5">MIS INTERCAMBIOS</h1>
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
          <div className="h-65vh bg-translucent-light border rounded">
            {isLoading &&
              <div className="d-flex justify-content-center align-items-center h-65vh">
                <MySpinner className="text-white-50" message={"Obteniendo intercambios..."}/>
              </div>
            }
            {!isLoading &&
              <div className="row row-cols-md-1 row-cols-lg-3">
                {userExchanges.map((exchange, index) =>
                  <div key={exchange._id} className="my-1">
                    <Exchange exchange={exchange} onClickReceive={() => swapReceive(index)}
                              onClickGive={() => swapGive(index)}/>
                  </div>
                )}
              </div>
            }

          </div>

        </div>
      </div>
    </React.Fragment>
  );

}

export default MyExchanges
