import React from "react";
import { MatrixProvider } from "./MatrixContext";
import TopMatrix from "./TopMatrix";

export default function TopTopMAtrix() {
  return (
    <MatrixProvider>
      <TopMatrix />
    </MatrixProvider>
  );
}
