import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./Component/InfoBox";
import Map from "./Component/Map";
import Table from "./Component/Table";
import { sortData } from "./util";
import LineGraph from "./Component/LineGraph";

/* API call to this site
  https://disease.sh/v3/covid-19/countries */

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  //const [countries, setCountries] = useState(["USA", "UK", "CHINA"]);

  //The first use effect is for worldwide view
  //When the user step onto the website, it will shows the world wide information on covid cases
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //This use effect will show info depend on which country is selected by the user on the dropdown menu
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
          //Create a variable that calls the helper function and pass in the list obtained from API
          const sortedData = sortData(data);
          //Pass the sorted list into the table data
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //onChange event function that takes in whatever drop down menu selector is selected
  //This function fetch the data from API base on which ever country is selected from the drop down menu
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("selected value: ", countryCode);

    setCountry(countryCode);

    //Make a call to the server and grab all the info
    /**
     * if worldwide
     *  use https://disease.sh/v3/covid-19/countries/all
     *
     * else
     *  use https://disease.sh/v3/covid-19/countries/[country_code]
     */

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //update the input field
        setCountry(countryCode);
        //update the country information
        setCountryInfo(data);
        console.log("country update", countryCode);
        console.log("country info:", data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          {/* Title and dropdown field*/}
          <h1>COVID Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
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
          <InfoBox
            title="Coronavirus"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          {/* Graph */}
          <h3>Worldwide cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
