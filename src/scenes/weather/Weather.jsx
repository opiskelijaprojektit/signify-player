import { orientations } from "../../utils/types"   // screen orientation type
import './Weather.css'
import { xml2js, parseStringPromise } from "xml2js"
import { useState } from 'react'
import useInterval from '../../utils/useInterval.js'

/**
 * An weather component that shows current weather conditions
 * on current location.
 * 
 *
 * @component
 * @author Vee Rämesammal
 */
function Weather(props) {

  // Initialize the variables.
  let url;

  const [weatherData, setweatherData] = useState([
    {id: 0, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 1, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 2, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 3, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 4, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 5, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 6, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 7, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 8, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''},
    {id: 9, timeStamp: 0, temp: '', wind: '', windDirection: '', hourlyMaximumGust: '', pop: '', precipitation1h: '', smartSymbol: ''}
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
    let url = "https://opendata.fmi.fi/wfs/fin?"
            + "service=WFS&version=2.0.0&"
            + "request=getFeature&storedquery_id="
            + "fmi::forecast::edited::weather::scandinavia::point::multipointcoverage&"
            + "place=" + props.location +"&"
            + "timestep=60&"
            + "parameters="
              + "Temperature,"
              + "WindSpeedMS,"
              + "winddirection,"
              + "hourlymaximumgust,"
              + "pop,"
              + "precipitation1h,"
              + "smartsymbol"
            + "&"
            + "starttime=" + data.starttime + "&"
            + "endtime=" + data.endtime + "&"
    const response = await fetch(url, {cache: "no-store"})
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
  
    let dataSplit = weatherString.split("\n")
  
    const dataTrim = []
    for (let i in dataSplit) {
      dataTrim.push(dataSplit[i].trim())
    };
  
    dataTrim.shift()
    dataTrim.pop()
  
    const dataTrimSplit = []
    for (let i in dataTrim) {
      dataTrimSplit.push(dataTrim[i].split(" "))
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

    let timeStringSplit = timeString.split("\n")

    const timeDataTrim = []
    for (let i in timeStringSplit) {
      timeDataTrim.push(timeStringSplit[i].trim())
    }
    timeDataTrim.shift()
    timeDataTrim.pop()

    const timeDatasplit_blaa = []
    for (let i in timeDataTrim) {
      timeDatasplit_blaa.push(timeDataTrim[i].split(" "))
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
                                 precipitation1h: dataTrimSplit[i][5],
                                 smartSymbol: dataTrimSplit[i][6]
                                }
      weatherArray.push(weatherDataObject)
    }
    return weatherArray
  }

  function timestampToDate(timestamp, locale, timezone) {
    let date = new Date(timestamp * 1000)
    let options = {
      dateStyle: "full",
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

  const updateTest = (data) => {
    const n = data
    setweatherData(n)
    console.log(data)
    console.log(weatherData)
  }

  function handleWeatherUpdate(data) {
    setweatherData(data)
    console.log("weatherdata set")
    console.log(data)
    console.log(weatherData)
    return
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

    date.setHours(date.getHours() + 10)
    let endtime = date.toISOString()
    endtime = endtime.split('.')[0] + 'Z'

    const dateData = {starttime: starttime, endtime: endtime}
    return dateData
  }

  // Conver wind direction from degrees
  function degToDirection(deg) {
    return deg <= 22.5 ? 'N'
      : deg <= 67.5 ? 'NE'
      : deg <= 112.5 ? 'E'
      : deg <= 157.5 ? 'SE'
      : deg <= 202.5 ? 'S'
      : deg <= 247.5 ? 'SW'
      : deg <= 292.5 ? 'W'
      : deg <= 337.5 ? 'NW'
      : 'N'
  }

  // Update weather data
  function getWeatherData() {
    getWeatherXml(dateToIso())
      .then(xmlString => parseXml(xmlString))
      .then(xmlObject => splitWeatherData(xmlObject))
      .then(weatherArray => updateTest(weatherArray))
      .then(console.log("Weather data updated"))
      .then(setUpdateDelay(1200000))
  }

  // Set timer to update weather data
  useInterval(getWeatherData, updateDelay)


  return (
    <div className="scene_weather" style={{backgroundImage: "url(" + url + ")"}}>
      <div className={props.orientation == orientations.landscape ? "weather_screen weather-landscape" : "weather_screen weather-portrait"}>
        <div className="weather_report">
          <div>Säätiedot {props.location}</div>
          <div>{timestampToDate(weatherData[0].timeStamp, props.locale, props.timeZone)}</div>
          <div className="weather_table">
              <table>
                <thead>
                  <tr>
                      <th></th>
                      <th>Lämpötila</th>
                      <th>Tuuli m/s</th>
                      <th>Suunta</th>
                      <th>Puuskat m/s</th>
                      <th>Sade todennäköisyys</th>
                      <th>Sademäärä mm (1h)</th>
                      <th>SmartSymbol</th>
                    </tr>
                </thead>
                <tbody id="weatherBody">
                  <tr>
                    <td>{timestampToTime(weatherData[0].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[0].temp}</td>
                    <td>{weatherData[0].wind}</td>
                    <td>{degToDirection(weatherData[0].windDirection)}</td>
                    <td>{weatherData[0].hourlyMaximumGust}</td>
                    <td>{weatherData[0].pop}</td>
                    <td>{weatherData[0].precipitation1h}</td>
                    <td>{weatherData[0].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[1].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[1].temp}</td>
                    <td>{weatherData[1].wind}</td>
                    <td>{degToDirection(weatherData[1].windDirection)}</td>
                    <td>{weatherData[1].hourlyMaximumGust}</td>
                    <td>{weatherData[1].pop}</td>
                    <td>{weatherData[1].precipitation1h}</td>
                    <td>{weatherData[1].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[2].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[2].temp}</td>
                    <td>{weatherData[2].wind}</td>
                    <td>{degToDirection(weatherData[2].windDirection)}</td>
                    <td>{weatherData[2].hourlyMaximumGust}</td>
                    <td>{weatherData[2].pop}</td>
                    <td>{weatherData[2].precipitation1h}</td>
                    <td>{weatherData[2].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[3].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[3].temp}</td>
                    <td>{weatherData[3].wind}</td>
                    <td>{degToDirection(weatherData[3].windDirection)}</td>
                    <td>{weatherData[3].hourlyMaximumGust}</td>
                    <td>{weatherData[3].pop}</td>
                    <td>{weatherData[3].precipitation1h}</td>
                    <td>{weatherData[3].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[4].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[4].temp}</td>
                    <td>{weatherData[4].wind}</td>
                    <td>{degToDirection(weatherData[4].windDirection)}</td>
                    <td>{weatherData[4].hourlyMaximumGust}</td>
                    <td>{weatherData[4].pop}</td>
                    <td>{weatherData[4].precipitation1h}</td>
                    <td>{weatherData[4].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[5].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[5].temp}</td>
                    <td>{weatherData[5].wind}</td>
                    <td>{degToDirection(weatherData[5].windDirection)}</td>
                    <td>{weatherData[5].hourlyMaximumGust}</td>
                    <td>{weatherData[5].pop}</td>
                    <td>{weatherData[5].precipitation1h}</td>
                    <td>{weatherData[5].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[6].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[6].temp}</td>
                    <td>{weatherData[6].wind}</td>
                    <td>{degToDirection(weatherData[6].windDirection)}</td>
                    <td>{weatherData[6].hourlyMaximumGust}</td>
                    <td>{weatherData[6].pop}</td>
                    <td>{weatherData[6].precipitation1h}</td>
                    <td>{weatherData[6].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[7].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[7].temp}</td>
                    <td>{weatherData[7].wind}</td>
                    <td>{degToDirection(weatherData[7].windDirection)}</td>
                    <td>{weatherData[7].hourlyMaximumGust}</td>
                    <td>{weatherData[7].pop}</td>
                    <td>{weatherData[7].precipitation1h}</td>
                    <td>{weatherData[7].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[8].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[8].temp}</td>
                    <td>{weatherData[8].wind}</td>
                    <td>{degToDirection(weatherData[8].windDirection)}</td>
                    <td>{weatherData[8].hourlyMaximumGust}</td>
                    <td>{weatherData[8].pop}</td>
                    <td>{weatherData[8].precipitation1h}</td>
                    <td>{weatherData[8].smartSymbol}</td>
                  </tr>
                  <tr>
                    <td>{timestampToTime(weatherData[9].timeStamp, props.locale, props.timeZone)}</td>
                    <td>{weatherData[9].temp}</td>
                    <td>{weatherData[9].wind}</td>
                    <td>{degToDirection(weatherData[9].windDirection)}</td>
                    <td>{weatherData[9].hourlyMaximumGust}</td>
                    <td>{weatherData[9].pop}</td>
                    <td>{weatherData[9].precipitation1h}</td>
                    <td>{weatherData[9].smartSymbol}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          <div>
            Lähde: Ilmatieteen laitoksen avoin data,<br>
            </br>Meteorologin sääennustedata.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather