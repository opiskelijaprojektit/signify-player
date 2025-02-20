import { orientations } from "../../utils/types"   // screen orientation type
import './Anniversary.css'
import { getOTDData } from './anniversaryApi.js'
import { useEffect } from "react"
import useLocalStorage from "../../utils/useLocalStorage.js"

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
    useEffect(() => {
        const dateToday = now.toISOString().split('T')[0]

        // If localStorage has anniversaryData,
        // and date of stored data is today,
        // and app language matches,
        // no need for new API call.
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
    }, [props.data.api, lang, month, day])

    return (
        <div className="scene_anniversary">
            <div className="scene_anniversary_flex">
                <div className="scene_anniversary_header">
                    <h1>{Intl.DateTimeFormat(locale, {dateStyle: "long"}).format(now)}</h1>
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