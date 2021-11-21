import React, { useState }from 'react';

function MintForm({ mint }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [transactionUrl, setTransactionUrl] = useState('');

  const handleMint = async () => {
    console.log(name, description, address);
    const url = await mint(name, description, address);
    setTransactionUrl(url);
  }

  return (
    <div className="card card-body m-auto">
      <h2>Mint NFT for free on Polygon</h2>
      <div className="mb-3">
        <label for="name" className="form-label">Name</label>
        <input className="form-control" id="name" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label for="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="mb-3">
        <label for="address" className="form-label">ETH Address or ENS Name to mint NFT to</label>
        <input className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary mb-3" onClick={handleMint}>
          Mint
        </button>
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
