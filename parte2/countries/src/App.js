import React from "react";
import { getAllCountries } from "./Services/countries";
import CountryInfo from "./components/CountryInfo";
import Weather from "./components/Weather";

function App() {
  const [searchCountry, setSearchCountry] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [filterSearch, setFilterSearch] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [countrieIndex, setCountrieIndex] = React.useState(null);

  React.useEffect(() => {
    getAllCountries().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchCountry(value);

    if (value === "") {
      setFilterSearch([]);
      return;
    }

    const filter = countries.filter((countrie) => {
      const name = countrie.name.common.toLowerCase();
      return name.includes(value);
    });
    setFilterSearch(filter);
  };

  const toggleActive = (index) => {
    setActive(!active);
    setCountrieIndex(index);
  };

  return (
    <div>
      <span>find countries: </span>
      <input value={searchCountry} onChange={handleChange} type="text" />
      {filterSearch.length > 10 && (
        <p>To many matches, especicifc another filter</p>
      )}
      {filterSearch.length <= 10 &&
        filterSearch.length > 1 &&
        filterSearch.map((fil, index) => {
          return (
            <div key={fil.name.common}>
              <span>{fil.name.common}</span> :{" "}
              <button onClick={() => toggleActive(index)}>show</button>
              {active && countrieIndex === index && (
                <CountryInfo
                  name={fil.name.common}
                  capital={fil.capital}
                  area={fil.area}
                  languages={fil.languages}
                  flags={fil.flags}
                />
              )}
            </div>
          );
        })}
      {filterSearch.length === 1 && (
        <div>
          <CountryInfo
            name={filterSearch[0].name.common}
            capital={filterSearch[0].capital}
            area={filterSearch[0].area}
            languages={filterSearch[0].languages}
            flags={filterSearch[0].flags}
          />

          <Weather capital={filterSearch[0].capital} />
        </div>
      )}
    </div>
  );
}

export default App;
