import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#CC1034", //setting the circle color
    multiplier: 800, //magic number
  },
  recovered: {
    hex: "#3cd0fa",
    multiplier: 1200,
  },
  deaths: {
    hex: "#f19d1f",
    multiplier: 2000,
  },
};

//Helper function that will sort a list of data

/*(a , b) are basically different items that's being grabbed
    Once grabbed, it will then compare each other and placed them accordingly
 */
export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;

  {
    /*
    Simplified into one line

    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1))

*/
  }
};

// A helper method to draw circle on the map to highlight cases in each area
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

//A helper function that modify the way number display in the info box
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0,0")}` : "+0";

export const prettyNumStats = (stat) =>
  stat ? `${numeral(stat).format("0,0")}` : "+0";
//numeral(stat).format("0,0");
