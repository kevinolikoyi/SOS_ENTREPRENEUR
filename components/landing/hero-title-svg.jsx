import * as React from "react";

const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="672px"
    height="131px"
    {...props}
  >
    <text
      kerning="auto"
      fontFamily="Myriad Pro"
      fill="rgb(0, 0, 0)"
      transform="matrix( 2.93764575636081, -0.0348214029943, -1.28258459009453e-13, 2.93764575636086,14.1074662467627, 103.098481431251)"
      fontSize="35.021px"
    >
      <tspan fontSize="35.021px" fontFamily="Compacta BT" fill="#e52e76">
        {"On te laisse pas tomber "}
      </tspan>
    </text>
    <text
      kerning="auto"
      fontFamily="Myriad Pro"
      strokeWidth="12px"
      stroke="rgb(255, 255, 255)"
      fillOpacity={0}
      strokeOpacity={1}
      transform="matrix( 2.93764575636081, -0.0348214029943, -1.28258459009453e-13, 2.93764575636086,14.1074662467627, 103.098481431251)"
      fontSize="35.021px"
    >
      <tspan fontSize="35.021px" fontFamily="Compacta BT" fill="#e52e76">
        {"On te laisse pas tomber "}
      </tspan>
    </text>
  </svg>
);

export default SVGComponent;
