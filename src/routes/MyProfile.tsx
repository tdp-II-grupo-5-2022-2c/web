import React, {useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button} from "reactstrap";
import client from "../services/config";

const MyProfile = () => {
  const user = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const initialState = {
    name: "",
    country: "",
    date_of_birth: "",
    lastname: ""
  };
  const [form, setForm] = useState(initialState)

  const enableProfileEditing = () => {
    setIsEditing(true)
  }

  const acceptChanges = async () => {
    setIsEditing(false)
    console.log(form)
    // Actualizo en el back
    const { data: updatedUser } = await client.put(`/users/${user._id}`, form);
    // Actualizo en el front
    await user.restore(user.mail)
  }

  const cancelChanges = async () => {
    setForm(initialState)
    setIsEditing(false)
  }

  const handleChange = ({target: {name, value}}: any) => {
    setForm({...form, [name]: value});
  }

  const getYearsOld = () => {
    // TODO:calculateYearsOld
    return user.date_of_birth
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="main-content">

        <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center|top"
          }}
        >

          {/*style="min-height: 600px;
             background-image:
             url(&quot;/argon-dashboard-react/static/media/profile-cover.97899245.jpg&quot;);
             background-size: cover;
             background-position: center top;"*/}

          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="d-flex align-items-center container-fluid">
            <div className="row">
              <div className="col-md-10 col-lg-7">
                <h1 className="text-white display-2">Hola {user.mail}</h1>
                <p className="text-white mt-0 mb-5">
                En esta pantalla podrás ver el progreso de tu colección de figuritas</p>
                {!isEditing && <Button className="btn btn-info" onClick={() => enableProfileEditing()}>Editar perfil</Button>}
                {isEditing && <Button className="btn btn-info" onClick={() => acceptChanges()}>Aceptar</Button>}
                {isEditing && <Button className="btn btn-primary" onClick={() => cancelChanges()}>Cancelar</Button>}
              </div>
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
                      <img alt="..." className="rounded-circle"
                           src={require("../assets/img/packet.png")}/>
                    </div>
                  </div>
                </div>
                <div className="text-center border-0 pt-8 pt-md-5 pb-0 pb-md-4 card-header">
                  <div className="d-flex justify-content-between">
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
                  <div className="text-center">
                    <h3>
                      {user.name},
                      <span className="font-weight-light"> {getYearsOld()}</span>
                    </h3>
                    <div><i className="ni education_hat mr-2"></i>{/*TODO:country*/}</div>
                    <hr className="my-4"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-xl-1 col-xl-8">
              <div className="bg-secondary shadow card">
                <div className="bg-white border-0 card-header">
                  <div className="align-items-center row">
                    <div className="col-8">
                      <h3 className="mb-0">Mis Datos</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form className=""><h6 className="heading-small text-muted mb-4">Información usuario</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Nombre</label>
                            <input
                              id="input-username" placeholder="Nombre" type="name"
                              name='name'
                              className="form-control-alternative form-control"
                              onChange={handleChange}
                              value={form.name || user.name}
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
                                   readOnly={true}
                                   disabled={true} />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Apellido</label>
                            <input
                              id="input-lastname" placeholder="Apellido"
                              type="lastname"
                              name='lastname'
                              className="form-control-alternative form-control"
                              onChange={handleChange}
                              value={form.lastname || user.lastname}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Fecha de nacimiento</label>
                            <input id="input-date_of_birth"
                                   placeholder="13-07-1995"
                                   type="date_of_birth"
                                   name='date_of_birth'
                                   className="form-control-alternative form-control"
                                   value={form.date_of_birth || user.date_of_birth}
                                   onChange={handleChange}
                                   disabled={!isEditing}
                            />
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
