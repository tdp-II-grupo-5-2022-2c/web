import React, {useEffect, useState} from 'react';
import MyNavbar from "../components/MyNavbar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label
} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";
import client from "../services/config";
import {CommunityInfo} from "./Community";
import {useErrorHandler} from "../context/ErrorHandler";
import {useUser} from "../context/UserContext";
import {MyModal} from "../components/MyModal";

function JoinCommunity() {
  const { community_id } = useParams();
  const { setErrorResponse } = useErrorHandler();
  const user = useUser();
  const navigate = useNavigate();

  const [community, setCommunity] = useState<CommunityInfo>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  const fetchCommunities = async () : Promise<CommunityInfo[]> => {
    let fetchedCommunities: any = []
    try {
      const response = await client.get(`/communities`)
      fetchedCommunities = response.data
    } catch (error: any) {
      console.log(error.response || error.request || error.message);
      setErrorResponse({
        statusCode: error.response?.status || 500,
        message: "¡Ups! Hubo un problema"
      });
    }

    return fetchedCommunities
  }

  const fetchCommunity = async () => {
    let communities = await fetchCommunities();

    let _community = communities.find(x => x._id === community_id)
    if (!_community) {
      setErrorResponse({
        statusCode: 404,
        message: "Comunidad no encontrada"
      })
      return;
    }

    setCommunity(_community);
  }

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  }

  const joinCommunity = async () => {
    try {
      let response = await client.post(`/communities/${community_id}/users/${user._id}`, undefined,{
        params: {
          password: password
        }
      })
      console.log(response);
      if (response.status === 200) {
        setShowModalSuccess(true);
        setSuccess(`Te has unido a la Comunidad ${community?.name}`)
      }
    } catch (error: any) {
      console.log(error.response || error.request || error.message);

      if (error.response.data.detail.toString().includes("Wrong password")) {
        setError("Contraseña inválida");
        return;
      }

      if (error.response.data.detail.toString().includes("Full community")) {
        toggleModalError();
        setError("La comunidad ha alcanzado el máximo permitido de miembros, contactate con el administrador de la comunidad.");
        return;
      }

      if (error.response.data.detail.toString().includes("already joined community")) {
        toggleModalError();
        setError("Ya eres miembro de esta comunidad");
        return;
      }

      if (error.response.data.detail.toString().includes("user can't be in more than 10 communities")) {
        toggleModalError();
        setError("No se puede pertenecer a mas de 10 comunidades");
        return;
      }
    }
  }

  const toggleModalError = () => {
    setShowModalError(!showModalError);
    setError(undefined);
  }

  const redirectToCommunity = () => {
    navigate(`/communities/${community_id}`);
  }

  useEffect(() => {
    fetchCommunity();
  }, [community_id])

  return (
      <React.Fragment>
        <MyNavbar/>
        <Col className="offset-lg-3 offset-md-2" lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2">
                <h1>¿Deseas unirte a la comunidad <span className="text-muted">{community?.name}</span>?</h1>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup>
                  <Label>Ingrese la contraseña de la comunidad</Label>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                    <Input
                        placeholder="Contraseña"
                        type="text"
                        onChange={handlePasswordChange}
                        invalid={!!error}
                    />
                  </InputGroup>
                  {error !== undefined && error.length > 0 && !showModalError &&
                      <small className="text-danger"> {error} </small>
                  }
                </FormGroup>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button"
                          disabled={!password || password.length === 0}
                          onClick={joinCommunity}
                  >
                    Unirse
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
        {/*TODO: pasar estos modales a componentes de Success y Error para reutilizar*/}
        <MyModal header={"Error al unirse a comunidad"}
                 body={
                  <>
                    <h1 className="text-center">
                      <i className="ni ni-fat-remove text-danger ni-3x"></i>
                    </h1>
                    <h4 className="text-center">{error}</h4>
                  </>}
                 isOpen={showModalError}
                 onAccept={toggleModalError}/>
        <MyModal header={"¡Felicidades!"}
                 body={
                    <>
                      <h1 className="text-center">
                        <i className="ni ni-check-bold text-success ni-3x"></i>
                      </h1>
                      <h4 className="text-center">{success}</h4>
                    </>
                  }
                 isOpen={showModalSuccess}
                 onAccept={redirectToCommunity}/>
      </React.Fragment>
  )
}

export default JoinCommunity;