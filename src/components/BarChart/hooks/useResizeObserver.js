import { useEffect, useState } from "react"

/**
 *
 * @param {MutableRefObject} elmRef
 * @return {unknown}
 */
const useResizeObserver = (elmRef) => {
  const [dimensions, setDimensions] = useState(null)

  useEffect(() => {
    const observerTarget = elmRef.current
    const resizeObserver = new ResizeObserver((entries) => {
      console.log(entries)
      // TODO: set resize dimensions
    })
    resizeObserver.observe(observerTarget)
    // cleanup callback, called when consumer component is mounted/unmounted
    return () => {
      resizeObserver.unobserve(observerTarget)
    }
  }, [elmRef])
  return dimensions
}

export default useResizeObserver
