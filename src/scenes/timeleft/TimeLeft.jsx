/**
 * @author Tuomas Aalto
 */

import React, { useState, useEffect } from "react";
import "./TimeLeft.css";

const TimeLeft = () => {
  const [targetDateTime, setTargetDateTime] = useState(null);
  const [background, setBackground] = useState({ portrait: "", landscape: "" });
  const [timeLeft, setTimeLeft] = useState(null);
  const [previousTimeLeft, setPreviousTimeLeft] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const showHoursAndMinutes = true; // Vaihda false, jos haluat piilottaa minuutit ja sekunnit
  
  useEffect(() => {
  const handleResize = () => {
    setBackground((prev) => ({ ...prev })); // Trigger re-render
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/timeleft");
        const data = await res.json();

        const savedTarget = localStorage.getItem("targetDateTime");

        const target = savedTarget || data.targetDateTime;
        const bg = data.background;

        setTargetDateTime(target);
        setTimeLeft(getTimeLeft(target));
        setPreviousTimeLeft(getTimeLeft(target));
        setBackground(bg);
        setLoading(false);
      } catch (err) {
        console.error("Virhe API-kutsussa:", err);
        setError("Tietojen haku epäonnistui.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!targetDateTime) return;

    const timer = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetDateTime);
      setPreviousTimeLeft(timeLeft);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateTime, timeLeft]);

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

    return { days: diffDays, hours: diffHours, minutes: diffMinutes, seconds: diffSeconds };
  }

  const orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  const backgroundUrl = background[orientation];

  if (loading) return <div>Ladataan näkymää...</div>;
  if (error) return <div>{error}</div>;
  if (!timeLeft) return null;

  return (
    <div className="timeleft-container" style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <div className="content-box">
        <h1
          className={`fade-pop large-text ${timeLeft.days !== previousTimeLeft?.days ? "animate" : ""}`}
          key={`days-${timeLeft.days}`}
        >
          {timeLeft.days} päivää
        </h1>

        {showHoursAndMinutes && (
          <div className="time-units">
            <h2
              className={`fade-pop small-text ${timeLeft.hours !== previousTimeLeft?.hours ? "animate" : ""}`}
              key={`hours-${timeLeft.hours}`}
            >
              {timeLeft.hours}h
            </h2>
            <h2
              className={`fade-pop small-text ${timeLeft.minutes !== previousTimeLeft?.minutes ? "animate" : ""}`}
              key={`minutes-${timeLeft.minutes}`}
            >
              {timeLeft.minutes}m
            </h2>
            <h2
              className={`fade-pop small-text ${timeLeft.seconds !== previousTimeLeft?.seconds ? "animate" : ""}`}
              key={`seconds-${timeLeft.seconds}`}
            >
              {timeLeft.seconds}s
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeLeft;
