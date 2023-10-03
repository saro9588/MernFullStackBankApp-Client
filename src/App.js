import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from "./Context";
import { HashRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Balance from './Balance';
import AllData from './AllData';
import Transactions from './Transactions';
import { initAuth } from './firebase';
import './App.css';

function App() {
  useEffect(() => {
    initAuth(); // Initialize Firebase authentication
  }, []); 
  return (
    <HashRouter>
      <div>
        <NavBar />        
        <UserContext.Provider value={{users:[]}}>
          <div className="container" style={{padding: "20px"}}>
           <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/CreateAccount/" element={<CreateAccount/>} />
              <Route path="/login/" element={<Login/>} />
              <Route path="/deposit/" element={<Deposit/>} />
              <Route path="/withdraw/" element={<Withdraw/>} />
              <Route path="/balance/" element={<Balance/>} />
              <Route path="/alldata/" element={<AllData/>} />
              <Route path="/transactions/" element={<Transactions/>} /> 
            </Routes> 
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;





 