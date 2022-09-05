// import PageView from "./Formview.mjs";
// import SendingAPI from "./SendingAPI.mjs";

//  class App {
//   constructor(root) {
//     //here we should put a variable for all data
//     this.root=root;
//     this.allSendingData = [];
//     this.activeSendingItem = null;
//     this.sendingDataa={id:null,customerName:"",productName:"",numberOfSending:"",dateOfSending:""};
//     this.filterOptions={customerFilter:"",productFilter:"",yearFilter:"",monthFilter:"",dayFilter:""}
//     //این جا اونی رو که مقدار داره مقدار می دیم اونی رو که این جا هم به مقدارش دسترسی نداریم رو در ورودی کلاس (اپ) بهش روردی میدیم
//     PageView.root=this.root;
//     PageView.sendingDataa=this.sendingDataa;
//     PageView.filterOptions=this.filterOptions;
//     PageView.


//     //this method get all the sending item from DB and show all in html file
//     this._refreshSendingItems();
//     console.log(this.allSendingData);
//   }

//   _refreshSendingItems() {
//     //get all sending data from DB
//     const sendingItems =SendingAPI.getAllSending();
//     // set Notes :(show notes on DOM)
//     //input for this method are all sedingItems
//     this._setSendingData(sendingItems);
//   }
// //input for this method is selected sendig item
//   _setActiveSendingItem(sendingItem) {
//     this.activeSendingItem = sendingItem;
//     console.log(sendingItem)
//      PageView.updateActiveSendingItem(sendingItem);
//   }

//   //input for this method is all sendingItems
//   _setSendingData(sendingItems) {
//     //fill the empty Array with sendingItems
//     this.allSendingData = sendingItems;
//     //give the sendingItems as argument to updateNoteList method in PageView class
//     PageView.updateSendingList(sendingItems);
//   };

//    udatingFilters(root,parentTag,filterObjectProperty){
//        const options=root.querySelector(parentTag);
//         const ArrayOfOptions = [];    
//       for (let i = 0; i < options.options.length; i++) {
//         ArrayOfOptions.push( options.options[i].value)
//       };
//      const finde= ArrayOfOptions.find(item=>item==filterObjectProperty);
//      console.log(finde);
//      if (finde===undefined) {filterObjectProperty='5';console.log(filterObjectProperty)};
//     };

//   _handlers() {
//     console.log(this.allSendingData)
//     return {
//         onAddSendingData: (sendingItem) => {
//         SendingAPI.addOrEditSendingData(sendingItem);
//        PageView.sendingDataa.customerName="";
//        PageView.sendingDataa.productName="";
//        PageView.sendingDataa.numberOfSending="";
//        PageView.sendingDataa.dateOfSending="";
//        PageView.sendingDataa.id=null;
//        console.log(sendingItem)
//         this._refreshSendingItems();
//       },
      
//     };
//   }
// }
// export default new App();
