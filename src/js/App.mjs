import PageView from "./pageview.mjs";
import SendingAPI from "./sendingAPI.mjs";

export default class App {
  constructor(root) {
    //here we should put a variable for all data
    this.sendingData = [];
    this.activeSendingItem = null;
    this.view = new PageView(root, this._handlers());
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
        const sendingData={customerName:"",productName:"",numberOfSending:"",dateOfSending:""}
        SendingAPI.addOrEditSendingData(sendingItem);
       const {id, customerName, productName, numberOfSending, dateOfSending}=sendingItem
       sendingData.customerName=customerName;
       sendingData.productName=productName;
       sendingData.numberOfSending=numberOfSending;
       sendingData.dateOfSending=dateOfSending;
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
