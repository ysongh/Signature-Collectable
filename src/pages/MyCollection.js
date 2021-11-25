import React, { useEffect, useState } from 'react'

import Spinner from '../components/common/Spinner';
import { COVALENT_APIKEY } from '../config';

function MyCollection({ account }) {
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(account) loadMyCollection();
  }, [account])

  const loadMyCollection = async () => {
    try{
      setLoading(true);
      const nft = await fetch(`https://api.covalenthq.com/v1/137/address/${account}/balances_v2/?nft=true&key=${COVALENT_APIKEY}`);
      const { data } = await nft.json();
  
      console.log(data);
      console.log(data.items[0].nft_data);
      setLoading(false);
      setUserNFTs(data.items[0].nft_data || []);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className='container mt-4'>
      <h1 className="mb-4">Your Signature NFT</h1>
      <div className="row">
        {loading
          ? <Spinner />
          : userNFTs.map(nft => (
          <div className="col-sm-12 col-md-4 col-lg-3" key={nft.token_id}>
            <div className="card">
              <img src={nft.external_data.image} className="card-img-top" alt="Signature" />
              <div className="card-body">
                <h5 className="card-title">{nft.external_data.name}</h5>
                <p className="card-text">{nft.external_data.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!account
        ? <p className="text-center mt-5 h4 text-danger">
            Connect to your ETH Wallet
          </p>
        : !userNFTs.length && !loading
          && <p className="text-center mt-5 h4 text-danger">
            You do not have any NFT yet
          </p>
      }
    </div>
  )
}

export default MyCollection
