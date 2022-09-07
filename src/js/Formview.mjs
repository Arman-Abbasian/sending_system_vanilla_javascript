import SendingAPI from "./SendingAPI.mjs";

//get the needed elements(element that we want to add events to them and are in initeial load on website)
let addOneSendingItemBtn = document.querySelector("#addButton");
let customerName_input = document.querySelector("#customerName_input");
let productName_input = document.querySelector("#productName_input");
let numberOfSending_input = document.querySelector("#numberOfSending_input");
let dateOfSending_input = document.querySelector("#dateOfSending_input");
let customerName = document.querySelector(".customerName");
let productName = document.querySelector(".productName");
let numberOfSending = document.querySelector(".numberOfSending");
let dateOfSending = document.querySelector(".dateOfSending");
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

      this.sendingData={customerName:"",productName:"",numberOfSending:0,dateOfSending:""}

    }
      //add events to the choosed elements
      addOneSendingItemBtn(e){
        e.preventDefault();
        if(!customerName_input.value || !customerName_input.value || !productName_input.value || !dateOfSending_input.value) alert("please fill all inputs");
        //input for this methos is sendig Item data object 
        this.fillSendigDataObject();
        //empty all data in form section
        [...formItemsInFormSection].forEach(element => {
          element.value="";
       });
        //empty all data in preview  section
        [...priviewItemsInPreviewSection].forEach(element => {
          element.textContent="";
       });
       SendingAPI.addOrEditSendingData(this.sendingData);
      //  this.filterSendingItem(this.filterOptions);
      //  this.checkWholeItemChanging(this.filterOptions)
      //  this.afterEventsFiltersOptions(this.root);
      //  this.filterSendingItem(this.filterOptions);
      //   console.log(this.sendingDataa)
      };
     //چون این متد تغییراتی رو در ظاهر صفحه هم ایجاد می کنه باید همین جا تعریف بشه و نمی شه در ماژول(اپ) انجام بشه
    customerNameHandler(inputValue){
        this.sendingData.customerName= inputValue;
        customerName.textContent= inputValue;
    };
    productNameHandler(inputValue){
      this.sendingData.customerName= inputValue;
      productName.textContent=inputValue
  } ;
    numberOfSendingHandler(inputValue){
    this.sendingData.customerName= inputValue;
    numberOfSending.textContent=inputValue
  };
    dateOfSendingcustomerNameHandler(inputValue){
  this.sendingData.customerName= inputValue;
  dateOfSending.textContent=`${new Date(inputValue).getFullYear()}/${new Date(inputValue).getMonth()+1}/${new Date(inputValue).getDate()}`
  };

  fillSendigDataObject(){
        this.sendingData.customerName=customerName_input.value;
        this.sendingData.productName=productName_input.value;
        this.sendingData.numberOfSending=numberOfSending_input.value;
        this.sendingData.dateOfSending=new Date (dateOfSending_input.value).toISOString();
  }


    }
    export default new FormView();
