import { useEffect, useState } from "react";

// Converts an object to a JSON string.
const decode = (value) => {  
  return JSON.stringify(value);
}

// Converts a JSON string to an object.
const encode = (value) => {
  return JSON.parse(value);
}

/**
 * @typedef  {Object} useLocalStorageObject
 * @property {Object} value
 *           Value of state variable.
 * @property {function} setValue
 *           Function to set new value.
 * @property {function} resetValues
 *           Function to reset value to initial values.
 */

/**
 * A custom React Hook that acts as a state variable 
 * for the application and automatically saves the data 
 * to localStorage in the background.
 *
 * @author Pekka Tapio Aalto
 *
 * @example
 *   const [settings, setSettings] = useLocalStorage('settings', {})
 * 
 *   setSettings({tag: 'ABC'})
 *  
 * @param   {string} key
 *          A string containing the name of the key used to store the value.
 * @param   {Object} defaultState
 *          Initial state of the value.
 * @returns {useLocalStorageObject}
 *          Value and handling functions.
 */
const useLocalStorage = (key, defaultState) => {

  // Defines a state variable and places either the
  // value stored in the localStorage container with
  // key tag or the initial value.
  const [value, setValue] = useState(
    encode(localStorage.getItem(key) || null) || defaultState
  );

  // Store the state variable in localStorage whenever
  // the value changes.
  useEffect(() => {
    localStorage.setItem(key, decode(value));
  },  [value]);

  // Function to return initial values.
  const resetValue = () => {
    setValue(defaultState);
  }

  // Return an array containing
  //  - value of state variable
  //  - function to set new value
  //  - function to reset value to initial values
  return [value, setValue, resetValue];
}

export default useLocalStorage;