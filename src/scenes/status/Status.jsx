import Container from "../../components/container/Container"
import './Status.css'
import background from "./background.jpg"

/**
 * An status component that presents statistic data of the
 * app and it's execution. 
 *
 * @component
 * @author Pekka Tapio Aalto
 */
function Status(props) {

  // Calculate uptime and generate string.
  const uptime = Math.round((Date.now() - props.startTime) / (1000 * 60))
  const days = Math.floor(uptime / (24 * 60))
  const hours = Math.floor((uptime - days * 24 * 60) / 60)
  const minutes = uptime - days * 24 * 60 - hours * 60
  let uptimeString
  if (days) {
    uptimeString = days + " d " + hours + " h " + minutes + " min"
  } else if (hours) {
    uptimeString = hours + " h " + minutes + " min"
  } else {
    uptimeString = minutes + " min"
  }

  // Get the memory usage of the app.
  const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024
  
  // Get the width and height of the screen.
  const width = window.screen.width
  const height = window.screen.height  

  return (
    <Container className="status" backgroundImage={background}>
      <h1>STATUS</h1>
      <div className="statusdata_container">
        <div>
          <h2>Uptime</h2>
          <div>{uptimeString}</div>
        </div>
        <div>
          <h2>Memory</h2>
          <div>{memoryUsage.toFixed(2)} MB</div>
        </div>
        <div>
          <h2>Screen</h2>
          <div>{width} x {height}</div>
        </div>
        <div>
          <h2>Version</h2>
          <div>FE {import.meta.env.VITE_APP_VERSION} | BE {props.version}</div>
        </div>
      </div>
    </Container>
  )
}

export default Status