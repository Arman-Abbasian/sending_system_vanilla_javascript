import SendingAPI from "./SendingAPI.mjs";
import Formview from "./Formview.mjs";
import FilterView from "./FilterView.mjs";
const sendingsDataContainer=document.querySelector("#sendings_data_container");


 class ProductsView {
  //به عنوان ورودی به کانستراکتور ی تگ پدر می دی 
    constructor() {
    this.filteredItems=[];
    this.filteredSendingItems();
    this.updateSendingList();
      //این جا به(روت)دسترسی نداریم به همین خاطر به عنوان ورودی پاسش میدیم
      //کلا به هر مقداری (استیتی) که در هر ماژول دسترسی نداریم به عنوان ورودی به اون کلاس پاس می دیم تا در ماژول مربوطه مقدارش رو بهش بدیم
      //make the static appearance of the sheet
      }

   //تا قبل از این جا به محض ساخته شدن یک نمونه از این کلاس به طور خودکار اجرا می شود(چون داخل کانستراکتور است) 
 //! -------------------------------------------- 
 //method for creating one list item
    _creatListItemHTML(id, customerName, productName, numberOfSending, dateOfSending){
      return `
      <div class="sendingItemBox grid grid-cols-3 gap-2 text-[9px] sm:text-xs md:text-sm shadow-xl bg-gold px-1 py-4  w-full rounded-md cursor-pointer" data-sending="${id}">
          <div class="flex flex-col md:flex-row md:justify-evenly justify-center items-center gap-3">
            <p class="flex justify-center items-center">${customerName}</p>
            <p class="flex justify-center items-center">${productName}</p>
          </div>
          <div class="flex flex-col md:flex-row md:justify-evenly justify-center items-center gap-3">
            <p class="flex justify-center items-center">${numberOfSending}</p>
            <p class="flex justify-center items-center"> ${new Date(dateOfSending).getFullYear()}/${new Date(dateOfSending).getMonth()+1}/${new Date(dateOfSending).getDate()}</p>
          </div>

          <div class="flex flex-col md:flex-row md:justify-evenly justify-center items-center gap-3">
              <p class="editItem flex justify-center items-center" data-edit="${id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg></p>
              <p class="deleteItem flex justify-center items-center" data-trash="${id}"><svg xmlns="http://www.w3.org/2000/svg" class="flex justify-center items-center h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg></p>
          </div>
      </div>`
    }
    //method for filter main productList
    filteredSendingItems(){
      //1- get all sending products in DB
      const allsendingData=SendingAPI.getAllSending();
      //2-filter  all sending data based on filters 
      let filteredBycustomer= FilterView.allFilters.customer===""?allsendingData:allsendingData.filter(item=>item.customerName===FilterView.allFilters.customer);
      let filteredByYear= FilterView.allFilters.year===""?filteredBycustomer:filteredBycustomer.filter(item=>new Date(item.dateOfSending).getFullYear()=== parseInt(FilterView.allFilters.year));
      let filteredByMonth= FilterView.allFilters.month===""?filteredByYear:filteredByYear.filter(item=>new Date(item.dateOfSending).getMonth()+1===parseInt(FilterView.allFilters.month));
      let filteredByDay= FilterView.allFilters.day===""?filteredByMonth:filteredByMonth.filter(item=>new Date(item.dateOfSending).getDate()=== parseInt(FilterView.allFilters.day));
      let filteredByProduct=filteredByDay.filter(item=>item.productName.toLowerCase().includes(FilterView.allFilters.product.toLowerCase()));
      this.filteredItems=filteredByProduct;
      this.updateSendingList();
      console.log(this.filteredItems)
    };
  //! --------------------------------------------
    //input for this method is all sending data
    updateSendingList() {
      //get note list items area
      //  empty all the sending container sectio in website
      sendingsDataContainer.innerHTML = "";
      // put a empty container
      let sendingsDataList = "";
      console.log(this.filteredItems)
      //loop in all sending items and add them to noteList variable
      for (const sendingItem of this.filteredItems) {
        const { id, customerName, productName, numberOfSending, dateOfSending } = sendingItem;
        //method for creating one note item
        const oneProductRow = this._creatListItemHTML(id, customerName, productName, numberOfSending, dateOfSending);
        //add made item to the noteList variable
        sendingsDataList += oneProductRow;
      }
      // add notesList variable to the DOM
      sendingsDataContainer.innerHTML= sendingsDataList;
      this.addEventToProductItems()
    };
//! --------------------------------------------
    // this method add evenets to product items 
    addEventToProductItems(){
      const productsItemOnScreen= ([...document.querySelectorAll(".sendingItemBox")]);
      //1- add click event to <div class='sendingItemBox'...>
      productsItemOnScreen.forEach((sendingDataBox) => {
        sendingDataBox.addEventListener("click", () =>{
          //input for this method is id
          this.onSelectSendingData(sendingDataBox.dataset.sending);
          //this.filterSendingItem(this.filterOptions);
        }
        );
      });

      //2- add click event to <p class="sendingItem" ...> for edit product item(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer.querySelectorAll(".editItem").forEach((sendingData) => {
        sendingData.addEventListener("click", (e) =>{
          e.stopPropagation();
          this.onEditSendingData(sendingData.dataset.edit);
          //this.filterSendingItem(this.filterOptions);
          //this.initailsFiltersOptions(this.root,allSending)
        }
        );
      });
      //3- add click event to delete  the product item(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
      sendingsDataContainer.querySelectorAll(".deleteItem").forEach((noteItem) => {
        noteItem.addEventListener("click", (e) => {
            //چون پدرش هم دارای کلیک هست برای جلوگیری از اختلاط رویداد ها از این کد استفاده می کنیم
            e.preventDefault();
            e.stopPropagation();
            this.onDeleteSendingData(noteItem.dataset.trash);
            console.log(this.filterOptions);
            // this.checkWholeItemChanging(this.filterOptions);
            // console.log(this.filterOptions);
            // this.filterSendingItem(this.filterOptions);
            // console.log(this.filterOptions);
            // this.afterEventsFiltersOptions(this.root,this.filterOptions);
            // console.log(this.filterOptions);
            
          });
        });
      }
   //! --------------------------------------------
    //for changing  the value of selected note item
    //the input for the mothod is data of selected item
      updateActiveSendingItem(sendingItem) {
      //  remove 'notes__list-item--selected' from all note items
      document.querySelectorAll(".sendingItemBox").forEach((item) => {
        item.classList.remove("bg-lime-400");
      });
       //add 'notes__list-item--selected' to the selected note item
      document.querySelector(`.sendingItemBox[data-sending="${sendingItem.id}"]`).classList.add("bg-lime-400");
    }
