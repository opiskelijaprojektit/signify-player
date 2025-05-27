import { useState, useEffect } from "react";
import "./worldclock.css";

const apiKey = "MC7M2SA2J4L8"; //TODO HANDLAA API KEY kutsu backendistä
const proxyUrl = "https://api.allorigins.win/get?url=";

// Fetch the time and country code for a given timezone
const fetchTime = async (timezone) => {
  const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=${timezone}`;

  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    if (!response.ok) {
      throw new Error("Failed to fetch time");
    }

    const data = await response.json();
    const jsonResponse = JSON.parse(data.contents);

    if (jsonResponse.status === "OK") {
      return {
        time: jsonResponse.formatted,
        countryCode: jsonResponse.countryCode, // Extract the country code from the API response
      };
    } else {
      console.error("Invalid response from API:", jsonResponse);
      return { time: "N/A", countryCode: "FI" }; // Default country code to FI in case of failure
    }
  } catch (error) {
    console.error("Error fetching time:", error);
    return { time: "Error: Failed to fetch time", countryCode: "FI" }; // Default country code to FI in case of error
  }
};

function WorldClock() {
  const [selected, setSelected] = useState([]);
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    // Fetch the timezone data
    const loadTimezoneData = async () => {
      try {
        const response = await fetch("server/data.json");
        const json = await response.json();
        setTimezones(json.scenes.filter(scene => scene.type === "WorldClock").map(scene => scene.data.timezone)); // Extract timezones from the JSON file
      } catch (error) {
        console.error("Error loading timezones:", error);
      }
    };

    loadTimezoneData();
  }, []);

  useEffect(() => {
    // Fetch the time for each timezone once the timezone data is available
    const loadTimes = async () => {
      if (timezones.length === 0) return;

      const timezoneData = await Promise.all(
        timezones.map(async (timezone) => {
          const { time, countryCode } = await fetchTime(timezone);
          return {
            name: timezone.split("/")[0],
            city: timezone.split("/").pop().replace(/_/g, " "),
            timezone,
            time,
            flag: `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`, // Use country code from API response
          };
        })
      );

      setSelected(timezoneData);
    };

    loadTimes();
  }, [timezones]);

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setSelected((prevSelected) =>
        prevSelected.map((country) => {
          const now = new Date();
          const options = {
            timeZone: country.timezone,
          };
          const time = now.toLocaleString("en-FI", options);
          return { ...country, time };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [selected]);

  return (
    <div className="WorldClockBody">
      <div className="worldclock">
        <div className="header">
          <h1>World Clock</h1>
        </div>
        <ul className="country-list">
          {selected.map((country) => (
            <li key={`${country.name}-${country.city}`} className="country-item">
              <img src={country.flag} alt={country.name} width="40" />
              <div className="country-info">
                <p>{country.time}</p>
                <p>{country.timezone}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorldClock;