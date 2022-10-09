import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button, Col} from "reactstrap";
import ModalForm, {CreateCommunityForm} from "../components/ModalForm";
import client from "../services/config";
import MyModal from "../components/MyModal";
import {CommunityModalMsg} from "../res/strings";
import Community, {NoUsersCommunity} from "../components/Community";

const MyCommunities = () => {
  const user = useUser();
  const [showCreateCommunityFormModal, setShowCreateCommunityFormModal] = useState(false);
  const [showCreateOk, setShowCreateOk] = useState(false);
  const initialFormState: CreateCommunityForm = {
    name: "",
    password: "",
  };
  const [createCommunityForm, setCreateCommunityForm] = useState(initialFormState)
  const [communities, setCommunities] = useState<NoUsersCommunity[]>([])

  useEffect(() => {
    fetchCommunities()
  }, [])

  const fetchCommunities = async () => {
    const {data: fetchedCommunities} = await client.get("/communities")
    setCommunities(fetchedCommunities)
  }

  const createCommunity = async () => {
    setShowCreateCommunityFormModal(false)
    const form = {
      name: createCommunityForm.name,
      owner: user._id,
      users: []
    }
    console.log(form)
    try {
      const {data: createdCommunity} = await client.post("/communities", form)
      fetchCommunities()
      setShowCreateOk(true)
    } catch (error : any){
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }

    // TODO Fetchear las comunidades para incluir la recien creada
  }

  const onCreateCommunityClick = async () => {
    setCreateCommunityForm(initialFormState)
    setShowCreateCommunityFormModal(true)
  }

  const handleChange = ({target: {name, value}}: any) => {
    setCreateCommunityForm({...createCommunityForm, [name]: value});
  }

  const closeShowPasteOk = () => {
    setShowCreateOk(false)
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="main-content">
        <div className="row">
          <div className="col">
            <Button onClick={onCreateCommunityClick}>Crear Comunidad</Button>
          </div>

        </div>
        <div className="row">
          {communities.map((community, index) =>
              <div key={community._id} className="col col-sm-3">
                <Community community={community} isOwner={user._id === community.owner}/>
              </div>
          )}
        </div>
      </div>
      <ModalForm header={"Crear comunidad"}
                 body={"Completa con el nombre de la comunidad y agrega una contraseña"}
                 isOpen={showCreateCommunityFormModal}
                 onAccept={createCommunity}
                 form={createCommunityForm}
                 handleChange={handleChange}
      />
      <MyModal header={CommunityModalMsg.COMMUNITY_CREATED_HEAD} body={CommunityModalMsg.COMUNITY_CREATED_BODY}
               isOpen={showCreateOk} onAccept={closeShowPasteOk}/>
    </React.Fragment>
  );

}

export default MyCommunities
