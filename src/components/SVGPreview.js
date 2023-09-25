import React from "react";
import { useEffect, useRef } from "react";

const SVGPreview = ({ svgData }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgData && svgRef.current) {
      svgRef.current.innerHTML = svgData;
    }
  }, [svgData]);

  return <div ref={svgRef} />;
};

export default SVGPreview;
