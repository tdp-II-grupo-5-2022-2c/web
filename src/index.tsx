import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import "./assets/plugins/nucleo/css/nucleo.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignIn} from "./routes/SignIn";
import MyStickers from "./routes/MyStickers";
import {ProtectedRoute} from './routes/ProtectedRoute';
import MyAlbum from "./routes/MyAlbum";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import PacketOpen from "./routes/PacketOpen";
import {UserProvider} from "./context/UserContext";
import {ROUTES} from "./routes/RoutesNames";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <UserProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <App/>
            </ProtectedRoute>
          }/>
          <Route path={ROUTES.SIGNIN} element={<SignIn/>}/>
          <Route path={ROUTES.MYSTICKERS} element={
            <ProtectedRoute>
              <DndProvider backend={HTML5Backend}>
                <MyStickers/>
              </DndProvider>
            </ProtectedRoute>
          }/>
          <Route path={ROUTES.MYALBUM} element={
            <ProtectedRoute>
              <MyAlbum/>
            </ProtectedRoute>
          } />
          <Route path={ROUTES.DAILYPACKET} element={
            <ProtectedRoute>
              <PacketOpen />
            </ProtectedRoute>
          } />
        </Routes>
        </UserProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
