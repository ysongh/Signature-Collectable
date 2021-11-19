import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

function App() {
  let sigPad = useRef({});
  let signatureData;

  const clear = () => {
    sigPad.current.clear();
  }

  const save = () => {
    signatureData = sigPad.current.toDataURL();
    console.log(signatureData);

    const imageData = convertBase64ToImage(signatureData);
    console.log(imageData);
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

  return (
    <div className='container'>
      <h1>Signature Collectable</h1>
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
      <button onClick={load}>Load</button>
      <div className='signatureContainer'>
        <SignaturePad
          penColor='blue'
          ref={sigPad}
          canvasProps={{ className: "signaturePad" }} />
      </div>
    </div>
  );
}

export default App;
