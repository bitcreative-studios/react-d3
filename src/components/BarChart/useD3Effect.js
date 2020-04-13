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
 * @param {Number}height
 * @param {Number} width
 * @param {Number}tooltipPadding
 * @param {Array<*>} dependencies
 */
const useD3Effect = ({
  svgRef,
  height,
  width,
  tooltipPadding,
  dependencies,
}) => {
  const [data] = dependencies
  useEffect(() => {
    const svg = select(svgRef.current)
    const xScale = scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, width])
      .padding(0.5)

    const yScale = scaleLinear().domain([0, height]).range([height, 0])

    const colorScale = scaleSequential()
      .domain([75, height])
      .interpolator(interpolateViridis)

    const xAxis = axisBottom(xScale).ticks(data.length)
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height}px)`)
      .call(xAxis)

    const yAxis = axisRight(yScale)
    svg
      .select(".y-axis")
      .style("transform", `translateX(${width}px)`)
      .call(yAxis)

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1,-1)")
      .style("cursor", "pointer")
      .attr("x", (d, i) => xScale(i))
      .attr("y", -height)
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
      .attr("height", (d) => height - yScale(d))
  }, dependencies)
}

export default useD3Effect
