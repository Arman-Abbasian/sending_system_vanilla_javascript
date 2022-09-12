// import App from "./App.mjs";
import ProductsView from "./ProductsView.mjs";
import FormView from "./Formview.mjs";
import FilterView from "./FilterView.mjs";

const z=`<option class="o one">1</option>
<option class='two o'>2</option>
<option class="o three">3</option>`
document.querySelector(".test").innerHTML=z;

const options=document.querySelectorAll(".o");
[...options].forEach(item=>item.removeAttribute("selected"))
const findedOption=[...options].find(item=>item.className.includes("three"));
findedOption.setAttribute("selected",true)

console.log(findedOption)
