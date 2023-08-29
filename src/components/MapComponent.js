import React from "react";
import { SVGMap } from "react-svg-map";
import italy from "@svg-maps/italy";
import "react-svg-map/lib/index.css";
import styles from "./mapStyles.css";

const MapComponent = () => {
  const onLocationClick = (event) => {
    console.log("Name", event.target.getAttribute("name"));
  };

  return (
    <SVGMap
      map={italy}
      onLocationClick={onLocationClick}
      className={styles.svgMap}
      locationClassName={styles.svgMapLocation}
    />
  );
};

export default MapComponent;
