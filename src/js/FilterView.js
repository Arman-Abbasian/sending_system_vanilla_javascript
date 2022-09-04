class FilterView{
constructor(){
this.cutomerFilter=[];
this.yearFilter=[];
this.monthFilter=[];
this.dayFilter=[];

}

      //make the filer option for each filter(customer,year,month,year) in initial loading
      initailsFiltersOptions(root,allSendingItems){
        //add option to selectedCustomerInput at initaial load
        const customerList=allSendingItems.map(item=>{
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
          //add option to selectedCustomerInput
          customersSelect+=
           `<option value="${element}">${element}</option>`
        });
        root.querySelector("#customerSelectedInput").innerHTML=customersSelect;
  
  
  
         //add option for year filter section
         const yearList=allSendingItems.map(item=>{
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
        const monthList=allSendingItems.map(item=>{
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
        const dayList=allSendingItems.map(item=>{
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

      showFilterSection(e){
        (PageView.root.querySelector(".showFilterSection").classList.add("hidden"));
        console.log(PageView.root.querySelector(".filtersSection"));
        (PageView.root.querySelector(".filtersSection").classList.remove("hidden"));
        (PageView.root.querySelector(".filtersSection").classList.add("flex"));
        console.log(PageView.root.querySelector(".filtersSection"));
      };

      hideFilterSection(e){
        (PageView.root.querySelector(".filtersSection").classList.remove("flex"));
        (PageView.root.querySelector(".filtersSection").classList.add("hidden"));
        (PageView.root.querySelector(".showFilterSection").classList.add("flex"));
        (PageView.root.querySelector(".showFilterSection").classList.remove("hidden"));
        console.log(PageView.root.querySelector(".filtersSection"));
      };

}