import SendingAPI from "./sendingAPI.js";
console.log(SendingAPI.getAllSending())
const addButon=document.querySelector("#addButton");
addButon.addEventListener("click",()=>{
    SendingAPI.addOrEditSendingData({customerName:"vv",productName:"dd",numberOfSending:10000,dataOfSending:"12-25-13985"})

})