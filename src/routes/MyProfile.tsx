import React, {useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button} from "reactstrap";

const MyProfile = () => {
  const user = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    country: ""
  })

  const enableProfileEditing = () => {
    setIsEditing(true)
  }

  const acceptChanges = () => {
    setIsEditing(false)
    console.log(form)
    // TODO: api call para editar perfil
  }

  const cancelChanges = () => {
    setIsEditing(false)
  }

  const handleChange = ({target: {name, value}}: any) => {
    // TODO: rollback de cambios
    setForm({...form, [name]: value});
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="main-content">
        <span className="mask bg-gradient-default opacity-8"></span>
        <div className="d-flex align-items-center container-fluid">
          <div className="row">
            <div className="col-md-10 col-lg-7">
              <h1 className="display-2">Hola {user.mail}</h1><p
              className="mt-0 mb-5">
              En esta pantalla podrás ver el progreso de tu colección de figuritas</p>
              {!isEditing && <Button className="btn btn-info" onClick={() => enableProfileEditing()}>Editar perfil</Button>}
              {isEditing && <Button className="btn btn-info" onClick={() => acceptChanges()}>Aceptar</Button>}
              {isEditing && <Button className="btn btn-primary" onClick={() => cancelChanges()}>Cancelar</Button>}
            </div>
          </div>
        </div>
        <div className="mt--7 container-fluid">
          <div className="row">
            <div className="order-xl-2 mb-5 mb-xl-0 col-xl-4">
              <div className="card-profile shadow card">
                <div className="justify-content-center row">
                  <div className="order-lg-2 col-lg-3">
                    <div className="card-profile-image">
                      <img alt="..." className="rounded-circle img-fluid"
                           src={require("../assets/img/packet.png")}/>
                    </div>
                  </div>
                </div>
                <div className="pt-0 pt-md-4 card-body">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div><span className="heading">22</span><span className="description">Comunidades</span></div>
                        <div><span className="heading">10</span><span className="description">Figuritas</span></div>
                        <div><span className="heading">89%</span><span className="description">Album completo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center"><h3>Juan Carlos<span className="font-weight-light">, 27</span></h3>

                    <div><i className="ni education_hat mr-2"></i>Argentina</div>
                    <hr className="my-4"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-xl-1 col-xl-8">
              <div className="bg-secondary shadow card">
                <div className="bg-white border-0 card-header">
                  <div className="align-items-center row">
                    <div className="col-8"><h3 className="mb-0">Mis Datos</h3></div>
                  </div>
                </div>
                <div className="card-body">
                  <form className=""><h6 className="heading-small text-muted mb-4">User information</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Nombre</label>
                            <input
                              id="input-username" placeholder="Nombre usuario" type="name"
                              name='name'
                              className="form-control-alternative form-control"
                              onChange={handleChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Correo Electrónico</label>
                            <input id="input-email" placeholder="juan@example.com"
                                   className="form-control-alternative form-control"
                                   value={user.mail}
                                   disabled={true} />
                          </div>
                        </div>
                      </div>

                    </div>
                    <hr className="my-4"/>
                    <h6 className="heading-small text-muted mb-4">Información contacto</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label">País</label>
                            <input id="input-country"
                                   placeholder="Pais"
                                   type="country"
                                   name='country'
                                   className="form-control-alternative form-control"
                                   onChange={handleChange}
                                   disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </React.Fragment>

  )
}

export default MyProfile
