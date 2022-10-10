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
  const [showCreateCommunityModal, setShowCreateCommunityModal] = useState(false);
  const initialFormState: CreateCommunityForm = {
    name: "",
    password: "",
  };
  const initialModalState = {
    header: "",
    body: "",
  };

  const [createCommunityForm, setCreateCommunityForm] = useState(initialFormState)
  const [communities, setCommunities] = useState<NoUsersCommunity[]>([])

  const [modal, setModal] = useState(initialModalState)

  useEffect(() => {
    fetchCommunities()
  }, [])

  const fetchCommunities = async () => {
    const {data: fetchedCommunities} = await client.get("/communities")
    setCommunities(fetchedCommunities)
  }

  const isFormValid = () => {
    console.log(createCommunityForm)
    console.log(createCommunityForm.name.length)
    console.log(createCommunityForm.password.length)
    return (createCommunityForm.name.length > 0 && createCommunityForm.password.length > 0)
  }

  const createCommunity = async () => {
    console.log("HOlaaaaaaa")
    if(!isFormValid()){
      setModal({header: CommunityModalMsg.CREATE_ERROR_HEAD, body: CommunityModalMsg.CREATE_ERROR_BODY})
      setShowCreateCommunityModal(true)
      return
    }
    setShowCreateCommunityFormModal(false)
    const form = {
      name: createCommunityForm.name,
      owner: user._id,
      users: []
    }
    try {
      const {data: createdCommunity} = await client.post("/communities", form)
      setModal({header: CommunityModalMsg.CREATE_OK_HEAD, body: CommunityModalMsg.CREATE_OK_BODY})
      fetchCommunities()
      setShowCreateCommunityModal(true)
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
    setShowCreateCommunityModal(false)
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
                 onCancel={() => {setShowCreateCommunityFormModal(false)}}
                 form={createCommunityForm}
                 handleChange={handleChange}
      />
      <MyModal header={modal.header} body={modal.body}
               isOpen={showCreateCommunityModal} onAccept={closeShowPasteOk}/>
    </React.Fragment>
  );

}

export default MyCommunities
