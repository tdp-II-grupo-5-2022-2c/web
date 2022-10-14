import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button} from "reactstrap";
import ModalForm, {CreateCommunityForm} from "../components/ModalForm";
import client from "../services/config";
import MyModal from "../components/MyModal";
import {CommunityCreationStrings} from "../res/strings";
import Community, {NoUsersCommunity} from "../components/Community";

const MyCommunities = () => {
  const user = useUser();
  const [showCreateCommunityFormModal, setShowCreateCommunityFormModal] = useState(false);
  const initialFormState: CreateCommunityForm = {
    name: "",
    password: "",
  };
  const [createCommunityForm, setCreateCommunityForm] = useState(initialFormState)
  const [adminCommunities, setAdminCommunities] = useState<NoUsersCommunity[]>([])
  const [memberCommunities, setMemberCommunities] = useState<NoUsersCommunity[]>([])
  const initialModalState = {
    header: "",
    body: "",
  };
  const [showCreateCommunityResultModal, setShowCreateCommunityResultModal] = useState(false);
  const [createCommunityResultModal, setCreateCommunityResultModal] = useState(initialModalState)

  useEffect(() => {
    fetchCommunitiesAsAdmin()
    fetchCommunitiesAsMember()
  }, [])

  const fetchCommunities = async (ownerId?: number, memberId?: number) => {
    const form = {
      owner_id: ownerId || "",
      member_id: memberId || ""
    }
    let fetchedCommunities: any = []

    try {
      const response = await client.get(`/communities?${form.owner_id}&${form.member_id}`)
      fetchedCommunities = response.data
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }

    return fetchedCommunities
  }

  const fetchCommunitiesAsAdmin = async () => {
    setAdminCommunities(await fetchCommunities(user._id))
  }

  const fetchCommunitiesAsMember = async () => {
    setMemberCommunities(await fetchCommunities(undefined, user._id))
  }

  const isFormValid = () => {
    return (createCommunityForm.name.length > 0 && createCommunityForm.password.length > 0)
  }

  const createCommunity = async () => {
    if (!isFormValid()) {
      setCreateCommunityResultModal({header: CommunityCreationStrings.COMMUNITY_CREATION_ERROR_HEAD, body: CommunityCreationStrings.COMMUNITY_BAD_FORM})
      setShowCreateCommunityResultModal(true)
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
      setCreateCommunityResultModal({header: CommunityCreationStrings.COMMUNITY_CREATION_OK_HEAD, body: CommunityCreationStrings.COMMUNITY_CREATED})
      fetchCommunitiesAsAdmin()
      fetchCommunitiesAsMember()
      setShowCreateCommunityResultModal(true)
    } catch (error: any) {
      if (error.response) {
        if(error.response.data?.detail === "TODO: error comunidad mismo nombre"){
          setCreateCommunityResultModal({header:CommunityCreationStrings.COMMUNITY_CREATION_ERROR_HEAD, body: CommunityCreationStrings.COMMUNITY_ALREADY_EXISTS})
          setShowCreateCommunityResultModal(true)
        }
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  }

  const onCreateCommunityClick = async () => {
    setCreateCommunityForm(initialFormState)
    setShowCreateCommunityFormModal(true)
  }

  const handleChange = ({target: {name, value}}: any) => {
    setCreateCommunityForm({...createCommunityForm, [name]: value});
  }

  const closeShowPasteOk = () => {
    setShowCreateCommunityResultModal(false)
  }

  return (
    <React.Fragment>
      <MyNavbar/>
        <div className="row">
          <div className="col-md-2">
            <div className="row"></div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <h2>Comunidades de las que soy administrador</h2>
              {adminCommunities.map((community, index) =>
                <div key={community._id} className="col col-md-3">
                  <Community community={community} isOwner={user._id === community.owner}/>
                </div>
              )}
              {adminCommunities.length === 0 &&
                  <p>No eres administrador de ninguna comunidad, todavía</p>
              }
            </div>
            <div className="row">
              <h2>Comunidades de las que soy miembro</h2>
              {memberCommunities.map((community, index) =>
                <div key={community._id} className="col col-sm-3">
                  <Community community={community} isOwner={user._id === community.owner}/>
                </div>
              )}
              {memberCommunities.length === 0 &&
                  <p>Al parecer no perteneces a ninguna comunidad, todavía</p>
              }
            </div>
          </div>
          <div className="col-md-2">
            <div className="row">
              <Button onClick={onCreateCommunityClick}>Crear Comunidad</Button>
            </div>
          </div>
      </div>
      <ModalForm header={"Crear comunidad"}
                 body={"Completa con el nombre de la comunidad y agrega una contraseña"}
                 isOpen={showCreateCommunityFormModal}
                 onAccept={createCommunity}
                 onCancel={() => {
                   setShowCreateCommunityFormModal(false)
                 }}
                 form={createCommunityForm}
                 handleChange={handleChange}
      />
      <MyModal header={createCommunityResultModal.header} body={createCommunityResultModal.body}
               isOpen={showCreateCommunityResultModal} onAccept={closeShowPasteOk}/>
    </React.Fragment>
  );

}

export default MyCommunities
