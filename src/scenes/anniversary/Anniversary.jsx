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

    // Variable for locale.
    const locale = "fi-FI"

    // Variable for text language.
    const lang = locale.substring(0,2)

    // The API doesn't support all languages,
    // unsupported languages default to english.
    // This language list is updated 19 February 2025
    // source https://api.wikimedia.org/wiki/Feed_API/Language_support#On_this_day_in_history
    const apiLang = lang => lang === "de" ? "de"    // German
                            : lang === "fr" ? "fr"  // French
                            : lang === "sv" ? "sv"  // Swedish
                            : lang === "pt" ? "pt"  // Portuguese
                            : lang === "es" ? "es"  // Spanish
                            : lang === "ar" ? "ar"  // Arabic
                            : lang === "bs" ? "bs"  // Bosnian
                            : lang === "uk" ? "uk"  // Ukranian
                            : lang === "it" ? "it"  // Italian
                            : lang === "tr" ? "tr"  // Turkish
                            : lang === "zh" ? "zh"  // Chinese
                            : "en"                  // default English

    // Variable for month in 2-digits
    const month = String(today.getMonth() + 1).padStart(2,"0")

    // Variable for day in 2-digits
    const day = String(today.getDate()).padStart(2,"0")

    // API endpoint URLs for different categories
    const events = props.data.api + apiLang(lang) + '/onthisday/selected/' + month + '/' + day
    const births = props.data.api + apiLang(lang) + '/onthisday/births/' + month + '/' + day
    const deaths = props.data.api + apiLang(lang) + '/onthisday/deaths/' + month + '/' + day

    return (
        <div className="scene_anniversary">
            <div className="scene_anniversary_flex">
                <div className="scene_anniversary_header">
                    <h1>{Intl.DateTimeFormat(locale, {dateStyle: "long"}).format(today)}</h1>
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