import React, { useState, useEffect } from "react";
import "./TimeLeft.css";

const TimeLeft = ({ data }) => {
  const { targetDateTime: initialTarget, background } = data;
  const savedTarget = localStorage.getItem("targetDateTime");
  const savedBackground = localStorage.getItem("backgroundImage");

  const [targetDateTime, setTargetDateTime] = useState(savedTarget || initialTarget);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(savedTarget || initialTarget));
  const [error, setError] = useState("");
  const [userBackground, setUserBackground] = useState(savedBackground || background["portrait"]);
  const [showHoursAndMinutes, setShowHoursAndMinutes] = useState(true);
  const [previousTimeLeft, setPreviousTimeLeft] = useState(timeLeft);

  function getTimeLeft(targetTime) {
    const now = new Date();
    const target = new Date(targetTime);
    const diffMs = target - now;

    if (diffMs <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffSeconds = Math.floor((diffMs / 1000) % 60);

    return {
      days: diffDays,
      hours: diffHours,
      minutes: diffMinutes,
      seconds: diffSeconds
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetDateTime);
      setTimeLeft(newTimeLeft);
      setPreviousTimeLeft(timeLeft); 
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateTime, timeLeft]);

  const handleResize = () => {
    const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    const backgroundUrl = userBackground || background[orientation];
    setUserBackground(backgroundUrl);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userBackground, background]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const now = new Date();
    const selectedDate = new Date(newDate);

    if (selectedDate <= now) {
      setError("Virheellinen päivämäärä!");
    } else {
      setError("");
      setTargetDateTime(newDate);
      localStorage.setItem("targetDateTime", newDate);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setUserBackground(imageUrl);
        localStorage.setItem("backgroundImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  const backgroundUrl = userBackground || background[orientation];

  return (
    <div
      className="timeleft-container"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="content-box">
        <h1
          className={`fade-pop large-text ${timeLeft.days !== previousTimeLeft.days ? "animate" : ""}`}
          key={`days-${timeLeft.days}`}
        >
          {timeLeft.days} päivää
        </h1>

        {showHoursAndMinutes && (
          <div className="time-units">
            <h2
              className={`fade-pop small-text ${timeLeft.hours !== previousTimeLeft.hours ? "animate" : ""}`}
              key={`hours-${timeLeft.hours}`}
            >
              {timeLeft.hours}h
            </h2>
            <h2
              className={`fade-pop small-text ${timeLeft.minutes !== previousTimeLeft.minutes ? "animate" : ""}`}
              key={`minutes-${timeLeft.minutes}`}
            >
              {timeLeft.minutes}m
            </h2>
            <h2
              className={`fade-pop small-text ${timeLeft.seconds !== previousTimeLeft.seconds ? "animate" : ""}`}
              key={`seconds-${timeLeft.seconds}`}
            >
              {timeLeft.seconds}s
            </h2>
          </div>
        )}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <label>Anna päivämäärä ja aika:</label><br />
          <input 
            type="datetime-local" 
            onChange={handleDateChange} 
            value={targetDateTime ? targetDateTime.slice(0, 16) : ""}
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center", display: "inline-flex", alignItems: "center" }}>
          <label>Näytä tunnit, minuutit ja sekunnit?</label>
          <input 
            type="checkbox" 
            checked={showHoursAndMinutes} 
            onChange={() => setShowHoursAndMinutes(!showHoursAndMinutes)} 
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <label>Lisää taustakuva</label><br />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange}
            id="file-upload"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLeft;
