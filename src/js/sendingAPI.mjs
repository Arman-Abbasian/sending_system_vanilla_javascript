import PageView from "./pageview.mjs";
//this class is about CRUD operation on DB
  export default class SendingAPI {
    constructor(Swal){
      this.Swal=Swal
    }
    //get all the data from DB () (READ)
    static getAllSending() {
     const sendingData=localStorage.getItem("sendingData") ?JSON.parse(localStorage.getItem("sendingData")):[];
     console.log(sendingData);
     sendingData.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.dateOfSending) - new Date(a.dateOfSending);
    });
     return sendingData;
    }
  //خلاصه متد زیر => کل دیتابیس رو می کشی بیرون بعد تغییرات رو روی دیتا ها انجام می دی سپس مجددا میذاریش تو دیبابیس همه رو
  //این تابع زمانی اجرا می شه که رو دکمه ی ثبت فرم کلیک می کنی (POST or PUT) 
  static addOrEditSendingData(sendingItemToSave) {
    console.log(sendingItemToSave)
      // get ALl sending data
      const sendingData = SendingAPI.getAllSending();
      console.log(sendingData)
      //check if the sending item previously existed or not
      const existedSendigItem = sendingData.find((n) => n.id == sendingItemToSave.id);
      //if the sending item existed
      if (existedSendigItem) {
        console.log("existed")
        existedSendigItem.customerName = sendingItemToSave.customerName;
        existedSendigItem.productName = sendingItemToSave.productName;
        existedSendigItem.numberOfSending =sendingItemToSave.numberOfSending;
        existedSendigItem.dateOfSending =sendingItemToSave.dateOfSending;
      } else {
        console.log("new")
        //if the sending item not existed
        sendingItemToSave.id = new Date().getTime();
        console.log(sendingItemToSave)
        sendingData.push(sendingItemToSave);
      }
      //put all sending items again in DB
      localStorage.setItem("sendingData", JSON.stringify(sendingData));
    }
    //this method is for delete one sending Item (DELETE)
    static deleteNote(id) {
      //get all notes
      const notes = SendingAPI.getAllSending();
      //remove the choosed note
      const filteredSendingItems = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
      //put all notes again in DB
      localStorage.setItem("sendingData", JSON.stringify(filteredSendingItems));
      Swal.fire('Any fool can use a computer')
    }
  }
  
  //به طور کلی در کار با دیتابیس این موارد به ترتیب تکرار می شود
  
  //1-گرفتن کل اطلاعات از دیتابیس
  //2-انجام دادن عملیات مورد نظر(حذف -تغییر-اضافه کردن-...)
  //3-فرستادن مجدد کل اطلاعات به دیتابیس
  