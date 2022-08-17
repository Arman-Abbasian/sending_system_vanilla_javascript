export default class PageView {
  //به عنوان ورودی به کانستراکتور ی تگ پدر می دی و کلیه رویداد های ابتدایی رو
    constructor(root, handlers) {
      //get the parent of all element in sheet
      this.root = root;
      //add events in sheet
      const { onAddSendingData, onEditSendingData, onSelectSendingData, onDeleteSendingData } = handlers;
      this.onAddSendingData = onAddSendingData;
      this.onEditSendingData = onEditSendingData;
      this.onSelectSendingData = onSelectSendingData;
      this.onDeleteSendingData = onDeleteSendingData;
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
      const addOneSendingItemBtn = this.root.querySelector("#addButton");
      const customerName_input = this.root.querySelector("#customerName_input");
      const productName_input = this.root.querySelector("#productName_input");
      const numberOfSending_input = this.root.querySelector("#numberOfSending_input");
      const dateOfSending_input = this.root.querySelector("#dateOfSending_input");
      const customerName = this.root.querySelector(".customerName");
      const productName = this.root.querySelector(".productName");
      const numberOfSending = this.root.querySelector(".numberOfSending");
      const dateOfSending = this.root.querySelector(".dateOfSending");
  
      //add events to the choosed elements
      addOneSendingItemBtn.addEventListener("click", () => {
        // run add note method !!
        this.onAddSendingData();
      });
  
      [customerName_input, productName_input,numberOfSending_input,dateOfSending_input].forEach((inputField) => {
        inputField.addEventListener("change", (e) => {
          const newCustomerName = e.target.value.trim();
          const newProductName = e.target.value.trim();
          const newNumberOfSending = e.target.value.trim();
          const newDateOfSending = e.target.value.trim();
          this.onEditSendingData(newCustomerName, newProductName,newNumberOfSending,newDateOfSending);
        });
      });
    }
  //تا قبل از این جا به محض ساخته شدن یک نمونه از این کلاس به طور خودکار اجرا می شود(چون داخل کانستراکتور است) 
  
  //method for creating one list item
    _creatListItemHTML(id, customerName, productName, numberOfSending, dataOfSending) {
      const MAX_CUSTOMERNAME_LENGTH = 20;
      const MAX_PRODUCTNAME_LENGTH = 20;
      return `

        <div class="sendingItem flex justify-between items-center shadow-xl bg-blue-400 text-xs p-2 w-full" data-sending-id="${id}>
            <p> ${customerName.substring(0, MAX_CUSTOMERNAME_LENGTH)}${customerName.length > MAX_CUSTOMERNAME_LENGTH ? "..." : ""}</p>
            <p>${customerName.substring(0, MAX_PRODUCTNAME_LENGTH)}${productName.length > MAX_PRODUCTNAME_LENGTH ? "..." : ""}</p>
            <p>${numberOfSending}</p>
            <p> ${new Date(dataOfSending).toLocaleString(undefined, {dateStyle: "full",timeStyle: "short",})}</p>
        </div>
      `;
    }
  
    //
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
      sendingsDataContainer.innerHTML = sendingsDataList;
      // add click event for select to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer.querySelectorAll(".sendingItem").forEach((sendingData) => {
        sendingData.addEventListener("click", () =>
          this.onSelectSendingData(sendingData.dataset.sending-id)
        );
      });
      // add click event for delete to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer
        .querySelectorAll(".notes__list-trash")
        .forEach((noteItem) => {
          noteItem.addEventListener("click", (e) => {
            //چون پدرش هم دارای کلیک هست برای جلوگیری از اختلاط رویداد ها از این کد استفاده می کنیم
            e.stopPropagation();
            this.onNoteDelete(noteItem.dataset.noteId);
          });
        });
    }
    //for changing  the value of each note item
    updateActiveSendingItem(sendingItem) {
      this.root.querySelector("#customerName_input").value = sendingItem.customerName;
      this.root.querySelector("#productName_input").value = sendingItem.productName;
      this.root.querySelector("#numberOfSending_input").value = sendingItem.numberOfSending;

      //  remove 'notes__list-item--selected' from all note items
      this.root.querySelectorAll(".sendingItem").forEach((item) => {
        item.classList.remove("bg-blue-700");
      });
      //  add 'notes__list-item--selected' to the selected note item
      this.root.querySelector(`.sendingItem[data-sending-id="${selectedSendingItem.id}"]`)
        .classList.add("bg-blue-700");
    }
  }
  