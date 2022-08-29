import PageView from "./pageview.mjs";
import SendingAPI from "./sendingAPI.mjs";

export default class App {
  constructor(root) {
    //here we should put a variable for all data
    this.allSendingData = [];
    this.activeSendingItem = null;
    const sendingDataa={id:null,customerName:"",productName:"",numberOfSending:"",dateOfSending:""};
    const filterOptions={customerFilter:"",productFilter:"",yearFilter:"",monthFilter:"",dayFilter:""}
    //این جا اونی رو که مقدار داره مقدار می دیم اونی رو که این جا هم به مقدارش دسترسی نداریم رو در ورودی کلاس (اپ) بهش روردی میدیم
    this.view = new PageView(root, this._handlers(),sendingDataa,filterOptions); 
    //this method get all the sending item from DB and show all in html file
    this._refreshSendingItems();
    console.log(this.allSendingData)
  }
  _refreshSendingItems() {
    //get all sending data from DB
    const sendingItems =SendingAPI.getAllSending();
    // set Notes :(show notes on DOM)
    //input for this method are all sedingItems
    this._setSendingData(sendingItems);
  }
//input for this method is selected sendig item
  _setActiveSendingItem(sendingItem) {
    this.activeSendingItem = sendingItem;
    console.log(sendingItem)
    this.view.updateActiveSendingItem(sendingItem);
  }

  //input for this method is all sendingItems
  _setSendingData(sendingItems) {
    //fill the empty Array with sendingItems
    this.allSendingData = sendingItems;
    //give the sendingItems as argument to updateNoteList method in PageView class
    this.view.updateSendingList(sendingItems);
  }

