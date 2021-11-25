import React from "react";
import { useDrop } from "react-dnd";

function Board({ board, addImageToBoard }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "signature",
    drop: (sigImgUrl) => addImageToBoard(sigImgUrl),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  console.log(board, "board")

  return (
    <div id="my-node">
      <div id="signatureBoard" className="Board" ref={drop}>
        {board.map((picture, index) => <img key={index} src={picture} alt="sig" width="300px" /> )}
      </div>
    </div>
  )
}

export default Board
