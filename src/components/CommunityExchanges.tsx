import React, {useEffect, useState} from "react";
import Exchange, {IExchange} from "./Exchange";
import {useUser} from "../context/UserContext";
import {getMockedExchanges} from "../data/exchangesData";

const CommunityExchanges = () => {
  const user = useUser()
  const [communityExchanges, setCommunityExchanges] = useState<IExchange[]>([])

  useEffect(() => {
    _fetchCommunityExchanges()
  }, [])

  const _fetchCommunityExchanges = async () => {
    //const exchanges = await fetchCommunityExchanges(user._id, "633f70e6d6fa13f54ac9ac25")
    setCommunityExchanges(getMockedExchanges())
  }

  const acceptExchange = (exchangeId: string) => {
    console.log("Exchange accepted! id " + exchangeId)
  }

  const rejectExchange = (exchangeId: string) => {
    console.log("Exchange rejected! id " + exchangeId)
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col">
          {communityExchanges.map((exchange, index) =>
            <div key={exchange._id}>
              <Exchange exchange={exchange} isOwner={false} onAccept={acceptExchange} onReject={rejectExchange}/>
            </div>
          )}
        </div>
      </div>

    </div>
  )

}

export default CommunityExchanges
