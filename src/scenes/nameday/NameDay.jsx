import './Nameday.css'
import React, { useState, useEffect } from 'react'

/**
 * NameDay component that fetches data from the nameday API daily
 * and stores the data in localStorage for efficient access.
 *
 * @component
 * @author Sanna Aspiola
 */

const NameDay = (props) => {

  // Set the API url-address.
  const apiurl = "https://nameday.abalin.net/api/V1/today"
  // Saves today's nameday data from API.
  const [namedayToday, setNamedayToday] = useState({nameday: []})
  // Defines the values of region.
  const params = { "country": "fi", "timezone": "Europe/Helsinki" }
  // Defines the headers for API request.
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  // Fetches data from API, if it's not been fetched today.
  // If data is available in localStorage (cachedData) and is up to date,
  // it uses the cached data instead of making a new API request.
  useEffect(() => {
    if (!apiurl) return

    try {
      const fetchUrl = new URL(apiurl)
      Object.keys(params).forEach(key => fetchUrl.searchParams.append(key, params[key]));

      const lastFetch = localStorage.getItem("nameday_lastFetch")
      const today = new Date().toISOString().split("T")[0]
      const cachedData = localStorage.getItem("nameday_data")
      //console.log("Last fetched date:", lastFetch) // Debug
      //console.log("Today's date:", today) // Debug
      if (lastFetch === today && cachedData) {
            setNamedayToday(JSON.parse(cachedData))
            console.log("Using cached data in NameDay-component: ", cachedData)
            return      
      }

      fetch(fetchUrl.href, {
        method: "GET",
        headers,
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => { 
        localStorage.setItem("nameday_data", JSON.stringify(data))
        localStorage.setItem("nameday_lastFetch", today)
        setNamedayToday(data)
      })
      .catch((error) => console.error("Fetching data from API failed: ", error));

    } catch (error) {
      console.error("Invalid URL: ", error);
    }
  }, [apiurl])
     
  const header = props.header
  const year = new Date().getFullYear()
  
  // Return the NameDay-component.
  return (
    <div className="nameday_text">
      <h2 className="nameday_header">{header}</h2>
      <p className="nameday_date">{namedayToday.day + "." + namedayToday.month + "." + year}<br /></p>
      <p className="nameday_names">{namedayToday.nameday.fi}</p>
    </div>
  )
}

export default NameDay