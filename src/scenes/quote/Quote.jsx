import './Quote.css'
import backgroundImage from './bg_quote.jpg'

/**
 * A component that displays an inspirational quote that changes daily.
 *
 * @component
 * @author Ada Vuorinen
 */
function Quote(props) {

  return (
    <div className="quote" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="quote_header">
        <h1>Quote of the Day</h1>
      </div>
      <div className="quote_text">
        <p>&ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&rdquo;</p>
      </div>
      <div className="quote_author">
        <p>&mdash; Maecenas Sapien</p>
      </div>
      <div className="quote_attribution">
        <p>Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank">ZenQuotes API</a>
        </p>
      </div>
    </div>
  )  
}

export default Quote