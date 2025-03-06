import { orientations } from "../../utils/types"
import { useEffect, useState } from "react"
import useLocalStorage from "../../utils/useLocalStorage"
import "./Fact.css"

/**
 * A component that displays a random fact of the day overlayed
 * on top of an image. The image is selected based on the screen
 * orientation.
 *
 * @component
 * @param {Object} props- Component properties
 * @param {Object} props.url - URL addresses for the images
 * @param {string} props.url.landscape - URL address for the landscape image
 * @param {string} props.url.portrait - URL address for the portrait image
 * @param {string} props.orientation - Screen orientation
 * @returns {JSX.Element} The Fact component
 * @author Tuomas Pitkänen
 */
function Fact(props) {
  /**
   * URL for the selected image based on orientation.
   * @type {string}
   */
  let url

  /**
   * Stores the random fact last fetched from the API or local storage.
   * @type {[string, function]}
   */
  const [randomFact, setRandomFact] = useLocalStorage("randomFact", "")
  /**
   * Stores the date when the fact was last fetched.
   * @type {[string, function]}
   */
  const [lastFetchDate, setLastFetchDate] = useLocalStorage("lastFetchDate", "")

  /**
   * Indicates whether the data is being loaded.
   * @type {[boolean, function]}
   */
  const [loading, setLoading] = useState(true)
  /**
   * Stores an error message if an error occurs.
   * @type {[string|null, function]}
   */
  const [error, setError] = useState(null)

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

  /** URL for the API that provides the random fact data.
   * @constant {string}
   */
  const API_URL = "http://localhost:3000/scenes"

  /**
   * Fetches a random fact of the day from uselessfacts.net using the server and stores
   * it in localstorage. If the fact has already been fetched today, it will be loaded
   * from localstorage instead of fetching it again. Also sets the last fetch date.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchRandomFact = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error("Failed to fetch data.")
      }

      const data = await response.json()
      const factScene = data.scenes.find((scene) => scene.type === "fact")

      if (!factScene) {
        throw new Error("Fact scene not found.")
      }

      const factResponse = await fetch(factScene.data.API)
      if (!factResponse.ok) {
        throw new Error("Failed to fetch fact data.")
      }

      const factData = await factResponse.json()
      setRandomFact(factData.text || "No fact available.")
      setLastFetchDate(new Date().toLocaleDateString())
    } catch (error) {
      console.error("Error fetching fact:", error)
      setError("Error fetching data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }
  /**Compares the last fetch date with the current date. If the date has changed,
   * a new random fact is fetched.
   * @function
   * @returns {void}
   */
  useEffect(() => {
    const today = new Date().toLocaleDateString()
    if (lastFetchDate === today && randomFact) {
      setLoading(false)
    } else {
      fetchRandomFact()
    }
  }, [])

  /** Returns a Fact component with an image and a random fact of the day or an error message.
   */
  return (
    <div className="scene-container">
      <h2
        className={`overlay-title${
          props.orientation === "landscape" ? "" : "-vertical"
        }`}
      >
        {error ? "" : "Fact of the day:"}
      </h2>
      <p
        className={`overlay-text${
          props.orientation === "landscape" ? "" : "-vertical"
        }`}
      >
        {loading ? "Loading..." : error ? error : randomFact}
      </p>
      <img
        className="scene-fact"
        src={import.meta.env.VITE_MEDIA_ADDRESS + url}
      />
    </div>
  )
}

export default Fact
