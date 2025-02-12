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

    // Variable for current day's date.
    const today = new Date()

    // Variable for month
    const m = today.getMonth()
    // ...and with 2-digits.
    const mmPadded = String(m + 1).padStart(2,"0")
    // Month as name.
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[m]

    // Variable for date
    const d = today.getDate()
    // ...and with 2-digits.
    const ddPadded = String(d).padStart(2,"0")

    // Returns the ordinal suffix for a given day number
    const nth = n => n>10&&n<14 ? "th"      // 11th - 13th
                     : n%10==1 ? "st"       // 1st, 21st, 31st
                     : n%10==2 ? "nd"       // 2nd, 22nd
                     : n%10==3 ? "rd"       // 3rd, 23rd
                     : "th"                 // All other numbers get th

    // API endpoint URLs for different categories
    const events = props.data.selected + mmPadded + '/' + ddPadded
    const births = props.data.births + mmPadded + '/' + ddPadded
    const deaths = props.data.deaths + mmPadded + '/' + ddPadded

    return (
        <div className="scene_anniversary">
            <div className="scene_anniversary_flex">
                <div className="scene_anniversary_header">
                    <h1>{month} {d + nth(d)}</h1>
                </div>

                <div className="scene_anniversary_events">
                    <h2>Happened today in history:</h2>
                    <div className="scene_anniversary_events_event">
                        <div>Vuosi:</div>
                        <div className="text">Sisältö saadaan Wikimedian 'On this day'-APIsta. Ja näin se homma toimii. Sisältö saadaan Wikimedian 'On this day'-APIsta. Ja näin se homma toimii. Sisältö saadaan Wikimedian 'On this day'-APIsta. Ja näin se homma toimii.</div>
                    </div>                                      
                </div>
            
                <div className="scene_anniversary_events scene_anniversary_people">
                    <div className>
                        <h2>Birthdays:</h2>
                        <div className="scene_anniversary_events_event scene_anniversary_people_event">
                            <div className="img"></div>
                            <div className="text">Sisältö saadaan Wikimedian 'On this day'-APIsta. Ja näin se homma toimii.</div>
                        </div>
                    </div>
                    
                    <div className>
                        <h2>Deaths:</h2>
                        <div className="scene_anniversary_events_event scene_anniversary_people_event">                            
                            <div className="text">Sisältö saadaan Wikimedian 'On this day'-APIsta.</div>
                            <div className="img"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Anniversary