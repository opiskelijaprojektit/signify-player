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

  return (
    <div className="scene_weather">
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
            <div>
              <div>12</div>
              <div>5°</div>
            </div>
            <div>
              <div>14</div>
              <div>-5°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather