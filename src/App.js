import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

function App() {
  let sigPad = useRef({});

  return (
    <div>
      <h1>Signature Collectable</h1>
      <SignaturePad penColor='blue' ref={sigPad} />
    </div>
  );
}

export default App;
