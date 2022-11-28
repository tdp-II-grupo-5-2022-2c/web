import React, {useState} from "react";
import MyNavbar from "../components/MyNavbar";
import {useUser} from "../context/UserContext";
import {Button} from "reactstrap";
import client from "../services/config";
import {ROUTES} from "./RoutesNames";
import {useNavigate} from "react-router-dom";
import {ALBUM_PAGES, ECOUNTRIES, COUNTRIES_TO_FLAG, STRING_TO_ENUM} from "../data/albumData";
import {ProfileStrings} from "../res/strings";
import Success from "../components/modals/Success";

const MyProfile = () => {
  const user = useUser();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showSuccessCompleteProfile, setShowSuccessCompleteProfile] = useState<boolean>(false);
  const initialState = {
    name: user.name,
    country: user.country,
    date_of_birth: user.date_of_birth,
    lastname: user.lastname,
    favorite_countries: user.favorite_countries || []
  };
  const [form, setForm] = useState(initialState)
  const navigate = useNavigate()

  const enableProfileEditing = () => {
    setIsEditing(true)
  }

  const acceptChanges = async () => {
    setIsEditing(false)
    let isProfileComplete = user.is_profile_complete;
    // Actualizo en el back
    const { data: updatedUser } = await client.put(`/users/${user._id}`, form);
    if (!isProfileComplete && updatedUser.is_profile_complete) {
      toggleShowSuccessCompleteProfile();
    }
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
    if(user.date_of_birth.length === 0 ){
      return ""
    }
    const dateOfBirth = new Date(user.date_of_birth)
    const today = new Date();
    let years = today.getFullYear() - dateOfBirth.getFullYear()
    const months = today.getMonth() - dateOfBirth.getMonth()
    const days = today.getDate() - dateOfBirth.getDate()
    if(months < 0 || (months === 0 && days < 0)){
      years = years - 1
    }
    return years
  }

  const handleLogout = () => {
    try {
      user.logout();
    } catch (error) {
      console.error(error)
    }
    navigate(ROUTES.SIGNIN);
  };

  function addOrRemove(oldFavorites: string[], country: string) {
    const index = oldFavorites.findIndex(element => element === country)
    if(index >= 0){
      return oldFavorites.filter(element => element !== country);
    }
    return [...oldFavorites, country];
  }

  const selectCountry = (country: string) => {
    setForm(prevState => ({...prevState, "favorite_countries": addOrRemove(prevState.favorite_countries, country)}));
  }

  const hasMandatoryFields = () => {
    return form.name.length > 0 && form.lastname.length > 0;
  }

  // TODO: ver cual es la fecha minima para poder jugar al juego
  function getMax() {
    const date = new Date()
    const maxUserYear = date.getFullYear() - 14
    return `${maxUserYear}-01-01`;
  }

  function getMin() {
    const date = new Date()
    const minUserYear = date.getFullYear() - 100
    return `${minUserYear}-01-01`;
  }

  function isSelected(country: string) {
    return form.favorite_countries.findIndex(element => element === country) >= 0;
  }

  function toggleShowSuccessCompleteProfile() {
    setShowSuccessCompleteProfile(!showSuccessCompleteProfile)
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
          <span className="mask bg-gradient-orange opacity-8"></span>
          <div className="d-flex align-items-center container-fluid">
            <div className="row">
              <div className="col-md-10 col-lg-7">
                <h1 className="text-white display-2">Hola {user.mail}</h1>
                <p className="text-white mt-0 mb-5">
                En esta pantalla podrás ver el progreso de tu colección de figuritas</p>
                {!isEditing && <Button className="btn btn-success" onClick={() => enableProfileEditing()}>Editar perfil</Button>}
                {isEditing && <Button className="btn btn-success" disabled={!hasMandatoryFields()} onClick={() => acceptChanges()}>Guardar</Button>}
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
                <hr/>
                <div className="pt-0 pt-md-4 card-body">
                  <div className="row">
                      <div className="card-profile-stats d-flex flex-row justify-content-center mt-md-5">
                        <div><span className="heading">{user.exchanges_amount}</span><span className="description">Intercambios realizados</span></div>
                        <div><span className="heading">{user.stickers_collected}</span><span className="description">Figuritas coleccionadas</span></div>
                        <div><span className="heading">{user.album_completion_pct.toPrecision(1)}%</span><span className="description">Album completo</span></div>
                      </div>
                  </div>
                  <div className="row">
                    <div className="d-flex flex-column align-items-center">
                      <h3>
                        {user.name} {user.lastname},
                        <span className="font-weight-light"> {getYearsOld()}</span>
                      </h3>
                      <div><i className="ni education_hat mr-2"></i>{user.country}</div>
                      <Button className="btn-danger" onClick={handleLogout}>Cerrar Sesion</Button>
                      <hr className="my-4"/>
                    </div>
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
                  <form>
                    <h6 className="heading-small text-muted mb-4">Información usuario</h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="row">
                              <label className="form-control-label">Nombre</label>
                              {form.name.length === 0 && isEditing &&
                                  <label className="form-control-label text-danger">{ProfileStrings.MANDATORY_FIELD}</label>}
                            </div>
                            <input
                              id="input-username" placeholder="Nombre" type="name"
                              name='name'
                              className="form-control-alternative form-control"
                              onChange={handleChange}
                              value={form.name}
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
                            <div className="row">
                            <label className="form-control-label">Apellido</label>
                              {form.lastname.length === 0 && isEditing &&
                                  <label className="form-control-label text-danger">{ProfileStrings.MANDATORY_FIELD}</label>}
                            </div>
                            <input
                              id="input-lastname" placeholder="Apellido"
                              type="lastname"
                              name='lastname'
                              className="form-control-alternative form-control"
                              onChange={handleChange}
                              value={form.lastname}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Fecha de nacimiento</label>
                            <input id="input-date_of_birth"
                                   type="date"
                                   name='date_of_birth'
                                   className="form-control-alternative form-control"
                                   value={form.date_of_birth}
                                   onChange={handleChange}
                                   disabled={!isEditing}
                                   min={getMin()}
                                   max={getMax()}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">País</label>
                            <input id="input-country"
                                   placeholder="Pais"
                                   type="country"
                                   name='country'
                                   className="form-control-alternative form-control"
                                   onChange={handleChange}
                                   disabled={!isEditing}
                                   value={form.country}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4"/>
                    <h6 className="heading-small text-muted mb-4">Paises favoritos</h6>
                    <div className="pl-lg-4 text-center">
                      <div className="row row-cols-lg-auto row-cols-md-auto">
                          {ALBUM_PAGES.map((country, index) =>
                            <div key={country} className="position-relative">
                              <span className={`fi fi-${COUNTRIES_TO_FLAG.get(STRING_TO_ENUM.get(country) || ECOUNTRIES.Arg)} ${isSelected(country) ? "btn btn-success" : "btn btn-primary"}`}
                                    onClick={isEditing ? () => selectCountry(country) : undefined}></span>
                              {isSelected(country) &&
                                <span style={{left: 60, top: 5 }} className="position-absolute translate-middle badge rounded-pill bg-translucent-darker">
                                            <i className="ni ni-check-bold text-success"></i>
                              </span>}
                            </div>
                          )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Success modal={{header: "¡Felicidades!", body: "¡Gracias por completar tu perfil! Te hemos dado 3 paquetes de regalo."}} isOpen={showSuccessCompleteProfile} onAccept={toggleShowSuccessCompleteProfile}/>
      </div>
    </React.Fragment>

  )
}

export default MyProfile
