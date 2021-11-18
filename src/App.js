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
  }

  const load = () => {
    sigPad.current.fromDataURL(signatureData);
  }

  return (
    <div>
      <h1>Signature Collectable</h1>
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
      <button onClick={load}>Load</button>
      <SignaturePad penColor='blue' ref={sigPad} />
    </div>
  );
}

export default App;
