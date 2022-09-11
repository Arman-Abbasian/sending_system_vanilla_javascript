import ProductsView from "./ProductsView.mjs";
import SendingAPI from "./SendingAPI.mjs";

//choose the element that we want to add events to them and exist in initial loads

//customer select
const customerSelectedInput=document.querySelector("#customerSelectedInput");
//product input
const productInput=document.querySelector("#productWrittenInput");
//year select
const yearSelectedInput=document.querySelector("#yearSelectedInput");
//month select
const monthSelectedInput=document.querySelector("#monthSelectedInput");
//day select
const daySelectedInput=document.querySelector("#daySelectedInput");
//button that when click on it, filter section is showed
const showFilterSectionButton=document.querySelector("#showFilterSectionButton");
//section that show the filters option in that
const hideFilterSection=document.querySelector("#hideFilterSection");
//filter section
const filtersSection=document.querySelector("#filtersSection");


    class FilterView{
        constructor(root){
        this.root=root;
        this.cutomerOptions=[];
        this.yearOptions=[];
        this.monthOptions=[];
        this.dayOptions=[];
        this.allFilters={customer:"",product:"",year:"",month:"",day:""};
        this.fillFilterVariables();
        //add events to the element that exist in initial load

        //1-event for hiding and showing filter section
        showFilterSectionButton.addEventListener("click",()=>this.showFilterSection());
        hideFilterSection.addEventListener("click",()=>this.hideFilterSection());

        //2-event for filtering (events in this section : 1-change 2-input)
        customerSelectedInput.addEventListener("change",(e)=>this.customerFilterHandler(e.target.value));
        productInput.addEventListener("input",(e)=>this.productFilterHandler(e.target.value));
        yearSelectedInput.addEventListener("change",(e)=>this.yearFilterHandler(e.target.value));
        monthSelectedInput.addEventListener("change",(e)=>this.monthFilterHandler(e.target.value));
        daySelectedInput.addEventListener("change",(e)=>this.dayFilterHandler(e.target.value));      
        };
        //show filter section
        showFilterSection(){
          filtersSection.classList.remove("hidden");
          filtersSection.classList.add("flex");
          showFilterSectionButton.classList.add("hidden");
          showFilterSectionButton.classList.remove("flex");
        };
        //hide filter section
        hideFilterSection(){
          filtersSection.classList.add("hidden");
          filtersSection.classList.remove("flex");
          showFilterSectionButton.classList.remove("hidden");
          showFilterSectionButton.classList.add("flex");
        };
        //this method trigger when make a 'change' event on customer select input
        customerFilterHandler(value){
          this.allFilters.customer=value;
          ProductsView.filteredSendingItems();
          console.log(this.allFilters)
        }
        //this method trigger when make a 'input' event on product input
        productFilterHandler(value){
          this.allFilters.product=value;
          ProductsView.filteredSendingItems();
          console.log(this.allFilters)
        }
        //this method trigger when make a 'change' event on product select input
        yearFilterHandler(value){
          this.allFilters.year=value;
          ProductsView.filteredSendingItems();
          console.log(this.allFilters)
        }
        //this method trigger when make a 'change' event on product select input
        monthFilterHandler(value){
          this.allFilters.month=value;
          ProductsView.filteredSendingItems();
          console.log(this.allFilters)
        }
        //this method trigger when make a 'change' event on product select input
        dayFilterHandler(value){
          this.allFilters.day=value;
          ProductsView.filteredSendingItems();
          console.log(this.allFilters)
        }
        //fill input selected tag based on the data in DB
        fillFilterVariables(){
          //get updated data
         const allInitialDataInDB= SendingAPI.getAllSending();
         console.log(allInitialDataInDB);
         //empty the container options to make a new options
         this.cutomerOptions=[];
         this.yearOptions=[];
         this.monthOptions=[];
         this.yearOptions=[];

         //make an array of unique customer Array
         //1-delete duplicate customer
         allInitialDataInDB.forEach((element) => {
       if (!this.cutomerOptions.includes(element.customerName)) {
        //2- push the unique data in this.customerOptions
           this.cutomerOptions.push(element.customerName);
       }
         });
         console.log(this.cutomerOptions);
          //3-make the customers options variable in ascending order
          this.cutomerOptions.sort((a,b)=>a-b);
         //-4-check if selected customer in customer selection input exist in (this.allFilters);(update the this.allFIlterOprions variable)
         const findChoosedCustomerOption= this.cutomerOptions.find(item=>item===this.allFilters.customer);
         if (!findChoosedCustomerOption) {
            this.allFilters.customer=''
         }  
          //5- make the option in customer options section
        
          let makecustomerOptions=`<option value=''>All</option>`
          this.cutomerOptions.forEach(item=>{
            makecustomerOptions+= `<option  value="${item}">${item}</option>`;
            customerSelectedInput.innerHTML=makecustomerOptions;
          });
         

         //make an array of unique year Array
         //1-delete duplicate year
         allInitialDataInDB.forEach((item) => {
          if (!this.yearOptions.includes(new Date(item.dateOfSending).getFullYear())) {
           //2- push the unique data in customer options
              this.yearOptions.push(new Date(item.dateOfSending).getFullYear());
          }
            });
            console.log(this.yearOptions);
            //3-make the year in descendng order
            this.yearOptions.sort((a,b)=>b-a);
            //4- check if selected year in year selection input exist in (this.allFilters);(update the this.allFIlterOprions variable)
         const findChoosedYearOption= this.yearOptions.find(item=>item===this.allFilters.year);
         if (!findChoosedYearOption) {
            this.allFilters.year=''
         } 
            //5- make the option in year options section
            let makeYearOptions='<option value="">All</option>';
            this.yearOptions.forEach(item=>{
            makeYearOptions+= `<option value=${item}>${item}</option>`;
            yearSelectedInput.innerHTML=makeYearOptions;
         })


          //make an array of unique year Array
         //1-delete duplicate day
         allInitialDataInDB.forEach((item) => {
          if (!this.monthOptions.includes(new Date(item.dateOfSending).getMonth()+1)) {
           //2- push the unique data in customer options
              this.monthOptions.push(new Date(item.dateOfSending).getMonth()+1);
          }
            });
            //3-make the month in ascending order
            this.monthOptions.sort((a,b)=>a-b)
            console.log(this.monthOptions);

             //4- check if selected year in year selection input exist in (this.allFilters);(update the this.allFIlterOprions variable)
            const findChoosedMonthOption= this.monthOptions.find(item=>item===this.allFilters.month);
         if (!findChoosedMonthOption) {
            this.allFilters.month=''
         } 
            //5- make the option in month options section
            let makeMonthOptions='<option value="">All</option>';
            this.monthOptions.forEach(item=>{
              makeMonthOptions+= `<option value=${item}>${item}</option>`;
              monthSelectedInput.innerHTML=makeMonthOptions;
           })
            

          //make an array of unique day Array
         //1-delete duplicate customer
         allInitialDataInDB.forEach((item) => {
          if (!this.dayOptions.includes(new Date(item.dateOfSending).getDate())) {
           //2- push the unique data in customer options
              this.dayOptions.push(new Date(item.dateOfSending).getDate());
              //3-make the day in ascending order
              this.dayOptions.sort((a,b)=>a-b)
          }
            });
            console.log(this.dayOptions);
             //4- check if selected year in year selection input exist in (this.allFilters);(update the this.allFIlterOprions variable)
            const findChoosedDayOption= this.dayOptions.find(item=>item===this.allFilters.day);
         if (!findChoosedDayOption) {
            this.allFilters.day=''
         } 
            //5-make the option in month options section
            let makeDayOptions='<option value="">All</option>';
            this.dayOptions.forEach(item=>{
              makeDayOptions+= `<option value=${item}>${item}</option>`;
              daySelectedInput.innerHTML=makeDayOptions;
           })
      
      };


      afterEventsFiltersOptions(root,filterOptions){
        //add option to selectedCustomerInput
        console.log(filterOptions)
        const customerList=this.allSendingData.map(item=>{
          return(item.customerName)
        });
        let uniquecustomerList = [];
        //delete duplicate customer
        customerList.forEach((element) => {
      if (!uniquecustomerList.includes(element)) {
          uniquecustomerList.push(element);
      }
        });
        let customersSelect=`<option value="">All</option>`;
        uniquecustomerList.forEach(element => {
          console.log(element)
          //add option to selectedCustomerInput
          if (filterOptions.customerFilter===element) {
            customersSelect+=
            `<option selected=${true} value="${element}">${element}</option>`
          }else{
          customersSelect+=
           `<option value="${element}">${element}</option>`
          }
        });
        root.querySelector("#customerSelectedInput").innerHTML=customersSelect;
      
  
  
         //add option for year filter section
         const yearList=this.allSendingData.map(item=>{
          return(new Date(item.dateOfSending).getFullYear())
        });
        console.log(yearList)
        let uniqueYearList = [];
        //delete duplicate year
        yearList.forEach((element) => {
      if (!uniqueYearList.includes(element)) {
          uniqueYearList.push(element);
      }
        });
        console.log(uniqueYearList)
        //sort month ascending
        uniqueYearList.sort((a,b)=>b-a)
         let yearContainer='<option value="">All</option>';
         uniqueYearList.forEach(item=>{
           yearContainer+= `<option value=${item}>${item}</option>`
         })
         root.querySelector("#yearSelectedInput").innerHTML=yearContainer
  
  
        //add option for month filter section
        const monthList=this.allSendingData.map(item=>{
          return(new Date(item.dateOfSending).getMonth()+1)
        });
        console.log(monthList)
        let uniqueMonthList = [];
        //delete duplicate month
        monthList.forEach((element) => {
      if (!uniqueMonthList.includes(element)) {
          uniqueMonthList.push(element);
      }
        });
        //sort month ascending
        uniqueMonthList.sort((a,b)=>a-b)
        let monthContainer='<option value="">All</option>';
        uniqueMonthList.forEach(item=>{
          monthContainer+= `<option value=${item}>${item}</option>`
        })
        root.querySelector("#monthSelectedInput").innerHTML=monthContainer
  
        //add option for day filter section
        const dayList=this.allSendingData.map(item=>{
          return(new Date(item.dateOfSending).getDate())
        });
        console.log(dayList)
        let uniqueDayList = [];
        //delete duplicate day
        dayList.forEach((element) => {
      if (!uniqueDayList.includes(element)) {
          uniqueDayList.push(element);
      }
        });
        console.log(uniqueDayList)
        //sort day ascending
        uniqueDayList.sort((a,b)=>a-b)
        let dayContainer='<option value="">All</option>';
        uniqueDayList.forEach(item=>{
          dayContainer+= `<option value=${item}>${item}</option>`
        })
        root.querySelector("#daySelectedInput").innerHTML=dayContainer
      };



      //برای این که با هر فیلتر بقیه فیلتر های قبلی از بین نرن محبوریم با هر تغییر روی هر فیلتر بقیه فیلتر ها رو مجددا چک کنیم
      filterSendingItem(filterOptions){
        console.log(filterOptions)
        let filteredCustomer=null;
        this.filterOptions.customerFilter==="" ?  filteredCustomer=this.allSendingData : filteredCustomer=this.allSendingData.filter(item=>item.customerName===(this.filterOptions.customerFilter));
         console.log(filteredCustomer) 

        const filteredProduct=filteredCustomer.filter(item=>(item.productName.toLowerCase()).includes(this.filterOptions.productFilter.toLowerCase()));
        console.log(filteredProduct);

        let filteredYear=null;
        this.filterOptions.yearFilter==="" ? filteredYear=filteredProduct : filteredYear=filteredProduct.filter(item=>(new Date(item.dateOfSending).getFullYear()).toString()==(this.filterOptions.yearFilter));
        console.log(filteredYear);

        let filteredMonth=null;
        this.filterOptions.monthFilter==="" ? filteredMonth=filteredYear : filteredMonth=filteredYear.filter(item=>(new Date(item.dateOfSending).getMonth()+1).toString()==(this.filterOptions.monthFilter));
        console.log(filteredMonth);

        let filteredDay=null;
        this.filterOptions.dayFilter==="" ? filteredDay=filteredMonth : filteredDay=filteredMonth.filter(item=>(new Date(item.dateOfSending).getDate()).toString()==(this.filterOptions.dayFilter));
        console.log(filteredDay)

        PageView.updateSendingList(filteredDay)
      };

      checkWholeItemChanging(filterOptions){
        this.allSendingData;
        console.log(this.allSendingData)
        //update the sending filters for customer when delete customer 
        const customerptions=this.root.querySelector("#customerSelectedInput");
        console.log(customerptions.options.length)
        const ArrayOfCustomerOptions = [];    
        for (let i = 0; i < customerptions.options.length; i++) {
          ArrayOfCustomerOptions.push( customerptions.options[i].value)
        };
        console.log(ArrayOfCustomerOptions)
      const findedCustomer= ArrayOfCustomerOptions.find(item=>item==filterOptions.customerFilter);
      console.log(findedCustomer);
        if (findedCustomer===undefined) {filterOptions.customerFilter=''};

      //update the sending Items showed when delete day 
      const yearOptions=this.root.querySelector("#yearSelectedInput");
        const ArrayOfyearOptions = [];    
        for (let i = 0; i < yearOptions.options.length; i++) {
          ArrayOfyearOptions.push( yearOptions.options[i].value)
        };
      const findedYear= ArrayOfyearOptions.find(item=>item==filterOptions.yearFilter);
      console.log(findedYear);
        if (findedYear===undefined) {filterOptions.yearFilter=''};

        //update the sending Items showed when delete day 
      const monthOptions=this.root.querySelector("#monthSelectedInput");
      const ArrayOfmonthOptions = [];    
      for (let i = 0; i < monthOptions.options.length; i++) {
        ArrayOfmonthOptions.push( monthOptions.options[i].value)
      };
      console.log(ArrayOfmonthOptions)
    const findedMonth= ArrayOfmonthOptions.find(item=>item==filterOptions.monthFilter);
    console.log(findedMonth);
      if (findedMonth===undefined) {filterOptions.monthFilter=''};

      //update the sending Items showed when delete day 
      const dayOptions=this.root.querySelector("#daySelectedInput");
        const ArrayOfDayOptions = [];    
        for (let i = 0; i < dayOptions.options.length; i++) {
          ArrayOfDayOptions.push( dayOptions.options[i].value)
        };
      const findedDay= ArrayOfDayOptions.find(item=>item==filterOptions.dayFilter);
      console.log(findedDay);
        if (findedDay===undefined) {filterOptions.dayFilter=''};
    };    

};
export default new FilterView();