import NoudaHinta from "./Nouda_hinta"; // Tuodaan sähkön hintakomponentti
import "./Sahko.css"; // Tuodaan komponentin tyylit
import React from "react"; //`React`: Tarvitaan JSX-syntaksin käyttämiseen.

// Sähkökomponentti (`Sahko`)
//- Tämä komponentti toimii sähkön hintanäkymän pääelementtinä.
//- Se sisältää `NoudaHinta`-komponentin, joka hakee sähkön hintatiedot ja piirtää kaavion.
function Sahko() {
    return (

        //Päätason `div`
        //- Tähän voidaan tarvittaessa lisätä muita sähkön hintaan liittyviä elementtejä tulevaisuudessa.
        <div>
            {/* NoudaHinta-komponentti vastaa sähkön hintojen hausta ja visualisoinnista */}
            <NoudaHinta />
        </div>
    );
}

export default Sahko; // Viedään komponentti käytettäväksi muualla sovelluksessa