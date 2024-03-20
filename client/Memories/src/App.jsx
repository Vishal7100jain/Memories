import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from './component/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContainer from './component/mainContainer/mainContainer.jsx';
import { Auth } from './component/auth/Auth.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="279998069210-b14n7974gs2rn29lc2miqlb67k114ofp.apps.googleusercontent.com">
          <Container maxWidth='lg'>
            <Navbar />
            <Routes >
              <Route path='/' exact Component={MainContainer}></Route>
              <Route path='/auth' Component={Auth}></Route>
            </Routes>
          </Container >
        </GoogleOAuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App;
