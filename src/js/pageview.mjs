export default class PageView {
  //به عنوان ورودی به کانستراکتور ی تگ پدر می دی و کلیه رویداد های ابتدایی رو
    constructor(root, handlers,sendingDataa) {
      //get the parent of all element in sheet
      this.root = root;
      //add events in sheet
      const { onAddSendingData,  onSelectSendingData, onDeleteSendingData } = handlers;
      this.onAddSendingData = onAddSendingData;
      this.onSelectSendingData = onSelectSendingData;
      this.onDeleteSendingData = onDeleteSendingData;
      this.sendingDataa=sendingDataa
      console.log(sendingDataa)
      //make the static appearance of the sheet
      this.root.innerHTML = `
        <form class="flex flex-col gap-4 p-2">
            <div class="w-full flex justify-between items-center">
                <label class="w-1/2">customer Name</label>
                <input id="customerName_input" type="text" name="customerName" class="w-1/2 border-2 border-cyan-500 rounded-md focus:outline-none focus:border-emerald-500" />
            </div>
            <div class="w-full flex justify-between items-center">
                <label class="w-1/2">product Name</label>
                <input id="productName_input" type="text" name="productName" class="w-1/2 border-2 border-cyan-500 rounded-md focus:outline-none focus:border-emerald-500" />
            </div>
            <div class="w-full flex justify-between items-center">
                <label class="w-1/2">number of sending</label>
                <input id="numberOfSending_input" type="number" name="numberOfSending" class="w-1/2 border-2 border-cyan-500 rounded-md focus:outline-none focus:border-emerald-500" />
            </div>
            <div class="w-full flex justify-between items-center">
                <label class="w-1/2">date of sending</label>
                <input id="dateOfSending_input" type="date" name="dateOfSending">
            </div>
            <button id="addButton" class="p-2 bg-green-500 rounded-md">Add</button>
        </form>
        <div class="flex flex-col gap-4 p-2 border-emerald-400 border-2 rounded-md">
            <div class="flex justify-center items-center gap-2"><p>customer name :</p><p class="customerName"></p></div>
            <div class="flex justify-center items-center gap-2"><p>product Name :</p><p class="productName"></p></div>
            <div class="flex justify-center items-center gap-2"><p>number of sending :</p><p class="numberOfSending"></p></div>
            <div class="flex justify-center items-center gap-2"><p>date of sending :</p><p class="dateOfSending"></p></div>
        </div>
        <div id="sendings_data"></div>
    </div>
      `;
      //get the needed elements(element that we want to add events to them)
      let addOneSendingItemBtn = this.root.querySelector("#addButton");
      let customerName_input = this.root.querySelector("#customerName_input");
      let productName_input = this.root.querySelector("#productName_input");
      let numberOfSending_input = this.root.querySelector("#numberOfSending_input");
      let dateOfSending_input = this.root.querySelector("#dateOfSending_input");
      let customerName = this.root.querySelector(".customerName");
      let productName = this.root.querySelector(".productName");
      let numberOfSending = this.root.querySelector(".numberOfSending");
      let dateOfSending = this.root.querySelector(".dateOfSending");
  
      //add events to the choosed elements
      addOneSendingItemBtn.addEventListener("click", (e) => {
        // run add note method !!
        e.preventDefault();
        this.onAddSendingData(sendingDataa);
        sendingDataa.customerName="";sendingDataa.productName="";sendingDataa.numberOfSending="";sendingDataa.dateOfSending="";
        customerName_input.value=""; productName_input.value=""; numberOfSending_input.value=""; dateOfSending_input.value="";
        customerName.textContent=""; productName.textContent=""; numberOfSending.textContent=""; dateOfSending.textContent="";
      });
      customerName_input.addEventListener("change",(e)=>{
        sendingDataa.customerName= e.target.value;
        customerName.textContent=e.target.value
      });
      productName_input.addEventListener("change",(e)=>{
        sendingDataa.productName= e.target.value;
        productName.textContent=e.target.value
      });
      numberOfSending_input.addEventListener("change",(e)=>{
        sendingDataa.numberOfSending= e.target.value;
        numberOfSending.textContent=e.target.value
      });
      dateOfSending_input.addEventListener("change",(e)=>{
        console.log(new Date (e.target.value).toISOString())
        sendingDataa.dateOfSending= new Date (e.target.value).toISOString();
        dateOfSending.textContent=e.target.value
      });
      }

  //تا قبل از این جا به محض ساخته شدن یک نمونه از این کلاس به طور خودکار اجرا می شود(چون داخل کانستراکتور است) 
  
  //method for creating one list item
    _creatListItemHTML(id, customerName, productName, numberOfSending, dataOfSending){
      console.log(dataOfSending)
      const MAX_CUSTOMERNAME_LENGTH = 20;
      const MAX_PRODUCTNAME_LENGTH = 20;
      return `
      <div class="sendingItem flex justify-between items-center shadow-xl bg-blue-400 text-xs p-2 w-full" data-sending-id="${id}">
          <p> ${customerName.substring(0, MAX_CUSTOMERNAME_LENGTH)}${customerName.length > MAX_CUSTOMERNAME_LENGTH ? "..." : ""}</p>
          <p>${productName.substring(0, MAX_PRODUCTNAME_LENGTH)}${productName.length > MAX_PRODUCTNAME_LENGTH ? "..." : ""}</p>
          <p>${numberOfSending}</p>
          <p> ${new Date(dataOfSending).toLocaleString(undefined, {dateStyle: "full",timeStyle: "short",})}</p>
      </div>`
    }
  
    //input for this method is all sending data
    updateSendingList(sendingsData) {
      //get note list items area
      const sendingsDataContainer = this.root.querySelector("#sendings_data");
      //  empty all the notes in noteList
      sendingsDataContainer.innerHTML = "";
      // put a empty container
      let sendingsDataList = "";
      //loop in all notes and add them to noteList variable
      for (const sendingData of sendingsData) {
        const { id, customerName, productName, numberOfSending, dataOfSending } = sendingData;
        //method for creating one note item
        const html = this._creatListItemHTML(id, customerName, productName, numberOfSending, dataOfSending);
        //add made item to the noteList variable
        sendingsDataList += html;
      }
      // add notesList variable to the DOM
      sendingsDataContainer.innerHTML= sendingsDataList;
      //add click event for select to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer.querySelectorAll(".sendingItem").forEach((sendingData) => {
        sendingData.addEventListener("click", () =>{
          this.onSelectSendingData(sendingData.dataset.sendingId)
        }
        );
      });
      //add click event for delete to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer
        .querySelectorAll(".notes__list-trash")
        .forEach((noteItem) => {
          noteItem.addEventListener("click", (e) => {
            //چون پدرش هم دارای کلیک هست برای جلوگیری از اختلاط رویداد ها از این کد استفاده می کنیم
            e.stopPropagation();
            this.onDeleteSendingData(noteItem.dataset.noteId);
          });
        });
    };
    //for changing  the value of selected note item
    //the input for the mothod is data of selected item
    updateActiveSendingItem(sendingItem) {
      //const sendingData={customerName:"",productName:"",numberOfSending:"",dateOfSending:""}
      this.root.querySelector("#customerName_input").value = sendingItem.customerName;
      this.root.querySelector("#productName_input").value = sendingItem.productName;
      this.root.querySelector("#numberOfSending_input").value = sendingItem.numberOfSending;
      this.root.querySelector("#dateOfSending_input").value = sendingItem.dateOfSending;
      this.root.querySelector(".customerName").textContent=sendingItem.customerName;
      this.root.querySelector(".productName").textContent = sendingItem.productName;
      this.root.querySelector(".numberOfSending").textContent = sendingItem.numberOfSending;
      this.root.querySelector(".dateOfSending").textContent = sendingItem.dateOfSending;
      //  remove 'notes__list-item--selected' from all note items
      this.root.querySelectorAll(".sendingItem").forEach((item) => {
        item.classList.remove("bg-blue-700");
      });
       //add 'notes__list-item--selected' to the selected note item
      this.root.querySelector(`.sendingItem[data-sending-id="${sendingItem.id}"]`)
       .classList.add("bg-blue-700");
    }
    }
  