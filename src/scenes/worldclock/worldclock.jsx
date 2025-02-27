import { useState, useEffect } from "react";
import './worldclock.css'
import { DateTime } from "luxon";
import { orientations } from "../../utils/types";

/*
    @component
    @author Henrik Blom
*/
function WorldClock({ orientation, data }) {
  const [currentTimes, setCurrentTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const times = {};
      data.countries.forEach((country) => {
        try {
          let zone = country.timezone;
    
          // If the timezone is a numeric offset (e.g., "+3", "-5"), convert it to Etc/GMT
          if (/^[+-]?\d+$/.test(zone)) {
            zone = `Etc/GMT${zone.startsWith("-") ? "+" : "-"}${Math.abs(zone)}`;
          }
    
          const time = DateTime.now().setZone(zone).isValid
            ? DateTime.now().setZone(zone).toFormat("HH:mm:ss")
            : "Invalid Timezone";
    
          times[country.code] = time;
        } catch (error) {
          console.error(`Error fetching time for ${country.label}:`, error);
          times[country.code] = "Invalid Time";
        }
      });
      setCurrentTimes(times);
    };

    updateTimes(); // Initial update
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data.countries]);

  return (
    <div className={`worldclock-container ${orientation}`}>
      {data.countries.map((country) => (
        <div key={country.code} className="worldclock-item">
          <img
            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
            alt={`${country.label} flag`}
            className="flag-icon"
          />
          <span>{country.label}: {currentTimes[country.code]}</span>
        </div>
      ))}
    </div>
  );
}

export default WorldClock;