import { orientations } from "../../utils/types"   // screen orientation type
import React from 'react';
import './SceneBook.css'


//testaan miten saa kirjankannen apilla haettua
async function fetchImage(url) {
    const img = new Image();
    return new Promise((res, rej) => {
        img.onload = () => res(img);
        img.onerror = e => rej(e);
        img.src = url;
    });
}
const img = await fetchImage('https://openlibrary.org/books/random.json');
const w = img.width;
const h = img.height;


// Functional component otsikko
function Book(props) {

  //jotain kuvaa yläreunaan
const image = document.createElement("img");
image.src = "images/kirjahylly.jpg";

//testaan tarviiko tämän
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

  //otsikkoa
  return (
    <div>
      <h1>Book of the Day</h1>
      <p>TODO laita openlibrary random api</p>
      <p>TODO laita kirjan kuva ja perustietoja</p>
      <p>TODO laita joku otsikko kuva</p>
      <p>TODO laita värit tyylikkäästi</p>
      <p>TODO asettele hyvin kaikki paikoilleen </p>
    </div>
  );
}


export default Book;
