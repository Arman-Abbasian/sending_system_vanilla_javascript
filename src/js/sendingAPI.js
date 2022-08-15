
  export default class SendingAPI {
    static getAllSending() {
     const sendingData=localStorage.getItem("sendingData") ?JSON.parse(localStorage.getItem("sendingData")):[];
     return sendingData;
    }
  
    static addOrEditSendingData(noteToSave) {
      // get ALl notes
      const sendingData = SendingAPI.getAllSending();
      //check if the note previously existed or not
      const existedNote = sendingData.find((n) => n.id == noteToSave.id);
      //if the note existed
      if (existedNote) {
        existedNote.customerName = noteToSave.title;
        existedNote.productName = noteToSave.body;
        existedNote.numberOfSending =noteToSave.toISOString();
      } else {
        //if the note notexisted
        noteToSave.id = new Date().getTime();
        sendingData.push(noteToSave);
      }
      //put all notes again in DB
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
  
  //به طور کلی در کار با دیتابیس این موارد به تریبت تکرار می شود
  
  //1-گرفتن کل اطلاعات از دیتابیس
  //2-انجام دادن عملیات مورد نظر(حذف -تغییر-اضافه کردن-...)
  //3-فرستادن مجدد کل اطلاعات به دیتابیس
  