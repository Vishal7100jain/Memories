import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Navbar from './component/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';
import MainContainer from './component/mainContainer/mainContainer.jsx';
import { Auth } from './component/auth/Auth.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './component/postDetails/PostDetails.jsx';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.Auth)
  const [render, setRender] = useState(false)

  useEffect(() => {
    setRender((pre) => !pre)
  }, [user])

  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="279998069210-b14n7974gs2rn29lc2miqlb67k114ofp.apps.googleusercontent.com">
          <Container maxWidth='xl'>
            <Navbar />
            <Routes >
              <Route path='/' exact element={< Navigate to={"/post"} />} />
              <Route path='/post' exact element={<MainContainer />}></Route>
              <Route path='/posts/Search' exact element={<MainContainer />}></Route>
              <Route path='/posts/:id' exact element={<PostDetails />} />
              <Route path='/auth' element={!user ? <Auth /> : < Navigate to={'/posts/'} />} ></Route>
            </Routes>
          </Container >
        </GoogleOAuthProvider>
      </BrowserRouter >
    </>
  )
}

export default App;
