import NoudaHinta from "./Nouda_hinta"; // Tuodaan sähkön hintakomponentti
import "./Sahko.css"; // Tuodaan komponentin tyylit
import React from "react";

// Sahko-komponentti toimii sovelluksen pääasiallisena näkymänä
function Sahko() {
    return (
        <div>
            {/* NoudaHinta-komponentti vastaa sähkön hintojen hausta ja visualisoinnista */}
            <NoudaHinta />
        </div>
    );
}

export default Sahko; // Viedään komponentti käytettäväksi muualla sovelluksessa
