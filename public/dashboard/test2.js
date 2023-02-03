document.querySelector('.menu-btn').addEventListener('click',()=>{

const side=document.querySelector('.haha')




side.classList.toggle('side')
side.classList.toggle('menu-sidebar')
side.classList.add('open')

// }
})






// https://stackoverflow.com/questions/1069666/sorting-object-property-by-values

const sale=document.querySelector('.grossprofit')
const customers=document.querySelector('.customers')
const orders=document.querySelector('.orders')
const datel=[]
const lala=[]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}
const date =new Date
const neewdate=date.getDate()
const day = String(date.getDate()).padStart(2, '0');

const year=date.getFullYear()
const month=date.getMonth()
const full=neewdate+'/'+month+'/'+year
// const appdata=JSON.parse(localStorage.getItem('kot')) || []
const baseUrl='http://localhost:5000/bill'

async function getinfo() {
  const res = await fetch(baseUrl,
    {
      method:'GET',
      }

    )
  

    const data=await res.json()

    lala.push(data)
    document.querySelector('#preloader').style.display='none'

    return data
    }


//quantity of food items ordered


   
    const time=[]
    function handler(e){
      console.log(lala[0]);
      const filterdate=lala[0].filter((y) => y.date ===  e.target.value.slice(-2)) 
    
      var month=getMonthName(e.target.value.slice(5,-3))
var yearo=e.target.value.slice(0,4)
console.log(yearo);
      console.log(month);
      //filtr month
      const monthFilter=filterdate.filter((y)=>y.month === month )



      const year=monthFilter.filter((y)=>y.year === yearo )
var hh;
hh=year
if(hh.length>0){
  

// const todaysdate=document.querySelector('.todaysdate').innerHTML='Date '+e.target.value.slice(-2)
// topProducts(hh)     

       createCard(hh)
       col2(hh)
       topProducts(hh)
       const hh1=lala[0].filter((y) => y.date ===  e.target.value.slice(-2)) 
       const quantity2=[]
              
       const amount=[]
     hh1.map((x)=>{
     const haha=[]
     
     x.orderedFood.map((y)=>{
     haha.push(y.price)
     })
     const sum=haha.reduce((partialSum, a) => partialSum + a, 0);    
     amount.push(sum)
     quantity2.push(x.hours)
     })
     const monthlyearning=document.querySelector('.monthlyearning')
     rearrangedData(quantity2,amount,monthlyearning)

}else{
 alert('No data')
}
      }  

