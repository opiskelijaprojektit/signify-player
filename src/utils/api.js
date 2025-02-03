const api_address = import.meta.env.VITE_API_ADDRESS

/**
 * Finds out the current state of the device.
 *
 * @author Pekka Tapio Aalto
 * 
 * @param   {string} token
 *          API key of the device.
 * @param   {number} width
 *          Width of the screen.
 * @param   {number} height
 *          Height of the screen.
 * @param   {string} app_version
 *          Version of the web application.
 * @returns {Object}
 *          Returned object:
 *            { state: "1" }
 *          Meaning of state values:
 *            "1" = registered, not yet linked
 *            "2" = linked, waiting for content
 */
async function getState(token, width, height, app_version) {
  const response = await fetch(api_address + "check",
    { 
      headers: {
        'Content-Type': 'application/json',
        'x-API-key': token
      },
      method: 'POST',
      body: JSON.stringify({width: width, height: height, version: app_version})
    }
  )
  const result = await response.json()
  return result
}
  
/**
 * Retrieve the content data corresponding to the token.
 *
 * @author Pekka Tapio Aalto
 * 
 * @param   {string} token
 *          API key of the device.
 * @returns {Object}
 *          Returned object:
 *            { updated: "2025-01-31 12:34:00",
 *              scenes: [
 *                { id: 1,
 *                  type: "image",
 *                  data: {
 *                    url: {
 *                      landscape: "media/ed0f320c-b6fc-4dd5-a42e-c710f54a6572.jpg",
 *                      portrait: "media/b62353db-833f-4042-bab3-795ddf8280c3.jpg"
 *                    }
 *                  },
 *                  duration: 10000
 *                }, ...
 *              ]
 *            }
 */
async function getScenes(token) {
  const response = await fetch(api_address + "scenes",
    {
      headers: {
        'x-API-key': token
      },
      method: 'GET'
    }
  )
  const result = await response.json()
  return result
}
 
/**
 * Register device to get tag and API token.
 *
 * @author Pekka Tapio Aalto
 * 
 * @param   {number} width
 *          Width of the screen.
 * @param   {number} height
 *          Height of the screen.
 * @param   {string} app_version
 *          Version of the web application.
 * @returns {Object}
 *          Returned object:
 *            { tag: "A1B-2C3",
 *              token: "wannabeapitoken",
 *              width: 1920,
 *              height: 1080
 *            }
 */
async function registerDevice(width, height, app_version) {
  const response = await fetch(api_address + "register",
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({width: width, height: height, version: app_version}),
    }
  )
  const result = await response.json()
  return result
}

export { getScenes, getState, registerDevice }