import React from 'react';
import SignIn from "./components/SignIn";
import MyNavbar from "./components/MyNavbar";
import {Route, Routes} from "react-router-dom";
import MyStickers from "./components/MyStickers";

function App() {
  return (
    <React.Fragment>
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/my-stickers" element={<MyStickers />} />
      </Routes>
    </React.Fragment>

  );
}

export default App;
