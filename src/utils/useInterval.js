import { useRef, useEffect } from "react";

/**
 * A custom React hook that triggers the given function at
 * specified intervals. It is also possible to stop the triggering.
 *
 * @see {@link https://www.joshwcomeau.com/snippets/react-hooks/use-interval/}
 * 
 * @example
 *   const [delay, setDelay] = useState(10000)
 *
 *   function triggerHandler() {
 *     console.log("function triggered!")
 *     setDelay(null)
 *   }
 * 
 *   useInterval(triggerHandler, delay)
 *  
 * @param   {function} callback
 *          A function called when time has elapsed.
 * @param   {number} delay
 *          A time in millisecons that is waited before the function is called.
 * @returns {Object}
 *          Rererence to interval.
 */
function useInterval(callback, delay) {
  const intervalRef = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

export default useInterval