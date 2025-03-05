import logo from '../../assets/logos/signify-logo-white.svg'
import { orientations } from '../../utils/types'
import './Splash.css'
import backgroundImage from './bg_splash.jpg'

/**
 * This component takes care of the following screens:
 * - start screen (splash)
 * - show the tag for linking the device (registered)
 * - display the name of the device when no content has yet been linked to it (linked)
 * - 404 Not Found
 *
 * @component
 * @author Pekka Tapio Aalto
 */
function Splash(props) {
  return (
    <div className="splash" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={props.orientation == orientations.landscape ? "splash_screen splash-landscape" : "splash_screen splash-portrait"}>
        { // If orientation is landscape then add empty div element.
          // This will ensure that the content appears in the right
          // half of the screen.
          props.orientation == orientations.landscape ? <div></div> : null }
        <div>
          <img src={logo} />
          { props.tag ? <div className="splash_link">
                          <div>Link this device in administration panel.</div>
                          <div className="splash_tag">{props.tag}</div>
                        </div> : null }
          { props.notfound ? <div className="splash_notfound">
                               Sorry, something has gone terribly wrong.
                             </div> : null }
        </div>
      </div>
      <div className="splash_name">{ props.name ? props.name : null }</div>
    </div>
  )
}
export default Splash