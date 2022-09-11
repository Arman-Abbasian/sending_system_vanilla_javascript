// import App from "./App.mjs";
import ProductsView from "./ProductsView.mjs";
import FormView from "./Formview.mjs";
import FilterView from "./FilterView.mjs";

const z=`<option>1</option>
<option class='two'>2</option>
<option>3</option>`
document.querySelector(".test").innerHTML=z;
document.querySelector(".test .two").setAttribute("selected",true);