  _handlers() {
    return {
        onAddSendingData: (sendingItem) => {
        SendingAPI.addOrEditSendingData(sendingItem);
       this.view.sendingDataa.customerName="";
       this.view.sendingDataa.productName="";
       this.view.sendingDataa.numberOfSending="";
       this.view.sendingDataa.dateOfSending="";
       this.view.sendingDataa.id=null;
       console.log(sendingItem)
        this._refreshSendingItems();
      },
      //input for this method is the id for selected sending item
      onEditSendingData: (sendingItemId) => {
        console.log(sendingItemId)
        const selectedSendingItem = this.allSendingData.find((n) => n.id == sendingItemId);
        console.log(selectedSendingItem)
        //input for this method is data for clicked sending item
        this._setActiveSendingItem(selectedSendingItem);
      },
      onSelectData: (sendingItemId) => {
        console.log(sendingItemId)
        const selectedSendingItem = this.allSendingData.find((n) => n.id == sendingItemId);
        console.log(selectedSendingItem)
        this.view.showFixedPart(selectedSendingItem)
        //input for this method is data for clicked sending item
      },
      onDeleteSendingData: (sendingItemId) => {
        SendingAPI.deleteNote(sendingItemId);
        this._refreshSendingItems();
      },


       initailsFiltersOptions:(root,allSendingItems)=>{
        //add option to selectedCustomerInput
        
        const customerList=allSendingItems.map(item=>{
          return(item.customerName)
        });
        let uniquecustomerList = [];
        //delete duplicate customer
        customerList.forEach((element) => {
      if (!uniquecustomerList.includes(element)) {
          uniquecustomerList.push(element);
      }
        });
        let customersSelect=`<option value="">All</option>`;
        uniquecustomerList.forEach(element => {
          //add option to selectedCustomerInput
          customersSelect+=
           `<option value="${element}">${element}</option>`
        });
        customerSelectedInput.innerHTML=customersSelect;
  
  
  
         //add option for year filter section
         const yearList=allSendingItems.map(item=>{
          return(new Date(item.dateOfSending).getFullYear())
        });
        console.log(yearList)
        let uniqueYearList = [];
        //delete duplicate year
        yearList.forEach((element) => {
      if (!uniqueYearList.includes(element)) {
          uniqueYearList.push(element);
      }
        });
        console.log(uniqueYearList)
        //sort month ascending
        uniqueYearList.sort((a,b)=>b-a)
         let yearContainer='<option value="">All</option>';
         uniqueYearList.forEach(item=>{
           yearContainer+= `<option value=${item}>${item}</option>`
         })
         root.querySelector("#yearSelectedInput").innerHTML=yearContainer
  
  
        //add option for month filter section
        const monthList=allSendingItems.map(item=>{
          return(new Date(item.dateOfSending).getMonth()+1)
        });
        console.log(monthList)
        let uniqueMonthList = [];
        //delete duplicate month
        monthList.forEach((element) => {
      if (!uniqueMonthList.includes(element)) {
          uniqueMonthList.push(element);
      }
        });
        //sort month ascending
        uniqueMonthList.sort((a,b)=>a-b)
        let monthContainer='<option value="">All</option>';
        uniqueMonthList.forEach(item=>{
          monthContainer+= `<option value=${item}>${item}</option>`
        })
        root.querySelector("#monthSelectedInput").innerHTML=monthContainer
  
        //add option for day filter section
        const dayList=allSendingItems.map(item=>{
          return(new Date(item.dateOfSending).getDate())
        });
        console.log(dayList)
        let uniqueDayList = [];
        //delete duplicate day
        dayList.forEach((element) => {
      if (!uniqueDayList.includes(element)) {
          uniqueDayList.push(element);
      }
        });
        console.log(uniqueDayList)
        //sort day ascending
        uniqueDayList.sort((a,b)=>a-b)
        let dayContainer='<option value="">All</option>';
        uniqueDayList.forEach(item=>{
          dayContainer+= `<option value=${item}>${item}</option>`
        })
        root.querySelector("#daySelectedInput").innerHTML=dayContainer
      },
      filterSendingItem:(filterOptions)=>{
        console.log(this.allSendingData)
        const filteredCustomer=this.allSendingData.filter(item=>item.customerName.includes(filterOptions.customerFilter));
        console.log(filteredCustomer)
        const filteredProduct=filteredCustomer.filter(item=>(item.productName.toLowerCase()).includes(filterOptions.productFilter.toLowerCase()));
        console.log(filteredProduct)
        const filteredYear=filteredProduct.filter(item=>(new Date(item.dateOfSending).getFullYear()).toString().includes(filterOptions.yearFilter));
        console.log(filteredYear)
        const filteredMonth=filteredYear.filter(item=>(new Date(item.dateOfSending).getMonth()+1).toString().includes(filterOptions.monthFilter));
        console.log(filteredMonth)
        const filteredDay=filteredMonth.filter(item=>(new Date(item.dateOfSending).getDate()).toString().includes(filterOptions.dayFilter));
        console.log(filteredDay)
        this.view.updateSendingList(filteredDay)
      },
      productFilter:(selectedProduct)=>{
        const filteredProduct=this.allSendingData.filter(item=>item.productName.includes(selectedCustomer));
        this.view.updateSendingList(filteredProduct)
      },
      yearFilter:(selectedYear)=>{
        console.log(typeof (selectedYear))
        console.log(new Date(this.allSendingData[0].dateOfSending).getFullYear())
        const filteredYear=this.allSendingData.filter(item=>(new Date(item.dateOfSending).getFullYear()).toString().includes(selectedYear));
        console.log(filteredYear)
        this.view.updateSendingList(filteredYear)
      },
      monthFilter:(selectedMonth)=>{
        this.view.updateSendingList(filteredCustomer)
      },
      dayFilter:(selectedDay)=>{  
        this.view.updateSendingList(filteredCustomer)
      },
      showFilterSection:(e)=>{
        (this.view.root.querySelector(".showFilterSection").classList.add("hidden"));
        console.log(this.view.root.querySelector(".filtersSection"));
        (this.view.root.querySelector(".filtersSection").classList.remove("hidden"));
        (this.view.root.querySelector(".filtersSection").classList.add("flex"));
        console.log(this.view.root.querySelector(".filtersSection"));
      },
      hideFilterSection:(e)=>{
        (this.view.root.querySelector(".filtersSection").classList.remove("flex"));
        (this.view.root.querySelector(".filtersSection").classList.add("hidden"));
        (this.view.root.querySelector(".showFilterSection").classList.add("flex"));
        (this.view.root.querySelector(".showFilterSection").classList.remove("hidden"));
        console.log(this.view.root.querySelector(".filtersSection"));
      },
      closeBox:()=>{
        this.view.root.querySelector("#box").classList.add("hidden");
        this.view.root.querySelector("#box").classList.remove("flex");
      }
    };
  }
}
