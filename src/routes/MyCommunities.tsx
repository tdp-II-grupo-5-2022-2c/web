import React, {ChangeEvent, useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import ModalForm, {CreateCommunityForm} from "../components/ModalForm";
import client from "../services/config";
import {MyModal} from "../components/MyModal";
import {CommunityCreationStrings} from "../res/strings";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

export type NoUsersCommunity = {
  "_id": string,
  "name": string,
  "owner": number,
}

const MyCommunities = () => {
  const user = useUser();
  const {register} = useForm();

  const [showCreateCommunityFormModal, setShowCreateCommunityFormModal] = useState(false);
  const initialFormState: CreateCommunityForm = {
    name: "",
    password: "",
  };
  const [createCommunityForm, setCreateCommunityForm] = useState(initialFormState)
  const [memberCommunities, setMemberCommunities] = useState<NoUsersCommunity[]>([])
  const initialModalState = {
    header: "",
    body: "",
  };
  const [showCreateCommunityResultModal, setShowCreateCommunityResultModal] = useState(false);
  const [createCommunityResultModal, setCreateCommunityResultModal] = useState(initialModalState);

  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState<{name: string|undefined, owner: boolean|undefined}>({
    name: undefined,
    owner: undefined
  });

  useEffect(() => {
    fetchCommunitiesAsMember()
  }, [])

  const fetchCommunities = async (ownerId?: number, memberId?: number, name?: string) => {
    const _params = {
      owner: ownerId || undefined,
      member: memberId || undefined,
      name: name || undefined
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

  const viewCommunity = (event: any) => {
    // @ts-ignore
    console.log("target")
    console.log(event.target)
    let communityId = event.target.id;
    navigate(`/communities/${communityId}`)
  }

  const searchCommunities = async () => {
    console.log(searchFilters)
    if(searchFilters.owner === false || searchFilters.owner === undefined)
      setMemberCommunities(await fetchCommunities(undefined, user._id, searchFilters.name));
    else
      setMemberCommunities(await fetchCommunities(user._id, undefined, searchFilters.name))
  }

  const onChangeFilterHandler = ({target: {id, value}}: any) => {
    // @ts-ignore
    console.log("value: " + value)
    let _searchFilters = searchFilters
    _searchFilters.name = value
    setSearchFilters(_searchFilters);
    searchCommunities();
  }

  const handleFilterChange = () => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length >= 3 || e.target.value.length === 0) onChangeFilterHandler(e)
    };
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <Container fluid>
        <Row>
          <Col lg={6} md={6} sm={6}>
            <h1>Comunidades</h1>
          </Col>
          <Col className="text-end mb-1" lg={6} md={6} sm={6}>
            <Button color="success" onClick={onCreateCommunityClick}>Crear Comunidad</Button>
          </Col>
        </Row>
        <Row>
          <Col lg={2} md={12}>
            <Row>
              <Col lg={12} md={6}>
                <Button className="ml-0 mb-2" color="primary" block> Administrador </Button>
              </Col>
              <Col lg={12} md={6}>
                <Button className="ml-0 mb-2" color="default" block> Todos </Button>
              </Col>
            </Row>
          </Col>
          <Col className="offset-lg-1" lg={6} md={12}>
            <Row>
              <Form className="navbar-search">
                <FormGroup className="mb-0">
                  <InputGroup className="input-group-alternative bg-white">
                    <InputGroupText>
                      <i className="fas fa-search"/>
                    </InputGroupText>
                    <Input placeholder="Buscar" type="text" id="name" {...register("name", {
                      onChange: handleFilterChange()
                    })} />
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
            <ListGroup>
            {memberCommunities
                .sort((a,b) => a.owner === user._id ? -1 : 0)
                .map((community, index) =>
            <ListGroupItem className="justify-content-between" key={community._id} action onClick={viewCommunity} id={community._id} tag="button">
              <span id={community._id} className="mr-2">{community.name}</span>
              {
                user._id === community.owner &&
                <Badge id={community._id} pill color="default">Administrador</Badge>
              }
            </ListGroupItem>
            )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
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
