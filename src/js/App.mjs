import PageView from "./pageview.mjs";
import SendingAPI from "./sendingAPI.mjs";

export default class App {
  constructor(root) {
    //here we should put a variable for all data
    this.sendingData = [];
    this.activeSendingItem = null;
    const sendingDataa={customerName:"",productName:"",numberOfSending:"",dateOfSending:""}
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
       const {id, customerName, productName, numberOfSending, dateOfSending}=sendingItem
       this.view.sendingDataa.customerName=customerName;
       this.view.sendingDataa.productName=productName;
       this.view.sendingDataa.numberOfSending=numberOfSending;
       this.view.sendingDataa.dateOfSending=dateOfSending;
        this.view._creatListItemHTML(id, customerName, productName, numberOfSending, dateOfSending)
        this._refreshSendintItems();
      },
      //input for this method is the id for selected sending item
      onSelectSendingData: (sendingItemId) => {
        const selectedSendingItem = this.sendingData.find((n) => n.id == sendingItemId);
        //input for this method is clicked sending item
        this._setActiveSendingItem(selectedSendingItem);
      },
      onDeleteSendingData: (sendingItemId) => {
        NotesAPI.deleteNote(sendingItemId);
        this._refreshSendintItems();
      },
    };
  }
}
