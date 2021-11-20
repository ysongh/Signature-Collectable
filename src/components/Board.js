import React, { useState } from "react";
import { useDrop } from "react-dnd";

function Board({ sigImgUrl }) {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "signature",
    drop: () => addImageToBoard(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = () => {
    const temp = [...board];
    temp.push(sigImgUrl);
    setBoard(temp);
    console.log(board, sigImgUrl, temp);
  };

  return (
    <div>
      <div id="signatureBoard" className="Board" ref={drop}>
        {board.map((picture, index) => <img key={index} src={picture} alt="sig" width="300px" /> )}
      </div>
    </div>
  )
}

export default Board
