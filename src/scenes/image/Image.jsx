import { orientations } from "../../utils/types"   // screen orientation type
import './Image.css'

/**
 * An image component that scales an image to fill the entire
 * display area. The image to be used is selected based on
 * the screen orientation.
 *
 * @component
 * @author Pekka Tapio Aalto
 */
function Image(props) {

  // Variable to store the url address.
  let url;

  // Select the image to be used based on the screen orientation.
  // By default, a landscape image is used.
  switch (props.orientation) {
    case orientations.landscape:
      url = props.url.landscape
      break
    case orientations.portrait:
      url = props.url.portrait
      break
    default:
      url = props.url.landscape
  }

  // Return image as an img-element.
  return (
    <img className="scene_image" src={import.meta.env.VITE_API_ADDRESS + url} />
  )  
}

export default Image