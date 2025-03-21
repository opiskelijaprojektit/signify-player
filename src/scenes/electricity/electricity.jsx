import StockData from "./stockdata"; 
import "./electricity.css"; 

/**
 * This component serves as the main element of the electricity price view. 
 * It contains the `NoudaPrice` component, which retrieves electricity 
 * price data and draws a graph.
 * 
 * @component
 * @author Vesa Pellikka
 */
function Electricity() {
  return (
    //Päätason `div`
    //- Tähän voidaan tarvittaessa lisätä muita sähkön hintaan liittyviä elementtejä tulevaisuudessa.
    <div>
      {/* NoudaHinta-komponentti vastaa sähkön hintojen hausta ja visualisoinnista */}
      <StockData />
    </div>
  );
}

export default Electricity; 