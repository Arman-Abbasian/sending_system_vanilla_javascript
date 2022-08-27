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
      onSelectSendingData: (sendingItemId) => {
        console.log(sendingItemId)
        const selectedSendingItem = this.allSendingData.find((n) => n.id == sendingItemId);
        console.log(selectedSendingItem)
        //input for this method is data for clicked sending item
        this._setActiveSendingItem(selectedSendingItem);
      },
      onSelectSendingDataBox: (sendingItemId) => {
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
      filterSendingItem:(filterOptions)=>{
        console.log(filterOptions)
        const filteredCustomer=this.allSendingData.filter(item=>item.customerName.includes(filterOptions.customerFilter));
        const filteredProduct=filteredCustomer.filter(item=>item.productName.includes(filterOptions.productFilter));
        const filteredYear=filteredProduct.filter(item=>(new Date(item.dateOfSending).getFullYear()).toString().includes(filterOptions.yearFilter));
        const filteredMonth=filteredYear.filter(item=>(new Date(item.dateOfSending).getMonth()+1).toString().includes(filterOptions.monthFilter));
        const filteredDay=filteredMonth.filter(item=>(new Date(item.dateOfSending).getFullYear()).toString().includes(filterOptions.dayFilter));
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
    };
  }
}
