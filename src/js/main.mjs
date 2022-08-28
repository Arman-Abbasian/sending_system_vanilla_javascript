import App from "./App.mjs";

//get the father of all elements in html tags
const root = document.querySelector(".main");
const app  = new App(root,Swal)
Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  )