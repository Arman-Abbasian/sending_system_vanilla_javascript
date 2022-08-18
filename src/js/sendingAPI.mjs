
  export default class SendingAPI {

    static getAllSending() {
     const sendingData=localStorage.getItem("sendingData") ?JSON.parse(localStorage.getItem("sendingData")):[];
     return sendingData;
    }
  //خلاصه متد زیر => کل دیتابیس رو می کشی بیرون بعد تغییرات رو روی دیتا ها انجام می دی سپس مجددا میذاریش تو دیبابیس همه رو
    static addOrEditSendingData(sendingItemToSave) {
      // get ALl sending data
      const sendingData = SendingAPI.getAllSending();
      //check if the sending item previously existed or not
      const existedSendigItem = sendingData.find((n) => n.id == sendingItemToSave.id);
      //if the sending item existed
      if (existedSendigItem) {
        existedSendigItem.customerName = sendingItemToSave.customerName;
        existedSendigItem.productName = sendingItemToSave.productName;
        existedSendigItem.numberOfSending =sendingItemToSave.numberOfSending;
        existedSendigItem.dateOfSending =sendingItemToSave.dateOfSending;
      } else {
        //if the sending item not existed
        sendingItemToSave.id = new Date().getTime();
        sendingData.push(sendingItemToSave);
      }
      //put all sending items again in DB
      localStorage.setItem("sendingData", JSON.stringify(sendingData));
    }
  
    static deleteNote(id) {
      //get all notes
      const notes = SendingAPI.getAllSending();
      //remove the choosed note
      const filteredNotes = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
      //put all notes again in DB
      localStorage.setItem("sendingData", JSON.stringify(sendingData));
    }
  }
  
  //به طور کلی در کار با دیتابیس این موارد به ترتیب تکرار می شود
  
  //1-گرفتن کل اطلاعات از دیتابیس
  //2-انجام دادن عملیات مورد نظر(حذف -تغییر-اضافه کردن-...)
  //3-فرستادن مجدد کل اطلاعات به دیتابیس
  