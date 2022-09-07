
//this class is about CRUD operation on DB
  export default class SendingAPI {
    
    //get all the data from DB () (READ)
    static getAllSending() {
     const sendingData=localStorage.getItem("sendingData") ?JSON.parse(localStorage.getItem("sendingData")):[];
     sendingData.sort(function(a,b){
     //make the data descending based on the date of sending
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
        sendingData.push(sendingItemToSave);
      }
      //put all sending items again in DB
      localStorage.setItem("sendingData", JSON.stringify(sendingData));
    }


    //this method is for delete one sending Item (DELETE)
    static deleteSendingItem(id) {
      //get all notes
      const notes = SendingAPI.getAllSending();
      //remove the choosed note
      const filteredSendingItems = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
      //put all notes again in DB
      localStorage.setItem("sendingData", JSON.stringify(filteredSendingItems));
    };


    //get the name of all customer (unique)
    static getAllCustomer(){
      const customersName=localStorage.getItem("customerName") ?JSON.parse(localStorage.getItem("customerName")):[];
     console.log(customersName);
     customersName.sort(function(a,b){
     //make the data descending based on the date of sending
      return a-b;
    });
     return customersName;
    };
    static getAllYear(){
      const year=localStorage.getItem("year") ?JSON.parse(localStorage.getItem("year")):[];
     console.log(year);
     year.sort(function(a,b){
     //make the data descending based on the date of sending
      return a-b;
    });
     return sendingData;
    };
    static getAllMonth(){
      const month=localStorage.getItem("month") ?JSON.parse(localStorage.getItem("month")):[];
     console.log(month);
     month.sort(function(a,b){
     //make the data descending based on the date of sending
      return a-b;
    });
     return sendingData;
    };
    static getAllDay(){
      const day=localStorage.getItem("day") ?JSON.parse(localStorage.getItem("day")):[];
     console.log(day);
     day.sort(function(a,b){
     //make the data descending based on the date of sending
      return a-b;
    });
     return sendingData;
    };
  }
  
  //به طور کلی در کار با دیتابیس این موارد به ترتیب تکرار می شود
  
  //1-گرفتن کل اطلاعات از دیتابیس
  //2-انجام دادن عملیات مورد نظر(حذف -تغییر-اضافه کردن-...)
  //3-فرستادن مجدد کل اطلاعات به دیتابیس
  
