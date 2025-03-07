import { useState, useEffect } from "react";
import "./worldclock.css";

const apiKey = "MC7M2SA2J4L8";//TODO HANDLAA API KEY kutsu backendistä jotta API key pysyy paremmin salassa
const proxyUrl = "https://api.allorigins.win/get?url=";
const timeZoneListUrl = `https://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`;

const fetchCountries = async (query) => {
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(timeZoneListUrl));
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    
    const data = await response.json();
    const jsonResponse = JSON.parse(data.contents);

    if (jsonResponse.status === "OK") {
      return jsonResponse.zones
        .map((zone) => ({
          name: zone.countryName.replace(/_/g, " "),
          city: (zone.cityName || zone.zoneName.split("/").pop()).replace(/_/g, " "),
          code: zone.countryCode,
          timezone: zone.zoneName,
          flag: `https://flagcdn.com/w320/${zone.countryCode.toLowerCase()}.png`,
        }))
        .filter((country) =>
          `${country.name} - ${country.city}`.toLowerCase().includes(query.toLowerCase())
        );
    } else {
      console.error("Invalid response from API:", jsonResponse);
      return [];
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

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
      return jsonResponse.formatted;
    } else {
      console.error("Invalid response from API:", jsonResponse);
      return "N/A";
    }
  } catch (error) {
    console.error("Error fetching time:", error);
    return "Error: Failed to fetch time";
  }
};

function WorldClock() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query.length > 2) {
        const fetchedCountries = await fetchCountries(query);
        setCountries(fetchedCountries);
      } else {
        setCountries([]);
      }
    };
    fetchData();
  }, [query]);

  const addCountry = async (country) => {
    if (!selected.find((c) => c.name === country.name && c.city === country.city)) {
      const time = await fetchTime(country.timezone);
      setSelected((prevSelected) => [...prevSelected, { ...country, time }]);
    }
    setQuery("");
    setCountries([]);
  };

  const removeCountry = (name, city) => {
    setSelected((prevSelected) => prevSelected.filter((c) => c.name !== name || c.city !== city));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prevSelected) =>
        prevSelected.map((country) => {
          const now = new Date();
          const options = {
            timeZone: country.timezone,
          };
          const time = now.toLocaleString("en-US", options);
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a country"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {countries.length > 0 && (
            <ul className="dropdown">
              {countries.map((country) => (
                <li key={`${country.name}-${country.city}`} onClick={() => addCountry(country)}>
                  <img src={country.flag} alt={country.name} width="20" /> {country.name} - {country.city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <ul className="country-list">
          {selected.map((country) => (
            <li key={`${country.name}-${country.city}`} className="country-item">
              <img src={country.flag} alt={country.name} width="40" />
              <div className="country-info">
                <p>{country.name} - {country.city}</p>
                <p>{country.time}</p>
              </div>
              <button onClick={() => removeCountry(country.name, country.city)}>&#10006;</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorldClock;
