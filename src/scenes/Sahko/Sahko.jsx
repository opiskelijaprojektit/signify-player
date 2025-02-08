import { orientations } from "../../utils/types"   // screen orientation type
import NoudaHinta from "./Nouda_hinta";
import './Sahko.css'
import React from "react";


function Sahko() {
  return (
      <div className="sahko-container">
          <h2>Sähkön hinta</h2>
          <NoudaHinta />
      </div>
  );
}

export default Sahko;
