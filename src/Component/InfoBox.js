import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({
  title,
  cases,
  wordBlue,
  active,
  isOrange,
  isRed,
  total,
  wordRed,
  wordOrange,
  ...props
}) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--isBlue"} ${
        isRed && "infoBox--isRed"
      } ${isOrange && "infoBox--isOrange"} `}
      onClick={props.onClick}
    >
      <CardContent>
        {/* Title */}
        <Typography
          className={`infoBox__title ${wordBlue && "infoBox--letterBlue"}
          ${wordRed && "infoBox--letterRed"}
          ${wordOrange && "infoBox--letterOrange"}`}
          color="textSecondary"
        >
          <p>{title}</p>
          <h6>(today, total)</h6>
        </Typography>

        {/* # of cases  className="infoBox__cases"*/}
        <h2
          className={`infoBox__cases ${wordBlue && "infoBox--letterBlue"} ${
            wordOrange && "infoBox--letterOrange"
          }`}
        >
          <p>{cases}</p>
        </h2>

        {/* Total cases  */}
        <Typography className="infoBox__total" color="textSecondary">
          <h5>{total} total</h5>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
