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

  // weather api url
  const weatherUrl = "http://127.0.0.1:8080/tampere.xml"
  //const weatherUrl = "https://opendata.fmi.fi/wfs/fin?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::multipointcoverage&place=tampere&timestep=60&parameters=Temperature,WindSpeedMS&"

  const [weatherData, setweatherData] = useState([["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]])

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

  async function getWeatherXml(url) {
    const response = await fetch(url)
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
      weatherArray.push(Array(timeData[i], dataTrimSplit[i][0], dataTrimSplit[i][1]))
    }
    return weatherArray
  }

  // Update weather data
  function getWeatherData() {
    getWeatherXml(weatherUrl)
      .then(xmlString => parseXml(xmlString))
      .then(xmlObject => splitWeatherData(xmlObject))
      .then(weatherArray => setweatherData(weatherArray))
      .then(console.log("Weather data updated"))
      .then(setUpdateDelay(900000))
  }

  // Set timer to update weather data
  useInterval(getWeatherData, updateDelay)


  return (
    <div className="scene_weather" style={{backgroundImage: "url(" + url + ")"}}>
      <div className={props.orientation == orientations.landscape ? "weather_screen weather-landscape" : "weather_screen weather-portrait"}>
        <div className="weather_report">
          <div>Säätiedot</div>
          <div>{props.location}</div>
          <div>
          <div className="weather_table">
              <table>
                <thead>
                  <tr>
                      <th>Aika</th>
                      <th>Lämpötila</th>
                      <th>Tuulennopeus</th>
                    </tr>
                </thead>
                <tbody id="weatherBody">
                  <tr>
                    <td>6</td>
                    <td>{weatherData[0][1]}</td>
                    <td>{weatherData[0][2]}</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>{weatherData[1][1]}</td>
                    <td>{weatherData[1][2]}</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>{weatherData[2][1]}</td>
                    <td>{weatherData[2][2]}</td>
                  </tr>
                  <tr>
                    <td>12</td>
                    <td>{weatherData[3][1]}</td>
                    <td>{weatherData[3][2]}</td>
                  </tr>
                  <tr>
                    <td>14</td>
                    <td>{weatherData[4][1]}</td>
                    <td>{weatherData[4][2]}</td>
                  </tr>
                  <tr>
                    <td>16</td>
                    <td>{weatherData[5][1]}</td>
                    <td>{weatherData[5][2]}</td>
                  </tr>
                  <tr>
                    <td>18</td>
                    <td>{weatherData[6][1]}</td>
                    <td>{weatherData[6][2]}</td>
                  </tr>
                  <tr>
                    <td>20</td>
                    <td>{weatherData[7][1]}</td>
                    <td>{weatherData[7][2]}</td>
                  </tr>
                  <tr>
                    <td>22</td>
                    <td>{weatherData[8][1]}</td>
                    <td>{weatherData[8][2]}</td>
                  </tr>
                  <tr>
                    <td>24</td>
                    <td>{weatherData[9][1]}</td>
                    <td>{weatherData[9][2]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            Lähde: Ilmatieteen laitoksen avoin data,<br>
            </br>#TODO lisää aineiston nimi
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather