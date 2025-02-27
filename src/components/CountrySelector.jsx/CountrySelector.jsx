import { useState } from "react";
import Select from "react-select";
import countries from "world-countries"; // This package provides country data

// Format countries into a usable structure for react-select
const countryOptions = countries.map((country) => ({
  value: country.cca2, // Country code (e.g., US, FI)
  label: country.name.common, // Country name (e.g., United States, Finland)
  timezone: country.timezones[0] || "UTC", // Default to UTC if no timezone is found
}));

export default function CountrySelector({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onSelect({
      code: selected.value,
      label: selected.label,
      timezone: selected.timezone,
    });
  };

  return (
    <div>
      <Select
        options={countryOptions}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a country..."
      />
    </div>
  );
}