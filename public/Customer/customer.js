document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')
  

  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  })


const data=JSON.parse(localStorage.getItem('data'))
console.log(data);
//name
document.querySelector('#name').innerHTML=data[data.length-1].name
//contact details
document.querySelector('#number').innerHTML='Phone :'+data[data.length-1].number

//date
const date=data[data.length-1]
console.log(date);
const recent=document.querySelector('#recents')
products(date,recent)
function products(data,orders){
  console.log(data);
        const both=[]
        const foodItems=[]
        const quantity=[]
        const amt=[]
        ///mapping data
       
        
          data.orderedFood.map((y)=>{
            both.push({'name':y.id,'quantity':y.items,'price':y.price});
        
            foodItems.push(y.id)
        quantity.push(y.items)
        amt.push(y.price)
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
      
      const tr2=document.createElement('tr')
      const namehead=document.createElement('th')
namehead.innerHTML='<a>Name</a>'

const quantityhead=document.createElement('th')
quantityhead.innerHTML='<a> Quantity </a>'

const amthead=document.createElement('th')
amthead.innerHTML='<a> Amount </a>'
orders.append(tr2)
      //  orders.innerHTML=``
        for (let index = 0; index < foodid.length; index++) {
      

      
const name=document.createElement('a')
name.innerHTML=`${foodlist[index].replace(/([A-Z])/g, ' $1').trim()}`

         
      
      
  const quantity=document.createElement('td')
  //quantity.setAttribute('class','my-0 text-secondary font-w600')
   quantity.innerHTML=`<a>${count2[index]}</a>`


const amt=document.createElement('td')
       // amt.setAttribute('class','my-0 text-secondary font-w600')
const h4=document.createElement('h4')
        amt.innerHTML=`<a>${price2[index]}</a>`

  
      const tr=document.createElement('tr')
   
      tr.append(name,quantity,amt)
      tr2.append(namehead,quantityhead,amthead)
        orders.append(tr)
    
      }
}
document.querySelector('#lastVisited').innerHTML=date.date+' '+date.month+' '+date.year, date.hours

 

if(data[data.length-1].table==='onlineorder'){
  document.querySelector('#orderType').innerHTML='Oreder Type: Online Order' 
}else if(data[data.length-1].table==='takeaway'){
  document.querySelector('#orderType').innerHTML='Oreder Type: Take Away' 
}else{
  document.querySelector('#orderType').innerHTML='Oreder Type: Dine In' 
}

col2(data)
const orders=document.querySelector('#top')
console.log(data);
topProducts(data,orders)


//chart of the ordered food
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
name.innerHTML=`<small class="mt-0 mb-1 font-w500">${foodlist[index].replace(/([A-Z])/g, ' $1').trim()}</small>`


         
      
      
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




//column of  order type
          function col2(data){
            const table=[]
          const takeaway=[]
          const onlineOrder=[]
            data.map((c)=>{
              if( c.table==='1'||c.table==='2'||c.table==='3'||c.table==='4'||c.table==='5'||c.table==='6'||c.table==='7'||c.table==='8'||c.table==='9'){
                table.push(c)
              }
         else if(c.table==='takeaway'){
          takeaway.push(c)
         }
         else if(c.table==='onlineorder'){
          onlineOrder.push(c)
         }
      
            })
      const dinein=document.querySelector('#dinein')
      dinein.innerHTML=table.length
      
      const takeeaway=document.querySelector('#takeaway')
      takeeaway.innerHTML=takeaway.length
      
      const order=document.querySelector('#onlineorder')
      order.innerHTML=onlineOrder.length

      // const all= []
      // const number=[]
      // all.push('dinein','takeaway','onlineOrderS')
      // number.push(table.length,takeaway.length,onlineOrder.length)
      
      // const ada=document.querySelector('.progressbardinein')
      // ada.style.width=Math.floor( table.length*100/data.length)+'%'
      // const ada1=document.querySelector('.progressbartakeaway')
      // ada1.style.width=Math.floor(takeaway.length*100/data.length)+'%'
      // const ada2=document.querySelector('.progressbaronline')
      // ada2.style.width=Math.floor(onlineOrder.length*100/data.length)+'%'

      
      }

getinfo()
      async function getinfo() {
        const baseUrl='/send'
        const res = await fetch(baseUrl,
          {
            method:'GET',
            }
      
          )
        
      
          const data2=await res.json()
   const category=[]
   var a=0
        //  document.querySelector('#preloader').style.display='none'
          data.map((y)=>{
          
            //FOR TOP CATEGORIES
            y.orderedFood.map((o)=>{
        
          a++;
          
       const mappeddata=data2.filter((u)=>{ if( /\s/g.test(u.item)===true){

        return   u.item.replace(/ /g,'') === o.id
}else{
  return  u.item  ===o.id
              }
              
              
              })
         
category.push(mappeddata[0].category);
            })

          })
          const counts = [];
      category.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      
      const categoryname=Object.keys(counts)
    const categorycount=Object.values(counts)  
    
  createchart(categoryname,categorycount)  
  }

    function createchart(labels,data){
      new Chart(document.getElementById("polar-chart"), {
        type: 'bar',
        data: {
          labels:labels,
          datasets: [
            {
              label: "Favoraite Categories",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: data
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Favoraite Categories'
          }
        }
    });
    }