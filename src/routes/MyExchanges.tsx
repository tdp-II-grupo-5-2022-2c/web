import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import client from "../services/config";
import Exchange, {IExchange} from "../components/Exchange";
import {ISticker, IStickerData} from "../components/Sticker";
import {globalExchangesStyles} from "../res/globalStyles";

const mockedExchanges = [
  {
    _id: "578524385047398",
    sender_id: "634399969ff91541744bb3d2",
    stickers_to_give: [
      {
        id: "6328a84a45188115b66b51b8",
        image: "https://picsum.photos/300/200",
        name: "Emiliano Martinez",
        number: 1,
        quantity: 0,
        country: "ARG",
        is_on_album: true
      } as ISticker,
      {
        id: "6328a87545188115b66b51b9",
        image: "https://picsum.photos/300/200",
        name: "Julian Alvarez",
        number: 11,
        quantity: 0,
        country: "ARG",
        is_on_album: true
      } as ISticker, {
        id: "6328a87545188115b66b51b3",
        image: "https://picsum.photos/300/200",
        name: "Julian Alvarez",
        number: 11,
        quantity: 0,
        country: "ARG",
        is_on_album: true
      } as ISticker, {
        id: "6328a87545188115b66b51b7",
        image: "https://picsum.photos/300/200",
        name: "Julian Alvarez",
        number: 11,
        quantity: 0,
        country: "ARG",
        is_on_album: true
      } as ISticker, {
        id: "6328a87545188115b66b51b8",
        image: "https://picsum.photos/300/200",
        name: "Julian Alvarez",
        number: 11,
        quantity: 0,
        country: "ARG",
        is_on_album: true
      } as ISticker,
    ],
    stickers_to_receive: [
      {
        _id: "6328a84a45188115b66b51b8",
        name: "Emiliano Martinez",
        weight: 990,
        height: 170,
        position: "CF",
        country: "ARG",
        image: "https://picsum.photos/300/200",
        number: 1,
        date_of_birth: "1985-02-02"
      } as IStickerData
    ],
    blacklist_user_ids: [],
    completed: false
  }

]

const MyExchanges = () => {
  const user = useUser();

  //const [userExchanges, setUserExchanges] = useState();
  const [communityExchanges, setCommunitiesExchanges] = useState<IExchange[]>([]);

  const fetchCommunitiesExchanges = async () => {
    try {
      const response = await client.get(`/users/${user._id}/exchanges`)
      setCommunitiesExchanges(response.data)
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
    setCommunitiesExchanges(mockedExchanges)
  }

  useEffect(() => {
    mockCommunitiesExchanges()
    //fetchCommunitiesExchanges()
  }, [])

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="row">
        <h1>Mis Intercambios</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-9 py-4 card">
            {communityExchanges.map((exchange, index) =>
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
