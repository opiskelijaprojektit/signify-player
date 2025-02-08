import { orientations } from "../../utils/types"   // screen orientation type
import './Weather.css'

/**
 * An weather component that shows current weather conditions
 * on current location.
 * 
 *
 * @component
 * @author Vee Rämesammal
 */
function Weather(props) {

  // Variable to store the url address.
  let url;

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

  return (
    <div className="scene_weather" style={{backgroundImage: "url(" + url + ")"}}>
      <div className={props.orientation == orientations.landscape ? "weather_screen weather-landscape" : "weather_screen weather-portrait"}>
        { // If orientation is landscape then add empty div element.
          // This will ensure that the content appears in the right
          // half of the screen.
          props.orientation == orientations.landscape ? <div></div> : null }
        <div>
          <div>Säätiedot</div>
          <div>Sastamala</div>
          <div className="weather_report">
            <div className="weather_now">
              <div>Nyt</div>
              <div>4°</div>
            </div>
            <div className="weather_in_2">
              <div>8</div>
              <div>5°</div>
            </div>
            <div className="weather_in_4">
              <div>10</div>
              <div>-5°</div>
            </div>
            <div className="weather_in_6">
              <div>12</div>
              <div>-6°</div>
            </div>
            <div className="weather_in_8">
              <div>14</div>
              <div>-7°</div>
            </div>
            <div className="weather_in_10">
              <div>16</div>
              <div>-3°</div>
            </div>
            <div className="weather_in_12">
              <div>18</div>
              <div>-3°</div>
            </div>
            <div className="weather_in_14">
              <div>20</div>
              <div>-3°</div>
            </div>
            <div className="weather_in_16">
              <div>22</div>
              <div>-3°</div>
            </div>
          </div>
          <div>Lähde: Ilmatieteen laitoksen avoin data,</div>
          <div>#TODO lisää aineiston nimi</div>
        </div>
      </div>
    </div>
  )
}

export default Weather