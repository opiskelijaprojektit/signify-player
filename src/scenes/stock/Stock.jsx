import { orientations } from "../../utils/types"   // screen orientation type
import { useState, useEffect } from 'react'
import './Stock.css'

/**
 * A component that fetches price of a stock
 * from NYSE or NASDAQ.
 *
 *
 * @component
 * @author Valtteri Pykäläinen
 */

function Stock(props){  

const [price, setPrice] = useState('Valitettavasti kurssitietoa ei ole saatavilla');

useEffect(() => {
  
    const apiKey = props.apikey;  // Replace with your actual API key
    const stockSymbol = props.symbol; // You can change this to the stock symbol you want, e.g., 'AAPL', 'GOOGL', etc.
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${apiKey}`;
    //console.log(apiKey + stockSymbol); // Debug code

    function FetchPrice() {
      fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data['Time Series (5min)']) {
              const latestTimestamp = Object.keys(data['Time Series (5min)'])[0];
              const latestData = data['Time Series (5min)'][latestTimestamp];
              const stockPrice = latestData['4. close'];  // Close price for the latest timestamp                         
              //console.log(stockPrice); // Debug code
              setPrice(stockPrice);
              
                          
          } else {
              console.log('Error fetching stock data:', data);
          }
      })
      .catch(error => console.error('Error:', error));
    
     
      
    }
    //Call the function to get the stock price
    FetchPrice();
    
})

 return (
    <div className="scene_stock"> 
        <div className="scene_stock_h1">Osakekurssi</div>
        <div className="scene_stock_h2">Osakkeen  {props.symbol}</div>
        <div className="scene_stock_h2">kurssi on ($)</div>
        <div className="scene_stock_price">{price}</div>
    </div>
  ); 
 
        
}
export default Stock