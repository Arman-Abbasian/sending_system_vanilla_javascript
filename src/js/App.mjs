import PageView from "./pageview.mjs";
import SendingAPI from "./sendingAPI.mjs";

export default class App {
  constructor(root) {
    //here we should put a variable for all data
    this.sendingData = [];
    this.activeSendingItem = null;
    const sendingDataa={id:null,customerName:"",productName:"",numberOfSending:"",dateOfSending:""}
    this.view = new PageView(root, this._handlers(),sendingDataa);
    console.log(sendingDataa)
    this._refreshSendintItems();
  }
  _refreshSendintItems() {
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
    this.sendingData = sendingItems;
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
        this._refreshSendintItems();
      },
      //input for this method is the id for selected sending item
      onSelectSendingData: (sendingItemId) => {
        console.log(sendingItemId)
        const selectedSendingItem = this.sendingData.find((n) => n.id == sendingItemId);
        console.log(selectedSendingItem)
        //input for this method is data for clicked sending item
        this._setActiveSendingItem(selectedSendingItem);
      },
      onDeleteSendingData: (sendingItemId) => {
        SendingAPI.deleteNote(sendingItemId);
        this._refreshSendintItems();
      },
    };
  }
}
