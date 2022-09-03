import SendingAPI from "./sendingAPI.mjs";

export default class PageView {
  //به عنوان ورودی به کانستراکتور ی تگ پدر می دی 
    constructor(root, handlers,sendingDataa,filterOptions) {
    const allSending=SendingAPI.getAllSending(); 
      //این جا به(روت)دسترسی نداریم به همین خاطر به عنوان ورودی پاسش میدیم
      //کلا به هر مقداری (استیتی) که در هر ماژول دسترسی نداریم به عنوان ورودی به اون کلاس پاس می دیم تا در ماژول مربوطه مقدارش رو بهش بدیم
      //get the parent of all element in sheet
      this.root = root;
      //add events in sheet(all events that hanppen on element)
      const { onAddSendingData,  onEditSendingData, onDeleteSendingData,onSelectData,
        initailsFiltersOptions,afterEventsFiltersOptions,checkWholeItemChanging, filterSendingItem, showFilterSection, hideFilterSection, closeBox} = handlers;
      this.onAddSendingData = onAddSendingData;
      this.onEditSendingData = onEditSendingData;
      this.onDeleteSendingData = onDeleteSendingData;
      this.onSelectData=onSelectData;
      this.initailsFiltersOptions=initailsFiltersOptions;
      this.afterEventsFiltersOptions=afterEventsFiltersOptions;
      this.checkWholeItemChanging=checkWholeItemChanging;
      this.filterSendingItem=filterSendingItem;
      this.showFilterSection=showFilterSection;
      this.hideFilterSection=hideFilterSection;
      this.closeBox=closeBox;

      this.sendingDataa=sendingDataa;
      this.filterOptions=filterOptions;
      console.log(filterOptions);
      //make the static appearance of the sheet
      this.root.innerHTML = `
      <div id="box" class="fixed w-screen h-screen bg-opacity-60 right-0 top-0 bg-white z-50  justify-center items-center p-8 hidden"></div>
        <form class="formm flex flex-col gap-4">
            <div class="w-full gap-8 flex justify-between items-center">
                <label class="w-1/2 "><p class="flex justify-center items-center p-2 bg-lightGray text-white rounded-md">customer Name</p></label>
                <input id="customerName_input" type="text" name="customerName" required class="p-2 input w-1/2 border-2 border-lightGreen rounded-md focus:outline-none focus:border-darkGreen">
            </div>
            <div class="w-full gap-8 flex justify-between items-center">
                <label class="w-1/2"><p class="flex justify-center items-center p-2 bg-lightGray text-white rounded-md">product Name</p></label>
                <input id="productName_input" type="text" name="productName" required class="p-2 input w-1/2 border-2 border-lightGreen rounded-md focus:outline-none focus:border-darkGreen" />
            </div>
            <div class="w-full gap-8 flex justify-between items-center">
                <label class="w-1/2"><p class="flex justify-center items-center p-2 bg-lightGray text-white rounded-md">number of sending</p></label>
                <input id="numberOfSending_input" type="number" name="numberOfSending" required class="p-2 input w-1/2 border-2 border-lightGreen rounded-md focus:outline-none focus:border-darkGreen" />
            </div>
            <div class="w-full gap-8 flex justify-between items-center">
                <label class="w-1/2"><p class="flex justify-center items-center p-2 bg-lightGray text-white rounded-md w-full">date of sending</p></label>
                <input id="dateOfSending_input" class="p-2 input w-1/2 border-2 required border-lightGreen rounded-md focus:outline-none focus:border-darkGreen" type="date" name="dateOfSending">
            </div>
            <button id="addButton" class="p-2 bg-lightGreen rounded-md mb-3 hover:bg-darkGreen hover:text-white">Add</button>
        </form>
        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-3">

          <div class="previeww flex flex-col gap-4 p-4 bg-lightGreen rounded-md mb-6">
            <div class="flex justify-between items-center bg-darkGray text-white p-2 rounded-md"><p>customer name :</p><p class="preview customerName"></p></div>
            <div class="flex justify-between items-center bg-darkGray text-white p-2 rounded-md"><p>product Name :</p><p class="preview productName"></p></div>
            <div class="flex justify-between items-center bg-darkGray text-white p-2 rounded-md"><p>number of sending :</p><p class="preview numberOfSending"></p></div>
            <div class="flex justify-between items-center bg-darkGray text-white p-2 rounded-md"><p>date of sending :</p><p class="preview dateOfSending"></p></div>
          </div>
          
        
        <div>
          <div class="showFilterSection flex justify-center items-center bg-darkGreen drop-shadow-md rounded-sm p-2 font-bold cursor-pointer transition-all duration-1000 hover:bg-lightGreen"><p>show Filter section</p></div>
          <div class="filtersSection hidden flex-col justify-between gap-4 shadow-md shadow-slate-800 bg-lightGreen p-2 rounded-md">
          <div class="hideFilterSection flex justify-center items-center bg-red-700 drop-shadow-md rounded-sm p-2 font-bold cursor-pointer transition duration-1000 hover:bg-red-500"><p>hide Filter section</p></div>
            <div class="filterCustomerProductSection flex justify-between md:justify-start gap-2 items-center w-full">
              <div class="flex justify-center items-center gap-2">
                <label class="font-bold">customer:</label>
                <select id="customerSelectedInput" class="bg-darkGreen rounded-sm drop-shadow-md  focus:outline-none"></select>
              </div>
              <div class="flex justify-center items-center gap-1">
                <label class="font-bold">product:</label> 
                <input type="text" id="productWrittenInput" class="w-full px-1 bg-darkGreen rounded-sm drop-shadow-md  focus:outline-none" />
              </div>
            </div>
            <div class="filterDateSection flex justify-between items-center md:gap-2">
              <div class="flex justify-center items-center gap-1">
                <label class="font-bold">year:</label>
                <select id="yearSelectedInput" class="bg-darkGreen rounded-sm drop-shadow-md  focus:outline-none"></select>
              </div>
              <div class="flex justify-center items-center gap-1">
                <label class="font-bold">month:</label>
                <select id="monthSelectedInput" class="bg-darkGreen rounded-sm drop-shadow-md  focus:outline-none"></select>
              </div>
              <div class="flex justify-center items-center gap-1">
                <label class="font-bold">day:</label>
                <select id="daySelectedInput" class="bg-darkGreen rounded-sm drop-shadow-md  focus:outline-none"></select>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div id="sendings_data_container" class="flex flex-col gap-2 mt-4"></div>
    </div>
      `;
      //get the needed elements(element that we want to add events to them and are in initeial load on website)
      let addOneSendingItemBtn = this.root.querySelector("#addButton");
      let customerName_input = this.root.querySelector("#customerName_input");
      let productName_input = this.root.querySelector("#productName_input");
      let numberOfSending_input = this.root.querySelector("#numberOfSending_input");
      let dateOfSending_input = this.root.querySelector("#dateOfSending_input");
      let customerName = this.root.querySelector(".customerName");
      let productName = this.root.querySelector(".productName");
      let numberOfSending = this.root.querySelector(".numberOfSending");
      let dateOfSending = this.root.querySelector(".dateOfSending");
      let showFilterSectionn=this.root.querySelector(".showFilterSection");
      let hideFilterSectionn=this.root.querySelector(".hideFilterSection");

      //in this part we say which function doing when some events is triggered on elements(this section is place for using handlers)
      

      //click on show filter button
      showFilterSectionn.addEventListener("click",(e)=>showFilterSection(e));
      hideFilterSectionn.addEventListener("click",(e)=>hideFilterSection(e));

      //add events to the choosed elements
      addOneSendingItemBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(this.sendingDataa)
        //input for this methos is sendig Item data object 
        this.onAddSendingData(this.sendingDataa);
        //empty all data in form section
        ([...this.root.querySelectorAll(".input")]).forEach(element => {
          element.value="";
       });
        //empty all data in previeww  section
        ([...this.root.querySelectorAll(".preview")]).forEach(element => {
          element.textContent="";
       });
       this.filterSendingItem(this.filterOptions);
       this.checkWholeItemChanging(this.filterOptions)
       this.afterEventsFiltersOptions(this.root);
       this.filterSendingItem(this.filterOptions);
        console.log(this.sendingDataa)
      });
     //چون این متد تغییراتی رو در ظاهر صفحه هم ایجاد می کنه باید همین جا تعریف بشه و نمی شه در ماژول(اپ) انجام بشه
      customerName_input.addEventListener("change",(e)=>{
        this.sendingDataa.customerName= e.target.value;
        customerName.textContent=e.target.value
      });
      productName_input.addEventListener("change",(e)=>{
        console.log(e.target.value)
        this.sendingDataa.productName= e.target.value;
        productName.textContent=e.target.value
      });
      numberOfSending_input.addEventListener("change",(e)=>{
        this.sendingDataa.numberOfSending= e.target.value;
        numberOfSending.textContent=e.target.value
      });
      dateOfSending_input.addEventListener("change",(e)=>{
        const datee=e.target.value;
        console.log(datee)
        console.log(new Date (datee).getMonth()+1)
        this.sendingDataa.dateOfSending= new Date (e.target.value).toISOString();
        dateOfSending.textContent=`${new Date(datee).getFullYear()}/${new Date(datee).getMonth()+1}/${new Date(datee).getDate()}`
      });

      this.initailsFiltersOptions(this.root,allSending);

      customerSelectedInput.addEventListener("change",(e)=>{
        this.filterOptions.customerFilter=e.target.value;
        console.log(this.filterOptions)
        this.filterSendingItem(this.filterOptions)
      });
      console.log(productWrittenInput);
      productWrittenInput.addEventListener("input",(e)=>{
        this.filterOptions.productFilter=e.target.value;
        console.log(this.filterOptions)
        this.filterSendingItem(this.filterOptions)
      });
      yearSelectedInput.addEventListener("change",(e)=>{
        this.filterOptions.yearFilter=e.target.value;
        console.log(this.filterOptions)
        this.filterSendingItem(this.filterOptions) 
      });
      monthSelectedInput.addEventListener("change",(e)=>{
        this.filterOptions.monthFilter=e.target.value;
        console.log(this.filterOptions)
        this.filterSendingItem(this.filterOptions)
      });
      daySelectedInput.addEventListener("change",(e)=>{
        this.filterOptions.dayFilter=e.target.value;
        console.log(this.filterOptions)
        this.filterSendingItem(this.filterOptions)
      });

      }


  //تا قبل از این جا به محض ساخته شدن یک نمونه از این کلاس به طور خودکار اجرا می شود(چون داخل کانستراکتور است) 
  
  //method for creating one list item
    _creatListItemHTML(id, customerName, productName, numberOfSending, dateOfSending){
      console.log(dateOfSending)
      return `
      <div class="sendingItemBox grid grid-cols-3 gap-2 text-[9px] sm:text-xs md:text-sm shadow-xl bg-gold px-1 py-4  w-full rounded-md cursor-pointer" data-sending-id="${id}">
          <div class="flex flex-col md:flex-row md:justify-evenly justify-center items-center gap-3">
            <p class="flex justify-center items-center">${customerName}</p>
            <p class="flex justify-center items-center">${productName}</p>
          </div>
          <div class="flex flex-col md:flex-row md:justify-evenly justify-center items-center gap-3">
            <p class="flex justify-center items-center">${numberOfSending}</p>
            <p class="flex justify-center items-center"> ${new Date(dateOfSending).getFullYear()}/${new Date(dateOfSending).getMonth()+1}/${new Date(dateOfSending).getDate()}</p>
          </div>

          <div class="flex flex-col md:flex-row md:justify-evenly justify-center items-center gap-3">
              <p class="sendingItem flex justify-center items-center" data-sending-id="${id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg></p>
              <p class="notes__list-trash flex justify-center items-center" data-trash="${id}"><svg xmlns="http://www.w3.org/2000/svg" class="flex justify-center items-center h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg></p>
          </div>
      </div>`
    }
  
    //input for this method is all sending data
    updateSendingList(sendingsData) {
      const sendingsDataContainer = this.root.querySelector("#sendings_data_container");
      //get note list items area
      //  empty all the sending container sectio in website
      sendingsDataContainer.innerHTML = "";
      // put a empty container
      let sendingsDataList = "";
      //loop in all sending items and add them to noteList variable
      for (const sendingData of sendingsData) {
        const { id, customerName, productName, numberOfSending, dateOfSending } = sendingData;
        console.log(new Date(dateOfSending).toDateString())
        //method for creating one note item
        const html = this._creatListItemHTML(id, customerName, productName, numberOfSending, dateOfSending);
        //add made item to the noteList variable
        sendingsDataList += html;
      }
      // add notesList variable to the DOM
      sendingsDataContainer.innerHTML= sendingsDataList;


      


      sendingsDataContainer.querySelectorAll(".sendingItemBox").forEach((sendingDataBox) => {
        sendingDataBox.addEventListener("click", () =>{
          //input for this method is id
          this.onSelectData(sendingDataBox.dataset.sendingId);
          this.filterSendingItem(this.filterOptions);
        }
        );
      });

      //add click event for select to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer.querySelectorAll(".sendingItem").forEach((sendingData) => {
        sendingData.addEventListener("click", (e) =>{
          //input for this method is id
          e.stopPropagation();
          this.onEditSendingData(sendingData.dataset.sendingId);
          this.filterSendingItem(this.filterOptions);
          this.initailsFiltersOptions(this.root,allSending)
        }
        );
      });
      //add click event for delete to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer
        .querySelectorAll(".notes__list-trash")
        .forEach((noteItem) => {
          noteItem.addEventListener("click", (e) => {
            //چون پدرش هم دارای کلیک هست برای جلوگیری از اختلاط رویداد ها از این کد استفاده می کنیم
            e.preventDefault();
            e.stopPropagation();
            this.onDeleteSendingData(noteItem.dataset.trash);
            console.log(this.filterOptions);
            this.checkWholeItemChanging(this.filterOptions);
            console.log(this.filterOptions);
            this.filterSendingItem(this.filterOptions);
            console.log(this.filterOptions);
            this.afterEventsFiltersOptions(this.root,this.filterOptions);
            console.log(this.filterOptions);
            
          });
        });
    };


    //for changing  the value of selected note item
    //the input for the mothod is data of selected item
      updateActiveSendingItem(sendingItem) {
      console.log(sendingItem.dateOfSending)
      console.log(new Date (sendingItem.dateOfSending).getFullYear()+"/"+new Date (sendingItem.dateOfSending).getDate()+"/"+new Date (sendingItem.dateOfSending).getDay())
      this.root.querySelector("#customerName_input").value = sendingItem.customerName;
      this.root.querySelector("#productName_input").value = sendingItem.productName;
      this.root.querySelector("#numberOfSending_input").value = sendingItem.numberOfSending;
      this.root.querySelector("#dateOfSending_input").value = `${new Date (sendingItem.dateOfSending).getFullYear()}/${new Date (sendingItem.dateOfSending).getMonth()+1}/${new Date (sendingItem.dateOfSending).getDate()}`
      this.root.querySelector(".customerName").textContent=sendingItem.customerName;
      this.root.querySelector(".productName").textContent = sendingItem.productName;
      this.root.querySelector(".numberOfSending").textContent = sendingItem.numberOfSending;
      this.root.querySelector(".dateOfSending").textContent =`${new Date (sendingItem.dateOfSending).getFullYear()}/${new Date (sendingItem.dateOfSending).getMonth()+1}/${new Date (sendingItem.dateOfSending).getDate()}`;
      this.sendingDataa.id=sendingItem.id;
      this.sendingDataa.customerName=sendingItem.customerName;
      this.sendingDataa.productName=sendingItem.productName;
      this.sendingDataa.numberOfSending=sendingItem.numberOfSending;
      this.sendingDataa.dateOfSending=sendingItem.dateOfSending;
      console.log(this.sendingDataa)
      //  remove 'notes__list-item--selected' from all note items
      this.root.querySelectorAll(".sendingItem").forEach((item) => {
        console.log(item.parentElement.parentElement)
        item.parentElement.parentElement.classList.remove("bg-lime-400");
      });
       //add 'notes__list-item--selected' to the selected note item
      this.root.querySelector(`.sendingItem[data-sending-id="${sendingItem.id}"]`)
      .parentElement.parentElement
       .classList.add("bg-lime-400");
    }

    showFixedPart(selectedBoxId){
        console.log(selectedBoxId);
        const box=`<div>
        <p class="p-10 bg-lightGreen rounded-md text-base relative">you sent <span class="text-blue-800">${selectedBoxId.numberOfSending}</span> numbers of <span class="text-blue-800">${selectedBoxId.productName}</span> for <span class="text-blue-800">${selectedBoxId.customerName}</span> in date <span class="text-blue-800">${new Date (selectedBoxId.dateOfSending).getFullYear()}/${new Date (selectedBoxId.dateOfSending).getMonth()+1}/${new Date (selectedBoxId.dateOfSending).getDate()}<span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="closeBox w-6 h-6 absolute right-0 top-0 text-red-600 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </p>
      </div>`
      console.log(box)
      const boxx=this.root.querySelector("#box");
      boxx.classList.remove("hidden")
      boxx.classList.add("flex")
      boxx.innerHTML=box;
      let closeBoxx=this.root.querySelector(".closeBox");
      closeBoxx.addEventListener("click",()=>this.closeBox())  
    }

    
    }
