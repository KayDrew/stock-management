const navButton = document.querySelector("#nav");

const addSection= document.querySelector(".addSection");

const addButton= document.querySelector(".addStock");

const removeSection= document.querySelector(".removeStock");

const shipButton= document.querySelector(".itemShipped");

const product1Quantity= document.querySelector(".prod1Quantity");

const product2Quantity= document.querySelector(".prod2Quantity");


const product3Quantity= document.querySelector(".prod3Quantity");

const productPrice1= document.querySelector(".productPrice1");

const productPrice2= document.querySelector(".productPrice2");

const productPrice3= document.querySelector(".productPrice3");

let stockProduct1= document.querySelector(".prod1Quantity").getAttribute("value");

let product1Stock= Number(stockProduct1);

let stockProduct2= document.querySelector(".prod2Quantity").getAttribute("value");

let product2Stock= Number(stockProduct2);

let stockProduct3= document.querySelector(".prod3Quantity").getAttribute("value");

let product3Stock= Number(stockProduct3);

let product1Price=document.querySelector(".productPrice1").getAttribute("value");


let product2Price=document.querySelector(".productPrice2").getAttribute("value");

let product3Price=document.querySelector(".productPrice3").getAttribute("value");

let prod1Price= Number(product1Price);

let prod2Price= Number(product2Price);

let prod3Price= Number(product3Price);

let clientOrders={};

navButton.addEventListener("click",displayOptions);

addButton.addEventListener("click", addStock);

 shipButton.addEventListener("click", removeStock)
 
 
function displayOptions(){
    
    if(this.value==="Remove Stock"){
        
        this.style.background="green";
        
        this.value="Add Stock";
        
        this.innerText="Add Stock"
        
        removeSection.style.display="block";
        
        addSection.style.display="none";
    }
    
    else{
        
      this.style.background="red";
      
        this.value="Remove Stock";
        
        addSection.style.display="block";
        
        removeSection.style.display="none";
        
        this.innerText="Remove Stock";
            
    }
}


//add new stock
function addStock(){
    
let productName= document.querySelector("#addProductCode").value; 
    
  
    let itemsReceived= document.querySelector("#itemsReceived").value;
    
 itemsReceived= Number(itemsReceived);
 
 let pricePerItem= document.querySelector("#pricePerItem").value;
  
  pricePerItem=Number(pricePerItem);
  
  if(itemsReceived && pricePerItem && itemsReceived>0 && pricePerItem>0){
      
      
      if(productName==="productName1"){
         
        product1Stock+=itemsReceived;        
        
        product1Quantity.innerText=product1Stock;
        
        prod1Price= avgPricePerItem(prod1Price,pricePerItem);
        
           
   productPrice1.innerText= prod1Price;                        
       
      
  }else if(productName==="productName2"){
     
     product2Stock+=itemsReceived;
     
          product2Quantity.innerText=product2Stock;
          
              prod2Price= avgPricePerItem(prod2Price,pricePerItem);
              
      productPrice2.innerText= prod2Price;        
          
  } else{
  	
      product3Stock+=itemsReceived;
      
    product3Quantity.innerText=product3Stock;
    
    prod3Price= avgPricePerItem(prod3Price,pricePerItem);
    
    productPrice3.innerText= prod3Price; 
          
  }
  
  }
  
  else{
      
      alert("Please, enter an amount above zero for both stock and price");
      
  }

}


//remove stock after purchase 
function removeStock(){
    
    let buyerEmail= document.querySelector("#buyerEmail").value;
    
    
    if(buyerEmail && buyerEmail.length>3){
        
   
 //check if customer has purchased  products before
 if(clientOrders.hasOwnProperty(buyerEmail)){
     
     alert("Sorry, you can only make one purchase.");
     
 }else{
    
    let productName= document.querySelector("#removeProductCode").value; 
    
  
    let itemsBought= document.querySelector("#itemsBought").value;
 
   
  if(itemsBought && itemsBought>0){
      
      itemsBought= Number(itemsBought);
      
      if(productName==="productName1"){
          
          //check if the amount to ship does not exceed stock on hand  
          if(product1Stock && product1Stock>0 && itemsBought<= product1Stock){
         
        product1Stock-=itemsBought;
         
    product1Quantity.innerText=product1Stock;
      
     //record customer email    
     clientOrders[buyerEmail]=productName;
     
        } else{
          
          alert("Not enough stock on hand");
      }
      
  }else if(productName==="productName2"){
      
      if(product2Stock && product2Stock>0 && itemsBought<= product2Stock){
    
     product2Stock-=itemsBought;
     product2Quantity.innerText=product2Stock;
     
     //record customer email    
     clientOrders[buyerEmail]=productName;
       
   } else{
       
       alert("Not enough stock on hand");
   }
      
  } else{
      
      if(product3Stock && product3Stock>0 && itemsBought<= product3Stock){
      
      product3Stock-=itemsBought;
      
    product3Quantity.innerText=product3Stock;
    
    //record customer email    
     clientOrders[buyerEmail]=productName;
   
   } else{
       
       alert("Not enough stock on hand");
      
   }
      
  }
  
  }
  
  else{
      
      alert("Please, enter an amount above zero");
      
  }
  
  }
  
}else{
    
    alert("Please,  enter a valid buyer email.");
    
}


}

//calculate average price per item
function avgPricePerItem(oldPrice,itemPrice){
  
  let newPrice=(oldPrice+itemPrice)/2;
  
  return newPrice; 
    
}

