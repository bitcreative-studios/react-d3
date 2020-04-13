import React, { useRef } from "react"
import PropTypes from "prop-types"
import useD3Effect from "./useD3Effect"

const BarChart = ({ data, height = 150, width = 300 }) => {
  const svgRef = useRef()
  const tooltipPadding = 10

  useD3Effect({ svgRef, height, width, tooltipPadding, dependencies: [data] })

  return (
    <svg
      className="bg-gray-300 overflow-visible"
      width={width}
      height={height}
      ref={svgRef}
    >
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  )
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
}

export default BarChart
