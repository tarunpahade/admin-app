

const lala=[]
const simplifiedData=[]
document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')
  

  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  })

async function getinfo() {
  const baseUrl='/bill'
  const res = await fetch(baseUrl,
    {
      method:'GET',
      }

    )
  

    const data=await res.json()
console.log('jajaj');
    lala.push(data)
  //  document.querySelector('#preloader').style.display='none'
    
   
    return data
    

}
getinfo().then((x)=>{
  
  simplifyData(x)
  appendRows(simplifiedData)
document.querySelector('#totalspent').addEventListener('click',()=>{
  
  simplifiedData.sort( function ( a, b ) { return b.totalSpent - a.totalSpent; } )
  appendRows(simplifiedData)
  console.log(simplifiedData);
  visible()
})
document.querySelector('#lastvisit').addEventListener('click',()=>{
  
  simplifiedData.sort( function ( a, b ) { return b.lastvisit - a.lastvisit; } )
  appendRows(simplifiedData)
  console.log(simplifiedData);
  visible()
})
document.querySelector('#date').addEventListener('click',()=>{
  
  simplifiedData.reverse()
  appendRows(simplifiedData)
  console.log(simplifiedData);
  visible()
})
  

}) 

//for dropdown
function visible() {
  document.querySelector('.dropdown-menu').classList.toggle('visible')
  }

  function appendRows(data){
    const tbody=document.querySelector('#tablebody')
    tbody.innerHTML=''
    data.map((data1)=>{
 
      const td5=document.createElement('td')
      td5.innerHTML=data1.lastvisit
    
      const td6=document.createElement('td')
      td6.innerHTML=data1.totalSpent
    
      const td=document.createElement('td')
      td.innerHTML=data1.phone
    
      const td2=document.createElement('td')
      td2.innerHTML=data1.name
    
    
    
      const td3=document.createElement('td')
      td3.innerHTML=data1.visits
    
      const td4=document.createElement('td')
      const date=data1[data1.length-1]
      td4.innerHTML=data1.date
      
        const tr=document.createElement('tr')
      tr.append(td,td2,td3,td4,td5,td6)

      tbody.append(tr)
      tr.onclick= ()=>{
        
      if(tr.childNodes[0].firstChild.data==='123456789'){
        const data=lala[0].filter((y)=>y.number === void 0)
        localStorage.setItem('data', JSON.stringify(data))
      }else{

        const dataa=lala[0].filter((y)=>y.number===data1.phone)
    
        console.log(dataa);
        localStorage.setItem('data', JSON.stringify(dataa))
      
      }
      
      
      
    
    location.href='./customer.html'
    
    
    }
    })
    }