//! --------------------------------------------
    showFixedPart(selectedBoxId){
        const box=`<div>
        <p class="p-10 bg-lightGreen rounded-md text-base relative">you sent <span class="text-blue-800">${selectedBoxId.numberOfSending}</span> numbers of <span class="text-blue-800">${selectedBoxId.productName}</span> for <span class="text-blue-800">${selectedBoxId.customerName}</span> in date <span class="text-blue-800">${new Date (selectedBoxId.dateOfSending).getFullYear()}/${new Date (selectedBoxId.dateOfSending).getMonth()+1}/${new Date (selectedBoxId.dateOfSending).getDate()}<span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="closeBox w-6 h-6 absolute right-0 top-0 text-red-600 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </p>
      </div>`
      const boxx=document.querySelector("#box");
      boxx.classList.remove("hidden")
      boxx.classList.add("flex")
      boxx.innerHTML=box;
      let closeBoxx=document.querySelector(".closeBox");
      closeBoxx.addEventListener("click",()=>this.closeBox())  
    };

    //! --------------------------------------------
      //input for this method is the id for selected sending item
      onSelectSendingData(sendingItemId){
        console.log(sendingItemId)
        Formview.id=sendingItemId
        const selectedSendingItem = this.filteredItems.find((item) => item.id == sendingItemId);
        console.log(selectedSendingItem)
        this.showFixedPart(selectedSendingItem)
        //input for this method is data for clicked sending item
      };

//! --------------------------------------------

    onEditSendingData(sendingItemId) {
        const selectedSendingItem = this.filteredItems.find((item) => item.id == sendingItemId);
         Formview.fillInputs(selectedSendingItem)
        //input for this method is data for clicked sending item
        this.updateActiveSendingItem(selectedSendingItem);
      };

      //! --------------------------------------------
      onDeleteSendingData(sendingItemId){
        SendingAPI.deleteSendingItem(sendingItemId);
        FilterView.fillFilterVariables();
        this.filteredSendingItems();   
      };

      //! --------------------------------------------

      closeBox(){
        document.querySelector("#box").classList.add("hidden");
        document.querySelector("#box").classList.remove("flex");
      }; 
   }
    export default new ProductsView();
