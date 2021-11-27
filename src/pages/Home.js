import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SignaturePad from 'react-signature-canvas';
import * as htmlToImage from 'html-to-image';

import SignatureImg from '../components/SignatureImg';
import Board from '../components/Board';
import MintForm from '../components/MintForm';
import Spinner from '../components/common/Spinner';

import { SLATEAPIKEY, NFTPORT_APIKEY } from '../config';

function Home({ account, scContract }) {
  const { address } = useParams();

  const [sigImgUrl, setSigImgUrl] = useState('');
  const [board, setBoard] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

  let sigPad = useRef({});
  let signatureData;
  let signatureArray = [];

  const clear = () => {
    sigPad.current.clear();
  }

  const uploadToIPFS = async () => {
    try{
      setSaveLoading(true);
      signatureData = sigPad.current.toDataURL();
      console.log(signatureData);

      const imageData = convertBase64ToImage(signatureData);
      console.log(imageData);

      const url = 'https://uploads.slate.host/api/public';

      let file = imageData;
      let data = new FormData();
      data.append("data", file);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: SLATEAPIKEY, // API key
        },
        body: data
      });

      const json = await response.json();
      console.log(json);
      setSigImgUrl(`https://slate.textile.io/ipfs/${json.data.cid}`);
      setSaveLoading(false);
    } catch(error) {
      console.error(error);
      setSaveLoading(false);
    }
  }

  const load = () => {
    sigPad.current.fromDataURL(signatureData);
  }

  const loadFromContract = async () => {
    const images = await scContract.methods.getSignatureImages(address || account).call();
    setBoard(images);
    signatureArray = [images];
  }

  const save = async () => {
    const tx = await scContract.methods
      .addImageToCollection(address || account, board)
      .send({ from: account });

    console.log(tx);
  }

  const convertBase64ToImage = signatureData => {
    const filename = "signature.png";
    let arr = signatureData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  const mint = async (name, description, address) => {
    if(address[0] !== '0'){
      const ethAddress = await window.web3.eth.ens.getAddress(address);
      console.log(ethAddress);
      address = ethAddress;
    }

    const node = document.getElementById('my-node');
    const dataUrl = await htmlToImage.toPng(node);
    console.log(dataUrl);

    const imageData = convertBase64ToImage(dataUrl);
    console.log(imageData);

    const form = new FormData();
    form.append('file', imageData);

    const options = {
      method: 'POST',
      body: form,
      headers: {
        "Authorization": NFTPORT_APIKEY,
      },
    };

    const response = await fetch("https://api.nftport.xyz/easy_mint?" + new URLSearchParams({
      chain: 'polygon',
      name: name,
      description: description,
      mint_to_address: address,
    }), options);

    const json = await response.json();
    console.log(json);
    return json.transaction_external_url;
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}collection/${account}`);
  }

  const addImageToBoard = ({ sigImgUrl }) => {
    console.log("signatureArray", sigImgUrl);
    setBoard([...board, sigImgUrl]);
  };

  return (
    <div className='container mt-4'>
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <div className="btn-group btn-group-lg mb-4" role="group" >
            <button type="button" className="btn btn-outline-primary" onClick={clear}>
              Clear
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={uploadToIPFS}>
              Upload to IPFS
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={load}>
              Load
            </button>
          </div>
          <p className="text-center h4">Sign Here</p>
          <div className='signatureContainer'>
            <SignaturePad
              penColor='blue'
              ref={sigPad}
              canvasProps={{ className: "signaturePad" }} />
          </div>
          {saveLoading
            ? <Spinner />
            : sigImgUrl && (
                <div>
                  <p className="text-center mt-4 h4">Drag and drop to Board</p>
                  <SignatureImg sigImgUrl={sigImgUrl} signatureData={signatureData} />
                </div>
              )
          }
        </div>

        <div className="col-sm-12 col-md-7">
          <div className="btn-group btn-group-lg mb-4" role="group" >
            {scContract && <button type="button" className="btn btn-outline-primary" onClick={loadFromContract}>
              Load from Contract
            </button>}
            {scContract && <button type="button" className="btn btn-outline-primary" onClick={save}>
              Save to Contract
            </button>}
            <button type="button" className="btn btn-outline-primary"  data-bs-toggle="collapse" data-bs-target="#collapseExample">
              Mint on Polygon
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={copyLink}>
              Copy Link
            </button>
          </div>
          <p className="text-center h4">Your Collection Board</p>
          <div className="collapse mt-4" id="collapseExample">
            <MintForm mint={mint} />
          </div>
          <div className="card">
            <Board
              board={board}
              addImageToBoard={addImageToBoard} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
