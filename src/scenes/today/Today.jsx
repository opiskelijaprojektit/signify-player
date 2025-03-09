import { useEffect, useState } from "react";
import { orientations } from "../../utils/types"; 
import "./Today.css"; 

function Today(props) {

    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);

    // Function to get the current date
    function getFormattedDate() {
        const now = new Date();
        const options = { 
            weekday: "long",  
            day: "numeric",   
            month: "long",    
            year: "numeric"   
        };
        return now.toLocaleDateString("fi-FI", options); // Example: "sunnuntai 9. maaliskuuta 2025"
    }

    // Function to get user's location and fetch sunrise/sunset times
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto`)
                        .then(response => response.json())
                        .then(data => {
                            setSunrise(data.daily.sunrise[0].split("T")[1]); // Extracts only the time part
                            setSunset(data.daily.sunset[0].split("T")[1]);
                        })
                        .catch(error => console.error("Error fetching sunrise/sunset:", error));
                },
                (error) => console.error("Geolocation error:", error)
            );
        }
    }, []);

    // Select the correct image based on screen orientation
    let url = props.url.landscape;
    if (props.orientation === orientations.portrait) {
        url = props.url.portrait;
    }

    return (
        <div className="today-container">
            <p className="today-date">{getFormattedDate()}</p>
            {sunrise && sunset ? (
                <p className="today-sun">
                    <span className="sunrise">🌅 Sunrise: <strong>{sunrise}</strong></span>  
                    <br /> 
                    <span className="sunset">🌇 Sunset: <strong>{sunset}</strong></span>
                </p>
            ) : (
                <p className="loading">Loading sunrise/sunset...</p>
            )}
            <img className="scene_image" src={url} alt="Today's Scene" />
        </div>
    );
}

export default Today;

