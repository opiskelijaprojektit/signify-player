/**
 * Checks if language is supported,
 * unsupported languages default to English.
 * Wikimedia API does not support all languages,
 * language list available in 
 * https://api.wikimedia.org/wiki/Feed_API/Language_support#On_this_day_in_history
 * 
 * @author Annastiina Koivu
 * 
 * @param {string} lang 
 *      Locale language code.
 * @returns {string}
 *      Supported language code.
 */
function apiLang(lang) {
    // Supported languages Feb 20, 2025.
    const supportedLangList = ["en", "de", "fr", "sv", "pt", "es", "ar", "bs", "uk", "it", "tr", "zh"]
    const supportedLang = supportedLangList.includes(lang) ? lang : "en"

    return supportedLang
}

/**
 * Retrieves data from Wikimedia's On This Day API.
 * API documentation available in 
 * https://api.wikimedia.org/wiki/Feed_API/Reference/On_this_day
 * 
 * @author Annastiina Koivu
 * 
 * @param {string} baseUrl 
 *      API's baseUrl
 * @param {string} lang 
 *      Language code 
 * @param {string} month 
 *      Month in 2-digits
 * @param {string} day 
 *      Day of month in 2-digits
 * @returns {Array}
 *      Returned array:
 *      [events_result: {"selected": [
 *            {
 *              "text":  string  - Event description,
 *              "pages": array   - Articles related to the event,
 *              "year":  integer - Year the event took place
 *            }
 *          ]
 *        },
 *       births_result: {"births":[
 *            {...}
 *          ]
 *        },
 *       deaths_result: {"deaths":[
 *            {...}
 *          ]
 *        }
 *      ]
 */
async function getOTDData(baseUrl, lang, month, day) {
    // API endpoint URLs for different categories
    const events_url = baseUrl + apiLang(lang) + '/onthisday/selected/' + month + '/' + day
    const births_url = baseUrl + apiLang(lang) + '/onthisday/births/' + month + '/' + day
    const deaths_url = baseUrl + apiLang(lang) + '/onthisday/deaths/' + month + '/' + day

    // Selected events.
    const events_response = await fetch(events_url)
    const events_result = await events_response.json()

    // Birthdays
    const births_response = await fetch(births_url)
    const births_result = await births_response.json()

    // Deaths
    const deaths_response = await fetch(deaths_url)
    const deaths_result = await deaths_response.json()

    return [events_result, births_result, deaths_result]
}

export { getOTDData }