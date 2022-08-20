import PageView from "./pageview.mjs";
import SendingAPI from "./sendingAPI.mjs";

export default class App {
  constructor(root) {
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
    //  set Active Note :
    if (sendingItems.length > 0) {
      this._setActiveSendingItem(sendingItems[0]);
    }
  }

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
       const {id, customerName, productName, numberOfSending, dataOfSending}=sendingItem
        _creatListItemHTML(id, customerName, productName, numberOfSending, dataOfSending)
        this._refreshSendintItems();
      },
      onSelectSendingData: (sendingItemId) => {
        const selectedNote = this.notes.find((n) => n.id == sendingItemId);
        this._setActiveNote(selectedNote);
      },
      onDeleteSendingData: (sendingItemId) => {
        NotesAPI.deleteNote(sendingItemId);
        this._refreshSendintItems();
      },
    };
  }
}
