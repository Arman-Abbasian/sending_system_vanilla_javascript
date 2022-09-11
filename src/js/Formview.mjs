import FilterView from "./FilterView.mjs";
import ProductsView from "./ProductsView.mjs";
import SendingAPI from "./SendingAPI.mjs";

//get the needed elements(element that we want to add events to them and are in initeial load on website)
let addOneSendingItemBtn = document.querySelector("#addButton");
let customerName_input = document.querySelector("#customerName_input");
let productName_input = document.querySelector("#productName_input");
let numberOfSending_input = document.querySelector("#numberOfSending_input");
let dateOfSending_input = document.querySelector("#dateOfSending_input");
let customerNamePreview = document.querySelector(".customerName");
let productNamePreview = document.querySelector(".productName");
let numberOfSendingPreview = document.querySelector(".numberOfSending");
let dateOfSendingPreview = document.querySelector(".dateOfSending");
let formItemsInFormSection=document.querySelectorAll(".formm .input");
let priviewItemsInPreviewSection=document.querySelectorAll(".previewSection .preview")


 class FormView {
  //به عنوان ورودی به کانستراکتور ی تگ پدر می دی 
    constructor() {
      addOneSendingItemBtn.addEventListener("click",(e)=>this.addOneSendingItemBtn(e));
      customerName_input.addEventListener("change",(e)=>this.customerNameHandler(e.target.value));
      productName_input.addEventListener("change",(e)=>this.productNameHandler(e.target.value));
      numberOfSending_input.addEventListener("change",(e)=>this.numberOfSendingHandler(e.target.value));
      dateOfSending_input.addEventListener("change",(e)=>this.dateOfSendingcustomerNameHandler(e.target.value));
      this.sendingData={id:null,customerName:"",productName:"",numberOfSending:0,dateOfSending:""};

    }
      //add events to the choosed elements
      addOneSendingItemBtn(e){
        e.preventDefault();
        if(!customerName_input.value || !customerName_input.value || !productName_input.value || !dateOfSending_input.value) alert("please fill all inputs");
        //input for this methos is sending Item data object 
        this.fillSendigDataObject();
        SendingAPI.addOrEditSendingData(this.sendingData);
        ProductsView.filteredSendingItems();
        FilterView.fillFilterVariables();
        //empty all data in form section
        [...formItemsInFormSection].forEach(element => {
          element.value="";
       });
        //empty all data in preview  section
        [...priviewItemsInPreviewSection].forEach(element => {
          element.textContent="";
       });
       this.sendingData={id:null,customerName:"",productName:"",numberOfSending:0,dateOfSending:""};
      //  this.filterSendingItem(this.filterOptions);
      //  this.checkWholeItemChanging(this.filterOptions)
      //  this.afterEventsFiltersOptions(this.root);
      //  this.filterSendingItem(this.filterOptions);
      //   console.log(this.sendingDataa)
      };
     //چون این متد تغییراتی رو در ظاهر صفحه هم ایجاد می کنه باید همین جا تعریف بشه و نمی شه در ماژول(اپ) انجام بشه
    customerNameHandler(inputValue){
        this.sendingData.customerName= inputValue;
        customerNamePreview.textContent= inputValue;
    };
    productNameHandler(inputValue){
      this.sendingData.productName= inputValue;
      productNamePreview.textContent=inputValue
  } ;
    numberOfSendingHandler(inputValue){
    this.sendingData.numberOfSending= inputValue;
    numberOfSendingPreview.textContent=inputValue
  };
    dateOfSendingcustomerNameHandler(inputValue){
  this.sendingData.dateOfSending= inputValue;
  dateOfSendingPreview.textContent=`${new Date(inputValue).getFullYear()}/${new Date(inputValue).getMonth()+1}/${new Date(inputValue).getDate()}`
  };

  fillSendigDataObject(){
        this.sendingData.customerName=customerName_input.value;
        this.sendingData.productName=productName_input.value;
        this.sendingData.numberOfSending=numberOfSending_input.value;
        this.sendingData.dateOfSending=new Date(dateOfSending_input.value).toISOString();
  };
  fillInputs(selectedSendingItem){
    console.log(`${new Date(selectedSendingItem.dateOfSending).getFullYear()}/${new Date(selectedSendingItem.dateOfSending).getMonth()+1}/${new Date(selectedSendingItem.dateOfSending).getDate()}`);
    this.sendingData.id=selectedSendingItem.id;
    //fill inputs
    customerName_input.value =selectedSendingItem.customerName;
    productName_input.value=selectedSendingItem.productName;
    numberOfSending_input.value=selectedSendingItem.numberOfSending;
    const date= this.formateDate(selectedSendingItem.dateOfSending)
    console.log(date.toString())
    dateOfSending_input.value=date;
    console.log(dateOfSending_input.value)
    //fill prieview section
    customerNamePreview.textContent=selectedSendingItem.customerName;
    productNamePreview.textContent=selectedSendingItem.productName;
    numberOfSendingPreview.textContent=selectedSendingItem.numberOfSending;
    dateOfSendingPreview.textContent=`${new Date(selectedSendingItem.dateOfSending).getFullYear()}/${new Date(selectedSendingItem.dateOfSending).getMonth()+1}/${new Date(selectedSendingItem.dateOfSending).getDate()}`;


  };
  formateDate(date){
    let d = new Date(date);
        let month = '' + (d.getMonth() + 1).toString();
       let day = '' + d.getDate().toString();
       let year = d.getFullYear().toString();
    console.log(month.length)
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}
 

  }
    export default new FormView();
