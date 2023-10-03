import React from 'react';
import { auth } from './firebase';
import { signOut } from "firebase/auth"; 

function NavBar() {

  async function handle() {
    await auth.signOut();
    let homeLinkAnchor = document.getElementById('homeLinkAnchor');
    homeLinkAnchor.click();
  }
   
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">BadBank</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" aria-controls="#navbarNav" aria-expanded="false" 
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item" id="homeLink">
              <a className="nav-link" id="homeLinkAnchor" href="#/">Home</a>
            </li>
            <li className="nav-item" id="createLink">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item" id="balanceLink" style={{display: 'none'}}>
              <a className="nav-link" href="#/balance/">Balance</a>
            </li>
            <li className="nav-item" id="depositLink" style={{display: 'none'}}>
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item" id="withdrawLink" style={{display: 'none'}}>
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item" id="dataLink">
              <a className="nav-link" href="#/AllData/">All Data</a>
            </li>
            <li className="nav-item" id="loginLink">
              <a className="nav-link" href="#/login/">Log In</a>
            </li> 
            <li className="nav-item" id="logoutLink" style={{display: 'none', cursor: 'pointer'}}>
              <a className="nav-link  fw-bold" onClick={handle}>Log Out</a>
            </li>
          </ul>
        </div>
        <div className="float-end">
          <span className="fw-bold mt-1 text-black" id="loggedInStatus">No User</span>
        </div>
    </nav>
  );
}

export default NavBar;
  



