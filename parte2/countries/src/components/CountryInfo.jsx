import React from "react";

const CountryInfo = ({ name, capital, area, languages, flags }) => {
  const newLangauges = [...Object.values(languages)];

  return (
    <div>
      <h1>{name}</h1>

      <p>capital: {capital}</p>
      <p>area: {area}</p>

      <h3>languages</h3>
      <ul>
        {newLangauges.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <div>
        <img src={flags.svg} alt={flags.alt} />
      </div>
    </div>
  );
};

export default CountryInfo;
