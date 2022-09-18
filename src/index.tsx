import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignIn} from "./routes/SignIn";
import MyStickers from "./routes/MyStickers";
import {Register} from './routes/Register';
import {AuthProvider} from './context/authContext';
import {ProtectedRoute} from './routes/ProtectedRoute';
import MyAlbum from "./routes/MyAlbum";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import Packet from "./routes/Packet"
import PacketOpen from "./routes/PacketOpen";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//TODO: si ya esta logeado deberia enviarlo directo al welcome
// usar el context para eso; es decir tener un
// NavStack/Routers distinto para el que esta logeado

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <App/>
            </ProtectedRoute>
          }/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/my-stickers" element={
            <ProtectedRoute>
              <DndProvider backend={HTML5Backend}>
                <MyStickers/>
              </DndProvider>
            </ProtectedRoute>
          }/>
          <Route path="/my-album" element={
            <ProtectedRoute>
              <MyAlbum/>
            </ProtectedRoute>
          } />
          <Route path="/packet" element={
            <ProtectedRoute>
              <Packet />
            </ProtectedRoute>
          } />
          <Route path="/packet/open" element={
            <ProtectedRoute>
              <PacketOpen />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
