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
        <div>
            TO DO: show quote
        </div>
    </div>
  )  
}

export default Quote