import { orientations } from "../../utils/types"   // screen orientation type
import './Anniversary.css'

/**
 * An anniversary component that displays anniversaries
 * of notable people and events using 
 * Wikimedia's "On this day" API.
 *
 * @component
 * @author Annastiina Koivu
 */
function Anniversary(props) {

    const events = props.data.selected + '02/11'
    const births = props.data.births + '02/11'
    const deaths = props.data.deaths + '02/11'

    return (
        <div className="scene_anniversary">
            <h1>February 11th</h1>

            <h2>Happened today in history:</h2>
            <p>Sisältö saadaan osoitteesta:<br></br>{events}</p>
            
            <h2>Birthdays:</h2>
            <p>Sisältö saadaan osoitteesta:<br></br>{births}</p>
            
            <h2>Deaths:</h2>
            <p>Sisältö saadaan osoitteesta:<br></br>{deaths}</p>
        </div>
    )
}

export default Anniversary