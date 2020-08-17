import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <div className="infoBox">
      <Card>
        <CardContent>
          {/* Title */}
          <Typography className="infoBox__title" color="textSecondary">
            {title} <h6>(today, total)</h6>
          </Typography>

          {/* # of cases */}
          <h2 className="infoBox__cases">{cases}</h2>

          {/* Total cases */}
          <Typography className="infoBox__total" color="textSecondary">
            <h5>{total} total</h5>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
