import { useEffect } from "react"
import {
  axisBottom,
  axisRight,
  interpolateViridis,
  scaleBand,
  scaleLinear,
  scaleSequential,
  select,
} from "d3"

/**
 *
 * @param {MutableRefObject} svgRef
 * @param {Number}tooltipPadding
 * @param {Array<*>} dependencies
 */
const useD3Effect = ({ svgRef, tooltipPadding, dependencies }) => {
  const [data] = dependencies
  useEffect(() => {
    const svg = select(svgRef.current)
    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, 300])
      .padding(0.5)

    const yScale = scaleLinear().domain([0, 150]).range([150, 0])

    const colorScale = scaleSequential()
      .domain([75, 150])
      .interpolator(interpolateViridis)

    const xAxis = axisBottom(xScale).ticks(data.length)
    // FIXME: need to make translateX dynamic
    svg.select(".x-axis").style("transform", `translateY(100%)`).call(xAxis)

    const yAxis = axisRight(yScale)
    // FIXME: need to make translateY dynamic
    svg.select(".y-axis").style("transform", `translateX(300px)`).call(yAxis)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .style("cursor", "pointer")
      .attr("x", (d, i) => xScale(i))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (datum, i) => {
        svg
          .selectAll(".tooltip")
          .data([datum])
          .join("text")
          .attr("class", "tooltip")
          .text(datum)
          .attr("x", xScale(i) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .attr("y", yScale(datum) - tooltipPadding)
          .transition()
          .attr("opacity", 1)
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", (d) => colorScale(d))
      .attr("height", (d) => 150 - yScale(d))
  }, dependencies)
}

export default useD3Effect
