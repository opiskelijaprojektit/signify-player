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
  let url;

  const [weatherData, setweatherData] = useState([
    {id: 0, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''}
  ])

  // Weather data update interval
  const [updateDelay, setUpdateDelay] = useState(0)

  // Select the image to be used based on the screen orientation.
  // By default, a landscape image is used.
  switch (props.orientation) {
    case orientations.landscape:
      url = import.meta.env.VITE_API_ADDRESS + props.url.landscape
      break
    case orientations.portrait:
      url = import.meta.env.VITE_API_ADDRESS + props.url.portrait
      break
    default:
      url = import.meta.env.VITE_API_ADDRESS + props.url.landscape
  }

  async function getWeatherXml(data) {
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
            + 'starttime=' + data.starttime + '&'
            + 'endtime=' + data.endtime + '&'
    const response = await fetch(url, {cache: 'no-store'})
    const result = await response.text()
    return result
  }

  async function parseXml(xmlString) {
    const response = await parseStringPromise(xmlString)
    const result = await response
    return result
  }

  function splitWeatherData(data) {
    let weatherString = data
      ['wfs:FeatureCollection']
      ['wfs:member'][0]
      ['omso:GridSeriesObservation'][0]
      ['om:result'][0]
      ['gmlcov:MultiPointCoverage'][0]
      ['gml:rangeSet'][0]
      ['gml:DataBlock'][0]
      ['gml:doubleOrNilReasonTupleList'][0]
  
    let dataSplit = weatherString.split('\n')
  
    const dataTrim = []
    for (let i in dataSplit) {
      dataTrim.push(dataSplit[i].trim())
    };
  
    dataTrim.shift()
    dataTrim.pop()
  
    const dataTrimSplit = []
    for (let i in dataTrim) {
      dataTrimSplit.push(dataTrim[i].split(' '))
    }

    let timeString = data
      ['wfs:FeatureCollection']
      ['wfs:member'][0]
      ['omso:GridSeriesObservation'][0]
      ['om:result'][0]
      ['gmlcov:MultiPointCoverage'][0]
      ['gml:domainSet'][0]
      ['gmlcov:SimpleMultiPoint'][0]
      ['gmlcov:positions'][0]

    let timeStringSplit = timeString.split('\n')

    const timeDataTrim = []
    for (let i in timeStringSplit) {
      timeDataTrim.push(timeStringSplit[i].trim())
    }
    timeDataTrim.shift()
    timeDataTrim.pop()

    const timeDatasplit_blaa = []
    for (let i in timeDataTrim) {
      timeDatasplit_blaa.push(timeDataTrim[i].split(' '))
    }

    const timeData = []
    for (let i in timeDatasplit_blaa) {
      timeData.push(timeDatasplit_blaa[i][3])
    }

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

  const handleWeatherUpdate = (data) => {
    setweatherData(data)
    //console.log(data)
    //console.log(weatherData)
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

  // Convert wind direction from degrees to 8-wind compass rose.
  const degreeToCompass = (degree) => {
    return degree <= 22.5 ? 'N' :
           degree <= 67.5 ? 'NE' :
           degree <= 112.5 ? 'E' :
           degree <= 157.5 ? 'SE' :
           degree <= 202.5 ? 'S' :
           degree <= 247.5 ? 'SW' :
           degree <= 292.5 ? 'W' :
           degree <= 337.5 ? 'NW' :
           'N'
  }

  // Convert wind direction from degrees to arrow
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

  // Update weather data
  function getWeatherData() {
    getWeatherXml(dateToIso())
      .then(xmlString => parseXml(xmlString))
      .then(xmlObject => splitWeatherData(xmlObject))
      .then(weatherArray => handleWeatherUpdate(weatherArray))
      .then(console.log('Weather data updated'))
      .then(setUpdateDelay(1200000))
  }

  // Set timer to update weather data
  useInterval(getWeatherData, updateDelay)


  return (
    <div className='scene_weather' style={{backgroundImage: 'url(' + url + ')'}}>
      <div className={props.orientation == orientations.landscape ? 'weather_screen_landscape' : 'weather_screen_portrait'}>
        <div className='weather_forecast'>
          <div className='weather_header'>
            <h1>{props.location}</h1>
            <div>Sääennuste</div>
            <div>{timestampToDate(weatherData[0].timeStamp, props.locale, props.timeZone)}</div>
          </div>
          <div>
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
                      <td key={item.id}>{item.smartSymbol}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          <div className='forecast_source'>
            <div>Lähde: Ilmatieteen laitoksen avoin data,</div>
            <div>Meteorologin sääennustedata.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather