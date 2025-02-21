import { orientations } from "../../utils/types"   // screen orientation type
import './Anniversary.css'
import { getOTDData } from './anniversaryApi.js'
import { useEffect } from "react"
import useLocalStorage from "../../utils/useLocalStorage.js"
import useInterval from "../../utils/useInterval.js"

/**
 * An anniversary component that displays anniversaries
 * of notable people and events using 
 * Wikimedia's "On this day" API.
 *
 * @component
 * @author Annastiina Koivu
 */
function Anniversary(props) {

    // State variables
    const [anniversaryData, setAnniversaryData] = useLocalStorage('anniversaryData', {})

    // Other variables
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2,"0")
    const day = String(now.getDate()).padStart(2,"0")
    const locale = "en-US"
    const lang = locale.substring(0,2)

    // Makes API call only once a day, 
    // and stores the data in localStorage.
    const fetchData = () => {
        const dateToday = now.toISOString().split('T')[0]

        // Checks if new API call is needed.
        if (anniversaryData && anniversaryData.date === dateToday && anniversaryData.lang === lang) {
            console.log('Käytetään tallennettua dataa.')
            return
        }

        // If localStorage has no data,
        // or date doesn't match today,
        // retrieve data from API and store it in localStorage.
        getOTDData(props.data.api, lang, month, day)
            .then(([events_result, births_result, deaths_result]) => {
                console.log('Haettu APIsta!')
                setAnniversaryData({
                    date: dateToday,
                    lang: lang,
                    events: events_result,
                    births: births_result,
                    deaths: deaths_result
                })
            })
    }

    // Fetches data when the component loads or dependencies change.
    useEffect(() => {
        fetchData()
    }, [props.data.api, lang, month, day])

    // Fetches data when the day changes.
    useInterval(() => {
        const atm = new Date()
        if (atm.getHours() === 0 && atm.getMinutes() === 0) {
            fetchData()
        }
    }, 60 * 1000)

    return (
        <div className="scene_anniversary">
            <div className="scene_anniversary_flex">
                <div className="scene_anniversary_header">
                    <h1>{Intl.DateTimeFormat(locale, {dateStyle: "long"}).format(now)}</h1>
                </div>

                <div className="scene_anniversary_events">
                    <h2>Happened today in history:</h2>
                    <div className="event">
                        <div className="year">{anniversaryData.events.selected[0].year}</div>
                        <div className="text">{anniversaryData.events.selected[0].text}</div>
                    </div>
                </div>

                <div className="scene_anniversary_events scene_anniversary_people">
                    <div className="birthday">
                        <h2>Birthdays:</h2>
                        <div className="event people_event">
                            <div className="img" style={{backgroundImage: `url(${anniversaryData.births.births[0].pages[0].thumbnail.source})`}}></div>
                            <div className="text">
                                {anniversaryData.births.births[0].text}.
                                <br></br>
                                Born in {anniversaryData.births.births[0].year},
                                <br></br>
                                {2025 - anniversaryData.births.births[0].year} years.
                            </div>
                        </div>
                    </div>

                    <div className="death">
                        <h2>Deaths:</h2>
                        <div className="event people_event">
                            <div className="text">
                                {anniversaryData.deaths.deaths[0].text}.
                                <br></br>
                                Died in {anniversaryData.deaths.deaths[0].year}.
                            </div>
                            <div className="img" style={{backgroundImage: `url(${anniversaryData.deaths.deaths[0].pages[0].thumbnail.source})`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Anniversary