import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css'
import './assets/plugins/nucleo/css/nucleo.css';
import './assets/css/argon-dashboard-react.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/App.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';

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
import MyProfile from "./routes/MyProfile";
import MyCommunities from "./routes/MyCommunities";
import MyExchanges from "./routes/MyExchanges";
import Community from "./routes/Community";
import CreateExchange from "./routes/CreateExchange";
import {ErrorHandler} from "./context/ErrorHandler";
import Test from "./routes/Test";
import JoinCommunity from "./routes/JoinCommunity";
import BuyPacket from "./routes/BuyPacket";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ErrorHandler>
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
                  <DndProvider backend={HTML5Backend}>
                    <MyAlbum/>
                  </DndProvider>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.OPEN_PACKET} element={
                <ProtectedRoute>
                  <DndProvider backend={HTML5Backend}>
                    <PacketOpen />
                  </DndProvider>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MYPROFILE} element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MYCOMMUNITIES} element={
                <ProtectedRoute>
                  <MyCommunities />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.COMMUNITY} element={
                <ProtectedRoute>
                  <DndProvider backend={HTML5Backend}>
                    <Community />
                  </DndProvider>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.MY_EXCHANGES} element={
                <ProtectedRoute>
                  <DndProvider backend={HTML5Backend}>
                    <MyExchanges />
                  </DndProvider>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.CREATE_EXCHANGE} element={
                <ProtectedRoute>
                  <DndProvider backend={HTML5Backend}>
                    <CreateExchange />
                  </DndProvider>
                </ProtectedRoute>
              } />
              <Route path={ROUTES.COMMUNITY_JOIN} element={
                <ProtectedRoute>
                  <JoinCommunity />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.BUY_PACKET} element={
                <ProtectedRoute>
                  <BuyPacket />
                </ProtectedRoute>
              } />
              <Route path={ROUTES.TEST} element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              } />
            </Routes>
          </UserProvider>
        </ErrorHandler>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