getinfo().then(data=>{

  //from handler function filter all data date  and replacing gates with add dates
  // topProducts(data)     
  // saleaccdate(data,'date')
  const date=new Date
  const e =date.getDate()
  createCard(data)
  col2(data)
  saleForMonth()
  topProducts(data)
  categoryWiseSale(data)
})
// shows top selling products
function topProducts(data){
  const both=[]
  const foodItems=[]
  const quantity=[]
  ///mapping data
  data.map((x)=>{
  
    x.orderedFood.map((y)=>{
      both.push({'name':y.id,'quantity':y.items});
  
      foodItems.push(y.id)
  quantity.push(y.items)
  
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
  //product wise sales

const totl=[] 


  for (let index = 0; index < count.length; index++) {
   totl.push({'name':foodid[index],'quantity':count[index]});
    
  }

  const foodlist=[]
  const count2=[]
totl.sort( function ( a, b ) { return b.quantity - a.quantity; } )

totl.forEach((c)=>{
 foodlist.push(c.name)
 count2.push(c.quantity)
})

  const orders=document.querySelector('.orders')
  orders.innerHTML=``
  for (let index = 0; index < foodid.length; index++) {

    const flex=document.createElement('div')
    flex.classList.add('media')
    const cardbody=document.createElement('div')
    cardbody.classList.add('card-body')

  const food=document.createElement('h3')
  food.innerHTML=foodlist[index].replace(/([A-Z])/g, ' $1').trim()

  const quantity=document.createElement('p')
quantity.innerHTML=count2[index]
  cardbody.append(food,quantity)
  flex.append(cardbody)  
  orders.append(flex)
}
   
    }

//4cards (total sale , orders items sold tax)
function createCard(data){
const sale=[]
const length=[]
data.map((z)=>{
  const amt= z.orderedFood.map((y)=>y.price)
  const add=amt.reduce((a, b) => a + b, 0)
 sale.push(add)
length.push(amt.length)
})

const lengthoftotalfood=length.reduce((a, b) => a + b, 0)
const revenue=  sale.reduce((a, b) => a + b)
  document.querySelector('.grossprofit').innerHTML=`
  <h3> ${revenue}</h3>`
 
 //avg ticket size
 const totalcustomers=document.querySelector('.totalcustomers')
 totalcustomers.innerHTML=`<h3> ${data.length}</h3>`
 
 const tax=document.querySelector('.tax')
 tax.innerHTML=`
 <h3> ${Math.round(revenue*2.5/10)/10}</h3>`
 //tax collected

 const totalMenu=document.querySelector('.totalmenus')
 totalMenu.innerHTML=lengthoftotalfood
  }




//the type of order placed online dine in 
// order type
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
const dinein=document.querySelector('.dinein')
dinein.innerHTML=table.length

const takeeaway=document.querySelector('.takeaway')
takeeaway.innerHTML=takeaway.length

const order=document.querySelector('.onlineOrder')
order.innerHTML=onlineOrder.length
const all= []
const number=[]
all.push('dinein','takeaway','onlineOrderS')
number.push(table.length,takeaway.length,onlineOrder.length)

const ada=document.querySelector('.progressbardinein')
ada.style.width=Math.floor( table.length*100/data.length)+'%'
const ada1=document.querySelector('.progressbartakeaway')
ada1.style.width=Math.floor(takeaway.length*100/data.length)+'%'
const ada2=document.querySelector('.progressbaronline')
ada2.style.width=Math.floor(onlineOrder.length*100/data.length)+'%'
// const mychart=document.querySelector('.chart')
// mychart.innerHTML=''
// mychart.innerHTML=`<canvas id='chart'></canvas`
// const chart=document.querySelector('#chart')
// createChart(all,number,chart,'doughnut','type of sale')

}

//shows sales done in a month by clicking a botton
function saleForMonth(){

  
  const totalSales=[]
  const month=[]
 lala[0].map((x)=>{
 
 const sale=[]
 month.push(x.month)
 const amt= x.orderedFood.map((y)=>y.price)
 const add=amt.reduce((a, b) => a + b, 0)
 //sale.push(add)
 totalSales.push(add)
 
 
 })
 const monthlySale=document.querySelector('.monthlyearning')
 
  rearrangedData(month,totalSales,monthlySale)

}
//INPUT VISIBILITY
function lalao(){
  document.querySelector('#monthToDate').classList.toggle('active')
}
//TODAYS DATA
function today(date){

  const hh=lala[0].filter((y) => y.date ===  date) 
  if(hh.length===0){
    document.querySelector('.monthlyearning').innerHTML='No orders'
  }
  const quantity2=[]
         
  const amount=[]
hh.map((x)=>{
const haha=[]

x.orderedFood.map((y)=>{
haha.push(y.price)
})
const sum=haha.reduce((partialSum, a) => partialSum + a, 0);    
amount.push(sum)
quantity2.push(x.hours)
})
const monthlyearning=document.querySelector('.monthlyearning')
console.log(quantity2.length);

rearrangedData(quantity2,amount,monthlyearning)

if (quantity2.length===0) {
monthlyearning.innerHTML='No orders Today'
}
}

//changing month
function chang(){
 const e=document.querySelector('#monthToDate')
 var value = e.innerHTML;
var text = e.options[e.selectedIndex].text;
const search=lala[0].filter((u)=>u.month===text)
if(search.length===0){
  document.querySelector('.monthlyearning').innerHTML='No Data Available'
}
const totalSales=[]
const month=[]
search.map((x)=>{

const sale=[]
month.push(x.date)
const amt= x.orderedFood.map((y)=>y.price)
const add=amt.reduce((a, b) => a + b, 0)
//sale.push(add)
totalSales.push(add)

})
// document.querySelector('.chart').innerHTML=`
// <canvas id="myChart"></canvas>
// `
// const myChart=document.querySelector('#myChart')


//if there is a duplicate string add them
col2(search)
topProducts(search)
categoryWiseSale(search)
createCard(search)

const monthlyearning=document.querySelector('.monthlyearning')
rearrangedData(month,totalSales,monthlyearning)
}


//rearranges data and appends it in chart
// //pass in two array
function rearrangedData(quantity2,amount,location){
  const datt=[]
  for (let index = 0; index < quantity2.length; index++) {
      datt.push({'time':quantity2[index],'amount':amount[index]})
      
  }
  const map2 = quantity2.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  
  const time=[...map2.keys()];
  const total3=[]
  const foodprice=[]
  function maap2(y){
      y.map((z)=>{
  
          const x=datt.filter((o)=>o.time===z)
        
        total3.push(x[0])
        let result = x.map(a => a.amount)
        const add=result.reduce(function(acc, val) { return acc + val; }, 0)
        foodprice.push(add)
        })
  }
  function aaa(y){
  maap2(time)
     
    }
    aaa()
    
    location.innerHTML=`
  
  <canvas id="${location}"></canvas>
  `
  const myChart=document.getElementById(location)
  
  createChart(time,foodprice,myChart,'bar','monthly sales')
  
}

function yearly(){
  createCard(lala[0])
  console.log(lala[0]);
 
  col2(lala[0])
  saleForMonth()
  topProducts(lala[0])
  categoryWiseSale(lala[0])
}


  let delayed;
//function create charts
function createChart(foodid,count,location,type,label){

  let chart=new Chart(location,{
      type:type,                                      //bar,horizontal,lie ,pie radar ,polararea
  data:{
    label:'city names',
      labels:foodid,
        datasets:[{
          label:label,
      data: count
  }], 
  },

  //options:{}
  options: {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
    
    }
  }
  }
  )}


    //to arrange data indescending order first we will put the data we got on day basis in a array and the map array according to sales


   //category wise sales
      async function categoryWiseSale(data) {
        const baseUrl='http://localhost:5000/send'
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
            
          
            y.orderedFood.map((o)=>{
           
          a++;
          
              const mappeddata=data2.filter((u)=>{ if( /\s/g.test(u.item)===true){

                return                 u.item.replace(/ /g,'')   ===o.id
}else{
  return               u.item  ===o.id
              }
              
              
              })
         
category.push(mappeddata[0].category);
            })

          })
          const counts = [];
      category.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
      
      const categoryname=Object.keys(counts)
    const categorycount=Object.values(counts)  

   const categoryChart= document.getElementById("category")
   categoryChart.innerHTML=`
  
      <canvas id="categoryChart"></canvas>
      `
      const myChart=document.getElementById('categoryChart')
  
   createchart(categoryname,categorycount,myChart)  
  }

    function createchart(labels,data,location){
  
      new Chart(location, {
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