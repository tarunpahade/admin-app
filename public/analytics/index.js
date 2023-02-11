document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')
  

  
  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  
  // }
  })
const lala=[]
  const baseUrl='/bill'

async function getinfo() {
    const res = await fetch(baseUrl,
      {
        method:'GET',
        }
  
      )
    
  
      const data=await res.json()
  
      lala.push(data)
      // document.querySelector('#preloader').style.display='none'
  
      return data
      }
      getinfo().then((x)=>{
      const top=  document.querySelector('#top')
        topProducts(x,top)
      })

// shows top selling products
// function topProducts(data){
//     const both=[]
//     const foodItems=[]
//     const quantity=[]
//     ///mapping data
//     data.map((x)=>{
    
//       x.orderedFood.map((y)=>{
//         both.push({'name':y.id,'quantity':y.items});
    
//         foodItems.push(y.id)
//     quantity.push(y.items)
    
//       })
//     })
    
    
    
    
//     const count=[]
    
//     const total=[]
//     function maap(y){
//       y.map((z)=>{
    
//       const x=both.filter((o)=>o.name===z)
  
//     total.push(x[0])
    
//     let result = x.map(a => a.quantity)
  
//     const add=result.reduce(function(acc, val) { return acc + val; }, 0)
    
//     count.push(add)
//     })}
    
//     const map = foodItems.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    
//     const foodid=[...map.keys()];
    
    
//     function aa(){
//       maap(foodid)
     
//     }
//     aa()
//     //product wise sales
  
//   const totl=[] 
  
  
//     for (let index = 0; index < count.length; index++) {
//      totl.push({'name':foodid[index],'quantity':count[index]});
      
//     }
  
//     const foodlist=[]
//     const count2=[]
//     // console.log(totl)
//   totl.sort( function ( a, b ) { return b.quantity - a.quantity; } )
//   console.log(totl);
//   totl.forEach((c)=>{
//    foodlist.push(c.name)
//    count2.push(c.quantity)
//   })
  
//     const orders=document.querySelector('.orders')
//     orders.innerHTML=``
//     for (let index = 0; index < foodid.length; index++) {
  
//       const flex=document.createElement('div')
//       flex.classList.add('media')
//       const cardbody=document.createElement('div')
//       cardbody.classList.add('card-body')
  
//     const food=document.createElement('h3')
//     food.innerHTML=foodlist[index]
  
//     const quantity=document.createElement('p')
//   quantity.innerHTML=count2[index]
//     cardbody.append(food,quantity)
//     flex.append(cardbody)  
//     orders.append(flex)
//   }
     
//       }

      function topProducts(data,orders){

        console.log(data);
         const both=[]
         const foodItems=[]
         const quantity=[]
         const amt=[]
         ///mapping data
         data.map((x)=>{
         
           x.orderedFood.map((y)=>{
             both.push({'name':y.id,'quantity':y.items,'price':y.price});
         
             foodItems.push(y.id)
         quantity.push(y.items)
         amt.push(y.price)
           })
         })
         
         
         
         
         const count=[]
         
         const total=[]
         function maap(y){
           y.map((z)=>{
         
           const x=both.filter((o)=>o.name===z)
          
         total.push(x[0])
         
         let result = x.map(a => a.quantity)
       
         const add=result.reduce(function(acc, val) { return acc + val; }, 0)
         
         count.push(add)
         })}
         
         const map = foodItems.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
         
         const foodid=[...map.keys()];
         
         
         function aa(){
           maap(foodid)
          
         }
         aa()
         const totl=[] 
 
 
         for (let index = 0; index < count.length; index++) {
          totl.push({'name':foodid[index],'quantity':count[index],'price':amt[index]});
           
         }
       
         const foodlist=[]
         const count2=[]
        const price2=[]
   
       totl.sort( function ( a, b ) { return b.quantity - a.quantity; } )
   
       totl.forEach((c)=>{
        foodlist.push(c.name)
        count2.push(c.quantity)
 price2.push(c.price)
       })
       
        
       //  orders.innerHTML=``
         for (let index = 0; index < foodid.length; index++) {
       
     
 
       
 const name=document.createElement('a')
 name.innerHTML=`<small class="mt-0 mb-1 font-w500">${foodlist[index]}</small>`
 
 
          
       
       
         const quantity=document.createElement('td')
         quantity.setAttribute('class','my-0 text-secondary font-w600')
 quantity.innerHTML=`<h4>${count2[index]}</h4>`
 
 
 const amt=document.createElement('td')
         amt.setAttribute('class','my-0 text-secondary font-w600')
 const h4=document.createElement('h4')
         amt.innerHTML=`<h4>${price2[index]}</h4>`
 
   
       const tr=document.createElement('tr')
         tr.append(name,quantity,amt)
         orders.append(tr)
     
       }
       localStorage.setItem('data','')
           }