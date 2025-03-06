import { orientations } from "../../utils/types"
import { getOTDData } from './anniversaryApi.js'
import { useEffect } from "react"
import useLocalStorage from "../../utils/useLocalStorage.js"
import useInterval from "../../utils/useInterval.js"

/**
 * An anniversary component that displays anniversaries
 * of notable people and events using Wikimedia's "On this day" API.
 * This scene is designed for 16:9 screens only.  
 * Content retrieved from the API can be displayed in any language supported by the API,
 * the header date is localized using Intl.DateTimeFormat object,
 * however, all static text in the code is currently available only in English.
 *
 * @component
 * @author Annastiina Koivu
 */
function Anniversary(props) {

    // Determines which stylesheet is used, based on screen orientation.
    props.orientation == orientations.landscape ? import('./Anniversary_landscape.css') : import('./Anniversary_portrait.css')

    // Local storage variable for API data.
    const [anniversaryData, setAnniversaryData, resetAnniversaryData] = useLocalStorage('anniversaryData', {})

    // Date variables
    let now = new Date()
    const thisYear = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2,"0")
    const day = String(now.getDate()).padStart(2,"0")

    // Localization variables.
    const locale = props.data.locale
    const lang = locale.substring(0,2)

    // Determines wheter data is retrieved from localStorage or API.
    function fetchData() {
        const dateToday = new Date().toDateString()

        // Checks if new API call is needed.
        if (anniversaryData && anniversaryData.date === dateToday && anniversaryData.lang === lang) {
            return
        }

        // If localStorage has no data,
        // or date doesn't match today,
        // retrieves data from API and stores it in localStorage.
        getOTDData(props.data.api, lang, month, day)
            .then(([events_result, births_result, deaths_result]) => {
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

    // Checks every minute if the day has changed.
    // Fetches data when the day changes.
    useInterval(() => {
        const atm = new Date()
        if (atm.getHours() === 0 && atm.getMinutes() === 0) {
            resetAnniversaryData()
            now = new Date()
            fetchData()
        }
    }, 60 * 1000)

    // Indexes for displayed events.
    const eventIndexes = [0, 1, 2]
    const birthIndexes = [0, 1]
    const deathIndexes = [0, 2]

    return (
        <div className="scene_anniversary">
            <div className="scene_anniversary_header">
                <h1>{Intl.DateTimeFormat(locale, {dateStyle: "long"}).format(now)}</h1>
            </div>

            { !anniversaryData || Object.keys(anniversaryData).length === 0 ? <div>Loading...</div> : 
                <div className="scene_anniversary_content">
                    {/* Checks if there is events to display. */}
                    { Object.keys(anniversaryData.events.selected).length > 0 ?
                        <div className="scene_anniversary_events events">
                            <h2>Happened today in history:</h2>
                            {eventIndexes.map((index) => (
                                <div key={index} className="event">
                                    <div className="year">{anniversaryData.events.selected[index]?.year ? anniversaryData.events.selected[index].year : null}</div>                              
                                    {/* Checks if there is picture to display. */}
                                    {anniversaryData.events.selected[index]?.pages[0]?.thumbnail ? 
                                        <div className="img" style={{backgroundImage: `url(${anniversaryData.events.selected[index].pages[0].thumbnail.source})`}}></div> 
                                        : anniversaryData.events.selected[index]?.pages[1]?.thumbnail ?
                                        <div className="img" style={{backgroundImage: `url(${anniversaryData.events.selected[index].pages[1].thumbnail.source})`}}></div>
                                        : anniversaryData.events.selected[index]?.pages[2]?.thumbnail ?
                                        <div className="img" style={{backgroundImage: `url(${anniversaryData.events.selected[index].pages[2].thumbnail.source})`}}></div>
                                        : null
                                    }                                    
                                    <div className="text">{anniversaryData.events.selected[index]?.text ? anniversaryData.events.selected[index].text : null}</div>                                    
                                </div>
                            ))}
                        </div>
                    : <div className="scene_anniversary_events">Nothing has happened on this date.</div> }

                    {/* Checks if there is births or deaths to display. */}
                    { Object.keys(anniversaryData.births.births).length == 0 && Object.keys(anniversaryData.deaths.deaths).length == 0 ? 
                        <div className="scene_anniversary_events people no_data">Either no births or deaths occurred today, or your language does not support birth and death data.</div> 
                        : <div className="scene_anniversary_events people">

                            {/* Checks for birthdays */}
                            { Object.keys(anniversaryData.births.births).length > 0 ? 
                            <div className="birthday">
                                <h2>Birthdays:</h2>
                                {birthIndexes.map((index) => (
                                    <div key={index} className="event people_event">                                        
                                        <div className="year">{anniversaryData.births.births[index]?.year ? anniversaryData.births.births[index].year : null}</div>
                                        {/* Checks if there is picture to display. */}
                                        {anniversaryData.births.births[index]?.pages[0]?.thumbnail ? 
                                            <div className="img" style={{backgroundImage: `url(${anniversaryData.births.births[index].pages[0].thumbnail.source})`}}></div> 
                                            : anniversaryData.births.births[index]?.pages[1]?.thumbnail ?
                                            <div className="img" style={{backgroundImage: `url(${anniversaryData.births.births[index].pages[1].thumbnail.source})`}}></div>
                                            : null
                                        }                                        
                                        <div className="text">
                                            {anniversaryData.births.births[index]?.text ? anniversaryData.births.births[index].text : null}.
                                            <br />
                                            <br />
                                            {thisYear - anniversaryData.births.births[index].year ? thisYear - anniversaryData.births.births[index].year : null} years.
                                        </div>                                        
                                    </div>
                                ))}
                            </div>
                            : null }

                            {/* Checks if anyone died on given date. */}
                            { Object.keys(anniversaryData.deaths.deaths).length > 0 ? 
                            <div className="death">
                                <h2>Deaths:</h2>
                                {deathIndexes.map((index) => (
                                    <div key={index} className="event people_event">
                                        <div className="text">
                                            {anniversaryData.deaths.deaths[index]?.text ? anniversaryData.deaths.deaths[index].text : null}.                                            
                                        </div>                                        
                                        {/* Checks if there is picture to display. */}
                                        {anniversaryData.deaths.deaths[index]?.pages[0]?.thumbnail ? 
                                            <div className="img" style={{backgroundImage: `url(${anniversaryData.deaths.deaths[index].pages[0].thumbnail.source})`}}></div> 
                                            : anniversaryData.deaths.deaths[index]?.pages[1]?.thumbnail ?
                                            <div className="img" style={{backgroundImage: `url(${anniversaryData.deaths.deaths[index].pages[1].thumbnail.source})`}}></div>
                                            : null
                                        }                                        
                                        <div className="year">{anniversaryData.deaths.deaths[index]?.year ? anniversaryData.deaths.deaths[index].year : null}</div>                                     
                                    </div>
                                ))}
                            </div> 
                            : null }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Anniversary