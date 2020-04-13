import { random } from "lodash"
import React, { useState } from "react"
import BarChart from "./components/BarChart"

const App = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75])
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(150)

  return (
    <div className="container p-4 mx-auto flex flex-col justify-center items-center">
      <BarChart data={data} height={height} width={width} />
      <div className="mt-8">
        <button
          className="py-2 px-4 bg-teal-300 uppercase
              tracking-wide text-gray-700 hover:bg-teal-400 focus:outline-none
              focus:shadow-outline rounded-sm transition duration-150"
          onClick={() => setData(data.map((d) => d + 5))}
        >
          Update Data
        </button>
        <button
          className="ml-3 py-2 px-4 bg-teal-300 uppercase
              tracking-wide text-gray-700 hover:bg-teal-400 focus:outline-none
              focus:shadow-outline rounded-sm transition duration-150"
          onClick={() => setData(data.filter((d) => d < 35))}
        >
          Filter Data
        </button>
        <button
          className="ml-3 py-2 px-4 bg-teal-300 uppercase
              tracking-wide text-gray-700 hover:bg-teal-400 focus:outline-none
              focus:shadow-outline rounded-sm transition duration-150"
          onClick={() => setData([...data, random(height)])}
        >
          Add Data
        </button>
      </div>
    </div>
  )
}

export default App
