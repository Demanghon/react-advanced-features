import React from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import { useContext } from 'react/cjs/react.development';

function App() {
 
  const authCtx = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login/>}
        {authCtx.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
