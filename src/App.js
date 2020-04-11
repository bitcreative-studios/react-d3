import React, { useRef, useEffect, useState } from "react"
import { darken, lighten } from "polished"
import { select } from "d3"

const App = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20])

  const svgRef = useRef()

  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (d) => d)
      .attr("cx", (d) => d * 2)
      .attr("cy", (d) => d * 2)
  }, [data])
  return (
    <div className="App">
      <svg className="bg-gray-300" ref={svgRef} />
      <div className="mt-4">
        <button
          className="py-2 px-4 bg-blue-100 uppercase
              tracking-wide text-gray-600 hover:bg-blue-200 focus:outline-none
              focus:shadow-outline rounded-sm transition duration-150"
          onClick={() => setData(data.map((d) => d + 5))}
        >
          Update Data
        </button>
        <button
          className="ml-3 py-2 px-4 bg-blue-100 uppercase
              tracking-wide text-gray-600 hover:bg-blue-200 focus:outline-none
              focus:shadow-outline rounded-sm transition duration-150"
          onClick={() => setData(data.filter((d) => d < 35))}
        >
          Filter Data
        </button>
      </div>
    </div>
  )
}

export default App
