import React from 'react';
import { useDrag } from 'react-dnd';

function SignatureImg({ sigImgUrl, signatureData }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "signature",
    item: {
      sigImgUrl: sigImgUrl
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(sigImgUrl, signatureData);

  return (
    <div>
      <img
        className="signatureImg"
        ref={drag}
        src={sigImgUrl}
        alt="signature"
        width="300px"
        style={{ border: isDragging ? "5px solid blue" : "0px" }}/>
    </div>
  )
}

export default SignatureImg;
