import './Quote.css'
import backgroundImage from './bg_quote.jpg'
import Quotes from './quotes.json'

/**
 * A component that displays an inspirational quote that changes daily.
 * Quotes are pulled from a list of 367 quotes.
 * 
 * @component
 * @author Ada Vuorinen
 */
function Quote(props) {

  // Calculate the day of the year as integer between 1-366
  // First, get today's date and time
  let date = new Date()
  // Convert to UTC to avoid DST problems and subtract start of year
  let dayOfYear = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000)
  
  // Return the Quote component
  return (
    <div className="quote" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="quote_header">
        <h1>Quote of the Day</h1>
      </div>
      <div className="quote_text">
        <p>&ldquo;{ Quotes && Quotes[dayOfYear-1].q }&rdquo;</p>
      </div>
      <div className="quote_author">
        <p>&mdash; { Quotes && Quotes[dayOfYear-1].a }</p>
      </div>
      <div className="quote_attribution">
        <p>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a>
        </p>
      </div>
    </div>
  )  
}

export default Quote