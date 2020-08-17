import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from "./Component/InfoBox";
import Map from "./Component/Map";

/* API call to this site
  https://disease.sh/v3/covid-19/countries */

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  //const [countries, setCountries] = useState(["USA", "UK", "CHINA"]);

  useEffect(() => {
    // The code in here will run once when the component loads but not again after
    //async -> send request to the server, wait for it, and do something with it

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //onChange event function that takes in whatever drop down menu selector is selected
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log("selected value: ", countryCode);

    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__header">
        {/* Header */}
        {/* Title and dropdown field*/}
        <h1>COVID Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>

            {/*map through the list of countries brought in from the api and display it here */}
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Info box */}
      <div className="app__stats">
        <InfoBox title="Coronavirus" cases={123} total={2000} />
        <InfoBox title="Recovered" cases={123} total={3000} />
        <InfoBox title="Deaths" cases={123} total={4000} />
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
      <Map />
    </div>
  );
}

export default App;
