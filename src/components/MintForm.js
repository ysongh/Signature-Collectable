import React, { useState }from 'react';

import SpinnerButton from './common/SpinnerButton';

function MintForm({ user, mint }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [transactionUrl, setTransactionUrl] = useState('');
  const [mintLoading, setMintLoading] = useState(false);

  const applyYourAddress = () => {
    console.log(user);
    setAddress(user.wallet_address);
  }

  const handleMint = async () => {
    try{
      setMintLoading(true);

      console.log(name, description, address);
      const url = await mint(name, description, address);
      setTransactionUrl(url);
      setMintLoading(false);
    } catch(error) {
      console.error(error);
      setMintLoading(false);
    }
  }

  return (
    <div className="card card-body m-auto">
      <h2>Mint NFT for free on Polygon</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input className="form-control" id="name" onChange={(e) => setName(e.target.value)}/>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>

      <label htmlFor="address" className="form-label">ETH Address or ENS Name to mint NFT to</label>
      <div className="input-group mb-3">
        <input className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} value={address} />
        <button className="btn btn-outline-secondary" onClick={applyYourAddress}>
          Use Your Address
        </button>
      </div>

      <div className="mb-3">
        {!mintLoading
          ? <button className="btn btn-primary btn-lg mb-3" onClick={handleMint}>
              Mint NFT
            </button>
          : <SpinnerButton />
        }
      </div>
      {transactionUrl &&
        <p className="text-success" style={{ fontSize: '1.4rem'}}>
          Success, see transaction {" "}
          <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
              {transactionUrl}
          </a>
        </p>
      }
    </div>
  )
}

export default MintForm
