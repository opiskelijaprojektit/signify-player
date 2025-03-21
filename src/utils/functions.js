import { orientations } from './types.js'

/**
 * Get and return the value of the display parameter 
 * from the browser address bar. Use the default value 
 * "main" if it is not specified.
 *
 * @deprecated
 * @author Pekka Tapio Aalto
 * 
 * @example
 *   const display = getDisplay()
 * 
 * @returns {string}
 *          Display value from URL.
 */
function getDisplay() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const paramValue = urlParams.get('display')
  return paramValue ? paramValue : 'main'
}

/**
 * Decides the orientation of the screen based on its
 * width and height.
 *
 * @author Pekka Tapio Aalto
 *
 * @example
 *   const orientation = getOrientation(1920, 1080)
 *  
 * @param   {number} width
 *          Width of the screen.
 * @param   {number} height
 *          Height of the screen.
 * @returns {string}
 *          Text describing the orientation of the screen.
 */
function getOrientation(width, height) {
  if (width > height) {
    return orientations.landscape
  } else {
    return orientations.portrait
  }
}

export { getDisplay, getOrientation }