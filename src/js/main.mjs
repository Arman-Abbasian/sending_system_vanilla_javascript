// import App from "./App.mjs";
import FilterView from "./FilterView.mjs";

//get the father of all elements in html tags
document.querySelector(".main").addEventListener("DOMContentLoaded",()=>{
    const root = document.querySelector(".main");
    console.log(root)
    FilterView.root=root;
    
})

