import { useEffect, useState } from 'react'
import useInterval from '../../utils/useInterval.js'
import useLocalStorage from '../../utils/useLocalStorage.js'
import { getState, getScenes, registerDevice } from '../../utils/api.js'
import { devicestate, orientations, screens } from '../../utils/types.js'
import { getOrientation } from '../../utils/functions.js'
import Splash from '../splash/index.js'
import Scene from '../scene'
import './App.css'

// Get the values of the environmental variables.
const app_name = import.meta.env.VITE_APP_NAME
const app_version = import.meta.env.VITE_APP_VERSION

// To reset the settings in the localStorage, remove the comments
// in the line below and perform a page refresh. Then restore the
// comments.
// localStorage.removeItem(app_name)

/**
 * Application's main component. Manages the screens and loads the data at
 * specified intervals.
 *
 * @component
 * @author Pekka Tapio Aalto
 */
function App() {

  // Initialize the variables.
  const [screen, setScreen] = useState(screens.splash)                       // screen mode
  const [scenes, setScenes] = useState([])                                   // content
  const [currentHash, setCurrentHash] = useState('')                         // hash of the current content
  const [playerSettings, setPlayerSettings] = useLocalStorage(app_name, {})  // application configurations
  const [checkDelay, setCheckDelay] = useState(null)                         // interval time of the checks
  const [startTime, setStartTime] = useState(Date.now())                     // app's start time
  const [playerVersion, setPlayerVersion] = useState('')

  // Get interval times from environment variables.
  const interval_registed = Number(String(import.meta.env.VITE_APP_INTERVAL_REGISTERED))
  const interval_linked = Number(String(import.meta.env.VITE_APP_INTERVAL_LINKED))
  const interval_scenes = Number(String(import.meta.env.VITE_APP_INTERVAL_SCENES))

  // Determine the width, height and orientation of the screen.
  const width = window.screen.width
  const height = window.screen.height
  const orientation = getOrientation(width, height)
  
  // Updates the content data displayed in scene mode.
  function updateScenes() {
    // Get the content attached to the device.
    getScenes(playerSettings.token).then(
      scenedata => {
        // Check if content is attached to the device.
        if (scenedata.scenes.length == 0) {
          // There is no content attached to the device,
          // set the display mode to linked and check
          // interval to 30 seconds.
          setScreen(screens.linked)
          setCheckDelay(interval_linked)
        } else {
          // Check if player's version has been updated.
          // If so, do page reload to load new data.
          if (playerVersion && scenedata.version != playerVersion) {
            console.log("New player version exists, reload page.")
            location.reload(true)
          } else if (!playerVersion) {
            // Store player's version to state.
            setPlayerVersion(scenedata.version)
            console.log("Version " + scenedata.version)
          }
          // The device has attached content, check if contents
          // hash differs from stored contents hash.
          if (currentHash != scenedata.hash) {
            // Hash differs, let's update content data.
            // Store new content and content's hash.
            // Set the display mode to scene and check interval
            // to 5 minutes (5*60*1000=300000).
            setScenes(scenedata.scenes)
            setCurrentHash(scenedata.hash)
            setScreen(screens.scene)
            setCheckDelay(interval_scenes)
          }
        }
      }
    )
  } 

  // Perform the initialisation of the component. Find out what
  // display mode the component is initially set to.
  useEffect(()=>{
    // Check whether the token value is defined in the settings.
    if (!playerSettings.token) {
      // If not, then register the device.
      registerDevice(width, height, app_version).then(
        displaySettings => {
          // Save the settings and set the display mode to registered.
          // Set check interval to 30 seconds.
          setPlayerSettings(displaySettings)
          setScreen(screens.registered)
          setCheckDelay(interval_registed)
        }
      )
    } else {
      // The device is registered, let's next check if it is linked.
      getState(playerSettings.token, width, height, app_version).then( statedata => {
        if (statedata.state == devicestate.registered) {
          // The device is registered, but not linked.
          // Set the display mode to registered and
          // check interval to 30 seconds.
          setScreen(screens.registered)
          setCheckDelay(interval_registed)
        } else if (statedata.state == devicestate.linked) {
          // The device is linked, update setting values and save.
          setPlayerSettings(settings => ({ ...settings, ...statedata}))
          // Get the latest scenes
          updateScenes()
        }
      }) 
    }
  },[])

  useEffect(()=>{
    if (screen==screens.registered) {
      const url = window.location.href +
                  import.meta.env.VITE_API_ADDRESS + "demo?tag=" + playerSettings.tag
      console.log("You can register this device in demo mode by visiting the address " + url)
    }
  },[screen])

  // Define an update action, which is called on a case-by-case
  // basis at different update intervals.
  useInterval(()=>{

    // Print current memory usage on console.
    const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024;
    console.log(`Current memory usage: ${memoryUsage.toFixed(2)} MB`);

    if (screen == screens.registered || screen == screens.linked) {
      // Tarkistetaan laitteen tila.
      getState(playerSettings.token, width, height, app_version).then( statedata => {
        if (statedata.state == devicestate.registered && screen != devicestate.registered) {
          // The device is registered, but not linked and the display mode is
          // something other than registered. 
          // Set it to display mode to registered and check interval to 30 seconds.
          setScreen(screens.registered)
          setCheckDelay(30000)
        }
        if (statedata.state == devicestate.linked) {
          // The device is linked, update setting values and save.
          setPlayerSettings(settings => ({ ...settings, ...statedata}))
          // Device is linked, check if there is content attached to the device.
          updateScenes()
        }
      })
    } else if (screen == screens.scene) {
      // Update scenedata.
      updateScenes()
    }
  }, checkDelay)

  // Select a view based on the display mode.
  switch (screen) {
    case screens.splash:
      return (<Splash orientation={orientation} />)
      break;
    case screens.registered:
      return (<Splash tag={playerSettings.tag} orientation={orientation} />)
      break;
    case screens.linked:
      return (<Splash name={playerSettings.name} orientation={orientation} />)
      break;
    case screens.scene:
      return (<Scene scenes={scenes} orientation={orientation} startTime={startTime} version={playerVersion} />)
      break;
    default:
      return (<Splash notfound />)
  }

}

export default App