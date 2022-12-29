import React, { useState, createContext } from "react";

export const MatrixContext = createContext();

export const MatrixProvider = props => {
  const [matrix, setMatrix] = useState({
    numberOfInputs: 2,
    numberOfOutouts: 3,
    overCell: {
      row: "",
      col: "",
    },
  });

  return (
    <MatrixContext.Provider value={[matrix, setMatrix]}>
      {props.children}
    </MatrixContext.Provider>
  );
};
