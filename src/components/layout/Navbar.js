import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Web3 from 'web3';

import SignatureCollectable from '../../abis/SignatureCollectable.json';
import { web3modal } from '../Web3modal'
import Logo from '../../logo.png';

function Navbar({ account, setUser, setAccount, setSCContract, uauth }) {
  const history = useHistory();

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
      history.push('./dashboard');
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
              <Link className="nav-link" aria-current="page" to="/howitworks">How It Works</Link>
            </li>
            {account
              && <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/my-collection">My Collection</Link>
                </li>
            }
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
              ? "Open Wallet"
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
