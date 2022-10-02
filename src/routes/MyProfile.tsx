import React from "react";
import MyNavbar from "../components/MyNavbar";

const MyProfile = () => {
  return (
    <React.Fragment>
      <MyNavbar/>
      <div className="main-content">
        <div className="main-content">
          <span className="mask bg-gradient-default opacity-8"></span>
          <div className="d-flex align-items-center container-fluid">
            <div className="row">
              <div className="col-md-10 col-lg-7">
                <h1 className="display-2">Hello Jesse</h1><p
                className="mt-0 mb-5">This is your profile page. You can see the progress you've made with
                your
                work and manage your projects or assigned tasks</p>
                <a href="#pablo" className="btn btn-info">Edit profile</a>
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
                        <a href="#pablo">
                          <img alt="..." className="rounded-circle" src="/argon-dashboard-react/static/media/team-4-800x800.99c612eb.jpg"/></a>
                      </div>
                    </div>
                  </div>
                  <div className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 card-header">
                    <div className="d-flex justify-content-between"><a href="#pablo"
                                                                       className="mr-4 btn btn-info btn-sm">Connect</a><a
                      href="#pablo" className="float-right btn btn-default btn-sm">Message</a></div>
                  </div>
                  <div className="pt-0 pt-md-4 card-body">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div><span className="heading">22</span><span className="description">Friends</span></div>
                          <div><span className="heading">10</span><span className="description">Photos</span></div>
                          <div><span className="heading">89</span><span className="description">Comments</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center"><h3>Jessica Jones<span className="font-weight-light">, 27</span></h3>
                      <div className="h5 font-weight-300"><i className="ni location_pin mr-2"></i>Bucharest, Romania</div>
                      <div className="h5 mt-4"><i className="ni business_briefcase-24 mr-2"></i>Solution Manager -
                        Creative
                        Tim Officer
                      </div>
                      <div><i className="ni education_hat mr-2"></i>University of Computer Science</div>
                      <hr className="my-4"/>
                      <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy —
                        writes,
                        performs and records all of his own music.</p><a href="#pablo">Show more</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-xl-1 col-xl-8">
                <div className="bg-secondary shadow card">
                  <div className="bg-white border-0 card-header">
                    <div className="align-items-center row">
                      <div className="col-8"><h3 className="mb-0">My account</h3></div>
                      <div className="text-right col-4"><a href="#pablo" className="btn btn-primary btn-sm">Settings</a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form className=""><h6 className="heading-small text-muted mb-4">User information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group"><label className="form-control-label"
                                                               htmlFor="input-username">Username</label><input
                              id="input-username" placeholder="Username" type="text"
                              className="form-control-alternative form-control" value="lucky.jesse"/></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group"><label className="form-control-label" htmlFor="input-email">Email
                              address</label><input id="input-email" placeholder="jesse@example.com" type="email"
                                                    className="form-control-alternative form-control"/></div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group"><label className="form-control-label" htmlFor="input-first-name">First
                              name</label><input id="input-first-name" placeholder="First name" type="text"
                                                 className="form-control-alternative form-control" value="Lucky"/></div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group"><label className="form-control-label" htmlFor="input-last-name">Last
                              name</label><input id="input-last-name" placeholder="Last name" type="text"
                                                 className="form-control-alternative form-control" value="Jesse"/></div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4"/>
                      <h6 className="heading-small text-muted mb-4">Contact information</h6>
                      <div className="pl-lg-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group"><label className="form-control-label"
                                                               htmlFor="input-address">Address</label><input
                              id="input-address" placeholder="Home Address" type="text"
                              className="form-control-alternative form-control"
                              value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"/></div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="form-group"><label className="form-control-label"
                                                               htmlFor="input-city">City</label><input id="input-city"
                                                                                                       placeholder="City"
                                                                                                       type="text"
                                                                                                       className="form-control-alternative form-control"
                                                                                                       value="New York"/>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group"><label className="form-control-label"
                                                               htmlFor="input-country">Country</label><input
                              id="input-country" placeholder="Country" type="text"
                              className="form-control-alternative form-control" value="United States"/></div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group"><label className="form-control-label" htmlFor="input-country">Postal
                              code</label><input id="input-postal-code" placeholder="Postal code" type="number"
                                                 className="form-control-alternative form-control"/></div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4"/>
                      <h6 className="heading-small text-muted mb-4">About me</h6>
                      <div className="pl-lg-4">
                        <div className="form-group"><label>About Me</label><textarea
                          placeholder="A few words about you ..." rows={4}
                          className="form-control-alternative form-control">A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <footer className="footer">
              <div className="align-items-center justify-content-xl-between row">
                <div className="col-xl-6">
                  <div className="copyright text-center text-xl-left text-muted">© 2022 <a
                    className="font-weight-bold ml-1"
                    href="https://www.creative-tim.com?ref=adr-admin-footer"
                    rel="noopener noreferrer"
                    target="_blank">Creative Tim</a>
                  </div>
                </div>
                <div className="col-xl-6">
                  <ul className="nav-footer justify-content-center justify-content-xl-end nav">
                    <li className="nav-item"><a href="https://www.creative-tim.com?ref=adr-admin-footer"
                                                rel="noopener noreferrer" target="_blank" className="nav-link">Creative
                      Tim</a></li>
                    <li className="nav-item"><a href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                                                rel="noopener noreferrer" target="_blank" className="nav-link">About
                      Us</a>
                    </li>
                    <li className="nav-item"><a href="http://blog.creative-tim.com?ref=adr-admin-footer"
                                                rel="noopener noreferrer" target="_blank" className="nav-link">Blog</a>
                    </li>
                    <li className="nav-item"><a
                      href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                      rel="noopener noreferrer" target="_blank" className="nav-link">MIT License</a></li>
                  </ul>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}

export default MyProfile
