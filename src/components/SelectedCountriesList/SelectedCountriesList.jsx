import { DateTime } from "luxon";
import "./SelectedCountriesList.css";

export default function SelectedCountriesList({ selectedCountries, onRemove }) {
  return (
    <div>
      {selectedCountries.map((country) => {
        const time = DateTime.now().setZone(`Etc/GMT${country.timezone}`).toFormat("HH:mm");

        return (
          <div key={country.code} className="country-item">
            <img
              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
              alt={`${country.label} flag`}
              className="flag-icon"
            />
            <span>{country.label}: {time}</span>
            <button onClick={() => onRemove(country.code)} className="remove-button"></button>
          </div>
        );
      })}
    </div>
  );
}