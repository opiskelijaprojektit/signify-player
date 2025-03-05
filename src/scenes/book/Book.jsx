import { orientations } from "../../utils/types"   // screen orientation type
import './Book.css'
import React from "react";

function Book (props) {
  
    // Variable to store the url address.
    let url;
  
    // Select the image to be used based on the screen orientation.
    // By default, a landscape image is used.
    switch (props.orientation) {
      case orientations.landscape:
        url = props.url.landscape
        break
      case orientations.portrait:
        url = props.url.portrait
        break
      default:
        url = props.url.landscape
    }
  
    // Return image as an img-element.
  return (
      <img className="scene_book" src={import.meta.env.VITE_API_ADDRESS + url} />
    )  
  }

export default Book;