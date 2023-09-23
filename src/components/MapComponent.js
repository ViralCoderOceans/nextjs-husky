"use client";

import React, { useState } from "react";
import { SVGMap } from "react-svg-map";
import italy from "@svg-maps/italy";
import "react-svg-map/lib/index.css";
import styles from "./mapStyles.css";

const MapComponent = () => {
  const [pointedLocation, setPointedLocation] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });

  const handleLocationMouseOver = (event) => {
    const pointedLocation = event.target.getAttribute("name");
    setPointedLocation(pointedLocation);
  };

  const handleLocationMouseOut = () => {
    setPointedLocation(null);
    setTooltipStyle({ display: "none" });
  };

  const handleLocationMouseMove = (event) => {
    const tooltipStyle = {
      display: "block",
      top: event.screenY - 80,
      left: event.screenX - 30,
    };
    setTooltipStyle(tooltipStyle);
  };

  return (
    <>
      <div className="relative">
        <SVGMap
          map={italy}
          className={styles.svgMap}
          locationClassName={styles.svgMapLocation}
          onLocationMouseOver={handleLocationMouseOver}
          onLocationMouseOut={handleLocationMouseOut}
          onLocationMouseMove={handleLocationMouseMove}
        />
        <div
          className="fixed bg-white shadow-lg opacity-80 p-1 px-2 font-medium rounded-md border-black"
          style={tooltipStyle}
        >
          {pointedLocation}
        </div>
      </div>
    </>
  );
};

export default MapComponent;
