// import App from "./App.mjs";
import FilterView from "./FilterView.mjs";
import FormView from "./Formview.mjs";
import ProductsView from "./ProductsView.mjs";

//get the father of all elements in html tags
document.querySelector("body").addEventListener("DOMContentLoaded",()=>{
    const root = document.querySelector(".main");
    console.log(root)
    FilterView.root=root;
    FormView.root=root;
    
})

