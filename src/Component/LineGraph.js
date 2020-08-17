import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./LineGraph.css";

//https://disease.sh/v3/covid-19/historical/all?lastdays=120

//formatting
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

//This basically set up the x-axis and y-axis
const buildChartData = (data, casesType) => {
  const chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint, //get the difference between previous and current date
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = "cases" }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          console.log("last 120 days:", data);
          let tableData = buildChartData(data, casesType);
          console.log(tableData);
          setData(tableData);
        });
    };
    //setData(chartData);
    fetchData();
  }, [casesType]);

  return (
    <div className="graph">
      <h6>LineGraph</h6>
      {/*Check if data exist
      if it's not checked, it will be undefined */}
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}

      {/**      <Line data options /> */}
    </div>
  );
}

export default LineGraph;
