import React, {useEffect, useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {
  Badge,
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import CreateCommunityModal, {CreateCommunityForm} from "../components/CreateCommunityModal";
import client from "../services/config";
import {CommunityCreationStrings} from "../res/strings";
import {useNavigate} from "react-router-dom";
import {fetchCommunities} from "../services/apicalls";
import Success from "../components/modals/Success";
import Error from "../components/modals/Error";

export type ICommunity = {
  "_id": string,
  "name": string,
  "owner": number,
}

const MyCommunities = () => {
  const user = useUser();

  const [showCreateCommunityFormModal, setShowCreateCommunityFormModal] = useState(false);
  const initialFormState: CreateCommunityForm = {
    name: "",
    password: "",
  };
  const [createCommunityForm, setCreateCommunityForm] = useState(initialFormState)
  const [fetchedCommunities, setCommunities] = useState<ICommunity[]>([])
  const initialModalState = {
    header: "",
    body: "",
  };
  const [showModalOk, setShowModalOk] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [modalOk, setModalOk] = useState(initialModalState);
  const [modalError, setModalError] = useState(initialModalState);
  const [createdCommunityId, setCreatedCommunityId] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchCommunities(undefined, user._id).then(response => setCommunities(response))
  }, [])

  const isFormValid = () => {
    return (createCommunityForm.name.length > 0 && createCommunityForm.password.length > 0)
  }

  const createCommunity = async () => {
    if (!isFormValid()) {
      setModalError({header: CommunityCreationStrings.ERROR_HEAD, body: CommunityCreationStrings.BAD_FORM})
      setShowModalError(true)
      return
    }
    setShowCreateCommunityFormModal(false)
    const form = {
      name: createCommunityForm.name,
      password: createCommunityForm.password,
      owner: user._id,
      users: []
    }
    try {
      const {data: createdCommunity} = await client.post("/communities", form)
      console.log(createdCommunity);
      setCreatedCommunityId(createdCommunity._id);
      setModalOk({header: CommunityCreationStrings.OK_HEADER, body: CommunityCreationStrings.CREATED})
      setShowModalOk(true)
      fetchCommunities()
    } catch (error: any) {
      if (error.response) {
        if (error.response.data?.detail.includes("there is already a community with that name")){
          setModalError({header:CommunityCreationStrings.ERROR_HEAD, body: CommunityCreationStrings.COMMUNITY_ALREADY_EXISTS})
          setShowModalError(true)
        }
        if (error.response.data?.detail.includes("user can't be in more than 10 communities")) {
          setModalError({header:CommunityCreationStrings.ERROR_HEAD, body: CommunityCreationStrings.COMMUNITY_LIMIT})
          setShowModalError(true)
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

  const closeModalOk = () => {
    setShowModalOk(false)
    if (createdCommunityId) {
      navigate(`/communities/${createdCommunityId}`);
    }
  }

  const closeModalError = () => {
    setShowModalError(false)
    setModalError(initialModalState)
  }

  const viewCommunity = (event: any) => {
    let communityId = event.target.id;
    navigate(`/communities/${communityId}`)
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
            {/*<Row>*/}
            {/*  <Col lg={12} md={6}>*/}
            {/*    <Button className="ml-0 mb-2" color="primary" block> Administrador </Button>*/}
            {/*  </Col>*/}
            {/*  <Col lg={12} md={6}>*/}
            {/*    <Button className="ml-0 mb-2" color="default" block> Todos </Button>*/}
            {/*  </Col>*/}
            {/*</Row>*/}
          </Col>
          <Col className="offset-lg-1" lg={6} md={12}>
            {/*<Row>*/}
            {/*  <Form className="navbar-search">*/}
            {/*    <FormGroup className="mb-0">*/}
            {/*      <InputGroup className="input-group-alternative bg-white">*/}
            {/*        <InputGroupText>*/}
            {/*          <i className="fas fa-search"/>*/}
            {/*        </InputGroupText>*/}
            {/*        <Input placeholder="Buscar" type="text" id="name" {...register("name", {*/}
            {/*          onChange: handleFilterChange()*/}
            {/*        })} />*/}
            {/*      </InputGroup>*/}
            {/*    </FormGroup>*/}
            {/*  </Form>*/}
            {/*</Row>*/}
            <ListGroup>
            {fetchedCommunities
                .sort((a,b) => a.owner === user._id ? -1 : 0)
                .map((community, index) =>
            <ListGroupItem className="justify-content-between" key={community._id} action onClick={viewCommunity} id={community._id} tag="button">
              <span id={community._id} className="mr-2">{community.name}</span>
              {user._id === community.owner &&
                  <Badge id={community._id} pill color="default">
                      Administrador
                  </Badge>
              }
            </ListGroupItem>
            )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <CreateCommunityModal header={"Crear comunidad"}
                            body={"Completa con el nombre de la comunidad y agrega una contraseña"}
                            isOpen={showCreateCommunityFormModal}
                            onAccept={createCommunity}
                            onCancel={() => {
                   setShowCreateCommunityFormModal(false)
                 }}
                            form={createCommunityForm}
                            handleChange={handleChange}
      />
      <Success modal={modalOk} isOpen={showModalOk} onAccept={closeModalOk}/>
      <Error modal={modalError} isOpen={showModalError} onAccept={closeModalError}/>
    </React.Fragment>
  );

}

export default MyCommunities
