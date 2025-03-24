import { orientations } from '../../utils/types'   // screen orientation type
import './Weather.css'
import { parseStringPromise } from 'xml2js'
import { useState } from 'react'
import useInterval from '../../utils/useInterval.js'

/**
 * An weather component that shows weather forecast
 * for the current location.
 * 
 *
 * @component
 * @author Vee Rämesammal
 */
function Weather(props) {

  // Initialize the variables.
  const [weatherData, setweatherData] = useState(null)    // Forecast data
  const [loading, setLoading] = useState(true)            // Is first forecast update still loading.
  const [error, setError] = useState(null)                // Set current error.
  const [updateDelay, setUpdateDelay] = useState(5000)    // Forecast update interval.

  // Variable to store the url address.
  let url;

  // Select the image to be used based on the screen orientation.
  // By default, a landscape image is used.
  switch (props.orientation) {
    case orientations.landscape:
      url = import.meta.env.VITE_MEDIA_ADDRESS + props.url.landscape
      break
    case orientations.portrait:
      url = import.meta.env.VITE_MEDIA_ADDRESS + props.url.portrait
      break
    default:
      url = import.meta.env.VITE_MEDIA_ADDRESS + props.url.landscape
  }

  // Get an url for a weather symbol based on its number.
  function getSymbolUrl(name) {
    let symbol = name + '.svg'
    return new URL(`../../assets/symbols/SmartSymbol/light/${symbol}`, import.meta.url).href
  }

  // Get forecast data from FMI.
  // Returns data as a string.
  async function fetchForecastXml() {
    let startEnd = dateToIso()
    //let testUrl = 'https://httpstat.us/400'
    let url = 'https://opendata.fmi.fi/wfs/fin?'
            + 'service=WFS&version=2.0.0&'
            + 'request=getFeature&storedquery_id='
            + 'fmi::forecast::edited::weather::scandinavia::point::multipointcoverage&'
            + 'place=' + props.location + '&'
            + 'timestep=60&'
            + 'parameters='
              + 'Temperature,'
              + 'WindSpeedMS,'
              + 'winddirection,'
              + 'hourlymaximumgust,'
              + 'pop,'
              + 'precipitation1h,'
              + 'smartsymbol'
            + '&'
            + 'starttime=' + startEnd.starttime + '&'
            + 'endtime=' + startEnd.endtime + '&'

    let response = await fetch(url, {cache: 'no-store'})
    if (response.status == 200) {
      return response.text()
    } else {
      throw new Error(`HTTP error: Status ${response.status}`)
    }
  }

  // Parse forecast XML from string to object.
  function parseXml(xmlString) {
    let response
    try {
      response = parseStringPromise(xmlString)
      return response
    } catch(err) {
      throw new Error(`Trouble parsing XML: ${err}`)
    }
  }

  // Get usefull data from forecast XML object.
  // Returns an array containing forecast data as objects.
  function splitWeatherData(data) {
    // Get forecast data excluding timestamps from data.
    let weatherString = data
      ['wfs:FeatureCollection']
      ['wfs:member'][0]
      ['omso:GridSeriesObservation'][0]
      ['om:result'][0]
      ['gmlcov:MultiPointCoverage'][0]
      ['gml:rangeSet'][0]
      ['gml:DataBlock'][0]
      ['gml:doubleOrNilReasonTupleList'][0]
  
    // Split data based on newlines.
    let dataSplit = weatherString.split('\n')
  
    // Remove whitespace from both sides of the strings.
    const dataTrim = []
    for (let i in dataSplit) {
      dataTrim.push(dataSplit[i].trim())
    };
  
    // Remove first an last elements from array. Those contain no usefull data.
    dataTrim.shift()
    dataTrim.pop()
  
    // Split data using space as a separator.
    const dataTrimSplit = []
    for (let i in dataTrim) {
      dataTrimSplit.push(dataTrim[i].split(' '))
    }

    // Get timestamps from data.
    let timeString = data
      ['wfs:FeatureCollection']
      ['wfs:member'][0]
      ['omso:GridSeriesObservation'][0]
      ['om:result'][0]
      ['gmlcov:MultiPointCoverage'][0]
      ['gml:domainSet'][0]
      ['gmlcov:SimpleMultiPoint'][0]
      ['gmlcov:positions'][0]

    // Split data based on newlines.
    let timeStringSplit = timeString.split('\n')

    // Remove whitespace from both sides of the strings.
    const timeDataTrim = []
    for (let i in timeStringSplit) {
      timeDataTrim.push(timeStringSplit[i].trim())
    }

    // Remove first an last elements from array. Those contain no usefull data.
    timeDataTrim.shift()
    timeDataTrim.pop()

    // Split data using space as a separator.
    const timestampData = []
    for (let i in timeDataTrim) {
      timestampData.push(timeDataTrim[i].split(' '))
    }

    // Separate timestamps from other data.
    const timeData = []
    for (let i in timestampData) {
      timeData.push(timestampData[i][3])
    }

    // Make an array containing both timestamps and forecast data.
    const weatherArray = []
    for (let i in timeData) {
      const weatherDataObject = {id: i,
                                 timeStamp: timeData[i],
                                 temp: dataTrimSplit[i][0],
                                 wind: dataTrimSplit[i][1],
                                 windDirection: dataTrimSplit[i][2],
                                 hourlyMaximumGust: dataTrimSplit[i][3],
                                 pop: dataTrimSplit[i][4],
                                 precipitation1h: Number(dataTrimSplit[i][5]).toLocaleString(props.locale, {minimumFractionDigits: 1, maximumFractionDigits: 1}),
                                 smartSymbol: dataTrimSplit[i][6]
                                }
      weatherArray.push(weatherDataObject)
    }
    return weatherArray
  }

  // Converts timestamp to human readable date.
  function timestampToDate(timestamp, locale, timezone) {
    let date = new Date(timestamp * 1000)
    let options = {
      dateStyle: 'full',
      timeZone: timezone
    }
    const response = new Intl.DateTimeFormat(locale, options).format(date)
    const result = response
    return result
  }

  // Converts timestamp to 2-digit hour.
  function timestampToTime(timestamp, locale, timezone) {
    let date = new Date(timestamp * 1000)
    let options = {
      hour: '2-digit',
      timeZone: timezone
    }
    const response = date.toLocaleTimeString(locale, options)
    const result = response
    return result
  }

  // Handler to update weatherdata.
  const handleWeatherUpdate = (data) => {
    setweatherData(data)
  }

  /**
   * Conver date to correct format for
   * fmi starttime and endtime parameters
   * ISO 8601 UTC
   * 
   * @returns {object}
   *          Returned object:
   *            { starttime: '2025-02-19T00:00:00Z', endtime: '2025-02-19T10:00:00Z' }
   */
  function dateToIso() {
    const date = new Date()
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    let starttime = date.toISOString()
    starttime = starttime.split('.')[0] + 'Z'

    date.setHours(date.getHours() + 9)
    let endtime = date.toISOString()
    endtime = endtime.split('.')[0] + 'Z'

    const dateData = {starttime: starttime, endtime: endtime}
    return dateData
  }

  // Converts wind direction from degrees to arrow.
  const degreeToArrow = (degree) => {
    return degree <= 22.5 ? '⇓' :
           degree <= 67.5 ? '⇙' :
           degree <= 112.5 ? '⇐' :
           degree <= 157.5 ? '⇖' :
           degree <= 202.5 ? '⇑' :
           degree <= 247.5 ? '⇗' :
           degree <= 292.5 ? '⇒' :
           degree <= 337.5 ? '⇘' :
           '⇓'
  }

  // Get update times.
  function getTimeToNextUpdate() {
    const now = new Date()
    const next = new Date(now)
    // Get next update date,
    // 30 seconds past next hour.
    next.setMinutes(0)
    next.setSeconds(30)
    next.setMilliseconds(0)
    next.setHours(next.getHours() + 1)
    // Convert dates to milliseconds.
    let timeNow = now.getTime()
    let timeNext = next.getTime()
    // Calculate milliseconds to next update.
    let time = timeNext-timeNow
    const data = {lastUpdate: now, nextUpdate: next, timeToNext: time}
    return data
  }

  // Define an forecast update action.
  async function forecastUpdate() {
    let updateTime
    let xml
    let xmlString
    let xmlObject
    console.log('Forecast update started.')
    try {
      // Get time to next update and set it.
      updateTime = getTimeToNextUpdate()
      setUpdateDelay(updateTime.timeToNext)
      // Get forecast update.
      xml = await fetchForecastXml()
      xmlString = await parseXml(xml)
      xmlObject = splitWeatherData(xmlString)
      // Set new forecast data.
      handleWeatherUpdate(xmlObject)
      setError(null)
      console.log('Forecast updated.')
      console.log(`Next Forecast update at ${updateTime.nextUpdate}`)
    } catch(err) {
      console.error(err)
      setError(err.message)
      setUpdateDelay(1200000)
      console.log('Forecast update failed.')
      console.log('Next forecast update try in 20 minutes.')
    } finally {
      setLoading(false)
    }
  }

  // Set forecast update interval
  useInterval(forecastUpdate, updateDelay)

  return (
    <div className='scene_weather' style={{backgroundImage: 'url(' + url + ')'}}>
      <div className={props.orientation == orientations.landscape ? 'weather_screen_landscape' : 'weather_screen_portrait'}>
        <div className='weather_forecast'>
          <div className='weather_header'>
            <h1>{props.location}</h1>
            <div>Sääennuste</div>
            <div>
              {loading && (
                <div>Ladataan sääennustetta</div>
              )}
              {error && <div>{error}</div>}
            </div>
            {weatherData && (
              <div>{timestampToDate(weatherData[0].timeStamp, props.locale, props.timeZone)}</div>
            )}
          </div>
          <div>
            {weatherData && (
              <table className='weather_table'>
                  <thead>
                    <tr>
                      <th colSpan={10}>Tunnit</th>
                    </tr>
                    <tr id='hour'>
                      {weatherData.map(item => (
                        <td key={item.id}>{timestampToTime(item.timeStamp, props.locale, props.timeZone)}</td>
                      ))}
                    </tr>
                  </thead>
                <tbody id='weatherBody'>
                  <tr>
                    <th colSpan={10}>Lämpötila</th>
                  </tr>
                  <tr id='temperature'>
                    {weatherData.map(item => (
                      <td key={item.id}>{Math.round(item.temp) + '°'}</td>
                    ))}
                  </tr>
                  <tr id='wind'>
                    <th colSpan={10}>Tuuli m/s</th>
                  </tr>
                  <tr id='windDirection'>
                    {weatherData.map(item => (
                      <td key={item.id}>{degreeToArrow(item.windDirection)}</td>
                    ))}
                  </tr>
                  <tr id='windMs'>
                    {weatherData.map(item => (
                      <td key={item.id}>{Math.round(item.wind)}</td>
                    ))}
                  </tr>
                  <tr id='wind'>
                    <th colSpan={10}>Puuskat m/s</th>
                  </tr>
                  <tr id='hourlyMaximumGust'>
                    {weatherData.map(item => (
                      <td key={item.id}>{Math.round(item.hourlyMaximumGust)}</td>
                    ))}
                  </tr>
                  <tr id='rainChance'>
                    <th colSpan={10}>Sateen todennäköisyys %</th>
                  </tr>
                  <tr id='pop'>
                    {weatherData.map(item => (
                      <td key={item.id}>{Math.round(item.pop)}</td>
                    ))}
                  </tr>
                  <tr id='rainAmmount'>
                    <th colSpan={10}>Sademäärä mm (1h)</th>
                  </tr>
                  <tr id='precipitation1h'>
                    {weatherData.map(item => (
                      <td key={item.id}>{item.precipitation1h}</td>
                    ))}
                  </tr>
                  <tr id='smartSymbol'>
                    {weatherData.map(item => (
                      <td key={item.id}><img src={getSymbolUrl(item.smartSymbol)} /></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className='forecast_source'>
            <div>Lähde:</div>
            <div>Ilmatieteen laitoksen avoin data,</div>
            <div>Meteorologin sääennustedata.</div>
            <div><br /></div>
            <div>Sääsymbolit:</div>
            <div>Ilmatieteen laitos, SmartSymbols</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather