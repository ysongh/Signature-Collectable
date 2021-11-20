import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

import Navbar from './components/Navbar';
import MintForm from './components/MintForm';

import { SLATEAPIKEY, NFTPORT_APIKEY } from './config';

function App() {
  let sigPad = useRef({});
  let signatureData;

  const clear = () => {
    sigPad.current.clear();
  }

  const save = async () => {
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
  }

  const load = () => {
    sigPad.current.fromDataURL(signatureData);
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
    signatureData = sigPad.current.toDataURL();
    console.log(signatureData);

    const imageData = convertBase64ToImage(signatureData);
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

  return (
    <div>
      <Navbar />
      <div className='container mt-4'>
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="btn-group btn-group-lg mb-4" role="group" >
              <button type="button" className="btn btn-outline-primary" onClick={clear}>
                Clear
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={save}>
                Save
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={load}>
                Load
              </button>
              <button type="button" className="btn btn-outline-primary"  data-bs-toggle="collapse" data-bs-target="#collapseExample">
                Mint
              </button>
            </div>
          </div>

          <div className="col-sm-12 col-md-9">
            <p className="text-center h4">Sign Here</p>
            <div className='signatureContainer'>
              <SignaturePad
                penColor='blue'
                ref={sigPad}
                canvasProps={{ className: "signaturePad" }} />
            </div>
          </div>
        </div>

        <div className="collapse mt-4" id="collapseExample">
          <MintForm mint={mint} />
        </div>
      </div>
    </div>
  );
}

export default App;
