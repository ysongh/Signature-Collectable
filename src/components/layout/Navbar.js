import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UAuth from '@uauth/js'
import Web3 from 'web3';
import {
  UNSTOPPABLEDOMAINS_CLIENTID,
  UNSTOPPABLEDOMAINS_CLIENTSECRET,
  UNSTOPPABLEDOMAINS_REDIRECT_URI,
  UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI
} from '../../config';

import SignatureCollectable from '../../abis/SignatureCollectable.json';
import { web3modal } from '../Web3modal'
import Logo from '../../logo.png';

const uauth = new UAuth({
  // Client credentials copied from https://unstoppabledomains.com/app-dashboard
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  clientSecret: UNSTOPPABLEDOMAINS_CLIENTSECRET,

  // Requested scopes.
  scope: 'openid email wallet',

  // Redirect Uris copied from https://unstoppabledomains.com/app-dashboard
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  postLogoutRedirectUri: UNSTOPPABLEDOMAINS_LOGOUT_REDIRECT_URI,
})

function Navbar({ account, setUser, setAccount, setSCContract }) {
  useEffect(() => {
    uauth
      .user()
      .then(userData => {
        setUser(userData);
        setAccount(userData.sub);
      })
      .catch(error => {
        console.error('profile error:', error);
      })
  }, [])

  const loadBlockchain = async () => {
    const provider = await web3modal.connect();
    window.web3 = new Web3(provider);

    await window.ethereum.enable();
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const netId = await web3.eth.net.getId();
    const netData = SignatureCollectable.networks[netId];

    if(netData){
      const contract = new web3.eth.Contract(SignatureCollectable.abi, SignatureCollectable.networks[netId].address);
      setSCContract(contract);
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  const loginWithUnstoppableDomains = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
   
      console.log(authorization);
      setAccount(authorization.idToken.sub);
    } catch (error) {
      console.error(error);
    }
  }

  const logoutFromUnstoppableDomains = async () => {
    try {
      await uauth.logout();
   
      setAccount("");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img className="logo" src={Logo} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/my-collection">My Collection</Link>
            </li>
          </ul>
          {!account
            ? <button className="btn btn-sm me-2" onClick={loginWithUnstoppableDomains}>
                <img src="/unstoppable-default-button.png" alt="Unstoppable Button" width={300} />
              </button>
            : <button className="btn btn-danger me-2" onClick={logoutFromUnstoppableDomains}>
                Logout
              </button>
          }
          <button className="btn btn-success" onClick={loadBlockchain}>
            {!account
              ? "Connect to Wallet"
              : account.length === 42
                ? account.substring(0,8) + "..." + account.substring(34,42)
                : account
            }
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
