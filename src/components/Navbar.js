import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

import SignatureCollectable from '../abis/SignatureCollectable.json';

function Navbar({ account, setAccount, setSCContract }) {
  const loadBlockchain = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const web3 = window.web3;

    const netId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();

    setAccount(accounts[0]);

    if(netId){
      const contract = new web3.eth.Contract(SignatureCollectable.abi, SignatureCollectable.networks[netId].address);
      setSCContract(contract);
    }
    else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Signature Collectable</a>
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
          <button className="btn btn-success" onClick={loadBlockchain}>
            {account ? account.substring(0,8) + "..." + account.substring(34,42) :"Connect to Wallet"}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