function simplifyData(x){

  const data=[]
x.forEach(e => {
const totalamt=[]
  e.orderedFood.map((y)=>{
 
  const total=y.price*y.items
  
  totalamt.push(total)
})


data.push({Name:e.name, Date:e.date+' ' +e.month+e.year, Hours:e.hours ,totalSpent:totalamt.reduce((a, b) => a + b, 0),phone:e.number})
});


const both=[]
const foodItems=[]
const quantity=[]
///mapping data
data.map((y)=>{
//only for testing purposes using if else statements as i forgot to add  number in starting 40 databases
//while selling to other people remove if else
var tt=y.phone
  if(tt === void 0){
    // both.push({'name':y.Name,'number':123456789});

    
   
  }else if(tt === null){
    console.log('lol');
  

  }
  
  else{
    both.push({'name':y.Name,'number':y.phone});
  
  
  }



if(tt === void 0){
  // foodItems.push(123456789)
 
}else if(tt === null){

// foodItems.push(9999999999)
console.log('lol');
}

else{
  foodItems.push(y.phone)

}

quantity.push(y.Name)

  
})





const count=[]
  

const length=[]

function maap(y){

  y.map((z)=>{

  const x=both.filter((o)=>o.number===z)


length.push(x.length);



let result = x.map(a => a.name)

const add=result[result.length-1]


count.push(add)
})}
//filters same same object and gives count
const map = foodItems.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

const foodid=[...map.keys()];
maap(foodid)
;



const tbody=document.querySelector('#tablebody')
tbody.innerHTML=''
for (let index = 0; index < count.length; index++) {

  const data=x.filter((y)=>y.number===foodid[index])
  const totalamt=[]

  data.forEach(e => {
      e.orderedFood.map((y)=>{
    
      const total=y.price*y.items
      
      totalamt.push(total)
    })})
    const date=data[data.length-1]
    const trdata={
      'phone':foodid[index],
      'name':count[index],
      'visits':length[index],
      'date':date.date +' ' +date.month+' ' +date.year,
      'lastvisit':totalamt[totalamt.length-1],
      'totalSpent':totalamt.reduce((a, b) => a + b, 0)
      
      }
      
      simplifiedData.push(trdata)

// if(foodid[index]===123456789){
//   const data=x.filter((y)=>y.number === void 0)
//   console.log(data);
//   console.log('this' );
// ;
//   const totalamt=[]
//   data.forEach(e => {
//     e.orderedFood.map((y)=>{
  
//     const total=y.price*y.items
    
//     totalamt.push(total)
//   })})


// const td=document.createElement('td')
// td.innerHTML=foodid[index]

// const td2=document.createElement('td')
// td2.innerHTML=count[index]



// const td3=document.createElement('td')
// td3.innerHTML=length[index]

// const td4=document.createElement('td')
// const date=data[data.length-1]

// //date.hours
// td4.innerHTML=date.date +' ' +date.month+' ' +date.year
// console.log(data[data.length-1].date);

// const td5=document.createElement('td')
// td5.innerHTML=totalamt[totalamt.length-1]

// const td6=document.createElement('td')
// td6.innerHTML=totalamt.reduce((a, b) => a + b, 0)


// const tr=document.createElement('tr')
// tr.append(td,td2,td3,td4,td5,td6)
// tr.onclick= ()=>{
//   const foood=[]
// data.map((y)=>{
// const food=y.orderedFood
// y.orderedFood.map((h)=>{
// console.log(h);
// foood.push(h)

// })
// })





// localStorage.setItem('data', JSON.stringify(data))

// location.href='./customer.html'



// }
// console.log('appender body');
// tbody.append(tr)

// }
// else{
//   const td5=document.createElement('td')
//   td5.innerHTML=totalamt[totalamt.length-1]

//   const td6=document.createElement('td')
//   td6.innerHTML=totalamt.reduce((a, b) => a + b, 0)

//   const td=document.createElement('td')
//   td.innerHTML=foodid[index]

//   const td2=document.createElement('td')
//   td2.innerHTML=count[index]



//   const td3=document.createElement('td')
//   td3.innerHTML=length[index]

//   const td4=document.createElement('td')
//   const date=data[data.length-1]
//   //date.hours
  
//   if(date === void 0){
// console.log('undif');   
//   }else{
//     td4.innerHTML=date.date+' ' +date.month+' ' +date.year

  
  
//   const trdata={
//     'phone':foodid[index],
//     'name':count[index],
//     'visits':length[index],
//     'date':date.date +' ' +date.month+' ' +date.year,
//     'lastvisit':totalamt[totalamt.length-1],
//     'totalSpent':totalamt.reduce((a, b) => a + b, 0)
    
//     }
    
//     simplifiedData.push(trdata)
//   }
//     const tr=document.createElement('tr')
//   tr.append(td,td2,td3,td4,td5,td6)
//   tr.onclick= ()=>{
//     const foood=[]
// data.map((y)=>{
// const food=y.orderedFood
// y.orderedFood.map((h)=>{

//   foood.push(h)

// })
// })





// console.log(data);
// localStorage.setItem('data', JSON.stringify(data))

// location.href='./customer.html'



// }
  
//   tbody.append(tr)

// }



}



}