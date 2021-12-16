import React from 'react';

function HowItWorks() {
  return (
    <div className="container">
      <h1>How it works?</h1>
      <ol className="list-group list-group-numbered">
        <li className="list-group-item">
          Write your signature
        </li>
        <li className="list-group-item">
          Save your signature on IPFS
        </li>
        <li className="list-group-item">
          Drap and drop your signature to the collection board
        </li>
        <li className="list-group-item">
          Save your collection board on the contract
        </li>
        <li className="list-group-item">
          Share your collection board with other to sign
        </li>
        <li className="list-group-item">
          Mint your signatures as NFT
        </li>
      </ol>
    </div>
  )
}

export default HowItWorks;
