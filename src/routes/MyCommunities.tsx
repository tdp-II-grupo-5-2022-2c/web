import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button, Card, Collapse, Row} from "reactstrap";
import ModalForm, {CreateCommunityForm} from "../components/ModalForm";
import client from "../services/config";
import MyModal from "../components/MyModal";
import {CommunityCreationStrings} from "../res/strings";
import Community, {NoUsersCommunity} from "../components/Community";
import ChatRoom from "../components/ChatRoom";

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
  const [createCommunityResultModal, setCreateCommunityResultModal] = useState(initialModalState);
  const [chatIsOpen, setChatIsOpen] = useState<boolean>(false);
  const [chatCommunityId, setChatCommunityId] = useState<number|undefined>(undefined);

  const [modal, setModal] = useState(initialModalState)

  useEffect(() => {
    fetchCommunitiesAsAdmin()
    fetchCommunitiesAsMember()
    console.log("chat is open: " + chatIsOpen)
  }, [])

  const fetchCommunities = async (ownerId?: number, memberId?: number) => {
    const _params = {
      owner_id: ownerId || undefined,
      member_id: memberId || undefined
    }

    let fetchedCommunities: any = []
    try {
      const response = await client.get(`/communities`, {params: _params})
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
    // return [
    //   {
    //     _id: 1234,
    //     name: 'sarasa',
    //     owner: user._id
    //   }
    // ]
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

  const openChatRoom = (event: MouseEvent) => {
    // @ts-ignore
    console.log("open chat - element id: " + event.target.id)
    // @ts-ignore
    setChatCommunityId(Number(event.target.id));
    setChatIsOpen(true);
  }

  const closeChatRoom = () => {
    setChatIsOpen(false);
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
                  <Community community={community}
                             isOwner={user._id === community.owner}
                             openChatRoom={openChatRoom}
                  />
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
                  <Community community={community}
                             isOwner={user._id === community.owner}
                             openChatRoom={openChatRoom}
                  />
                </div>
              )}
              {memberCommunities.length === 0 &&
                  <p>Al parecer no perteneces a ninguna comunidad, todavía</p>
              }
            </div>
          </div>
          <div className="col-md-2">
            <Row>
              <Button onClick={onCreateCommunityClick}>Crear Comunidad</Button>
            </Row>
            <Row>
              <Collapse isOpen={chatIsOpen}>
                <Card className="card-translucent">
                  <ChatRoom id={chatCommunityId}/>
                </Card>
              </Collapse>
            </Row>
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
