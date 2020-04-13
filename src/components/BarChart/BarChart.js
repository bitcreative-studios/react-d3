import React, { useRef } from "react"
import PropTypes from "prop-types"

import { useD3Effect, useResizeObserver } from "./hooks"

const BarChart = ({ data }) => {
  const svgRef = useRef()
  const tooltipPadding = 10

  useD3Effect({ svgRef, tooltipPadding, dependencies: [data] })
  const dimension = useResizeObserver(svgRef)
  console.log(dimension)

  return (
    <svg className="bg-gray-300 overflow-visible w-full" ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  )
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default BarChart
