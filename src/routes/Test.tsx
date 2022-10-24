import React from "react";
import CommunityExchanges from "../components/CommunityExchanges";
import MyNavbar from "../components/MyNavbar";

const Test = () => {
  return(
    <React.Fragment>
      <MyNavbar/>
      <h1>Test</h1>
      <CommunityExchanges communityId={"asd"}/>
    </React.Fragment>
  )
}

export default Test
