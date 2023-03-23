const submit=document.getElementById('submit')
const dayStart=document.querySelector('.day-start')
const dayCLOSE=document.querySelector('.day-close')
const makeFormVisible=document.querySelector('.overlay')
const report=document.querySelector('#generateReport')

//Finds Out Days
const date=new Date
const today=date.getDate().toString()
const month=date.getMonth()
const arrayOfMonths=["January","February","March","April","May","June","July","August","September","October","November","December"]
const currentMonth=arrayOfMonths[month]
const year=date.getFullYear().toString()


//sets up inputs
document.getElementById('datePicker').valueAsDate = new Date();
const hours=date.getHours();

const min=String(date.getMinutes()).padStart(2, '0');
console.log(hours,min);

document.getElementById('time').value = hours +':'+min;
console.log(new Date().getHours());


document.querySelector('.close').addEventListener('click',()=>{

  makeFormVisible.style.visibility="hidden"

  report.style.visibility="hidden"
})

dayStart.addEventListener('click',()=>{

  makeFormVisible.style.visibility="visible"
  submit.style.display='block'

})
dayCLOSE.addEventListener('click',()=>{

  makeFormVisible.style.visibility="visible"
  report.style.visibility="visible"
  submit.style.display='none'
})

report.addEventListener('click',(event)=>{
event.preventDefault()
  getinfo().then((grossSales)=>{

console.log(grossSales);

  })

})

//finds out income forthe day
async function getinfo() {
  const res = await fetch('/bill',
    {
      method:'GET',
      }

    )
  

    const data=await res.json()




const salesToday=[]
data.map((x)=>{;

if(x.year===year){
if(x.month===currentMonth){

  if(x.date===today){
   
    const saleForToday=[]
   
    x.orderedFood.map((y)=>{
      saleForToday.push(y.price);
    })
    
    const add=saleForToday.reduce(function(acc, val) { return acc + val; }, 0)
    salesToday.push(add)
  }
}
}
})
const total=salesToday.reduce(function(acc, val) { return acc + val; }, 0)

return total
}
// getinfo()

//gets information from the form andsends data
submit.addEventListener('click',(event)=>{
  event.preventDefault()
  console.log('you clicked submit');
const amount=document.querySelector("#amount").value
console.log(amount);

  const hours=new Date().getHours();
  const date=new Date()
  const min=String(date.getMinutes()).padStart(2, '0');
  console.log(hours,min);
const today=date.getDate()
const data={
  amount:amount,
  time:hours+":"+min,
  today,
  month:currentMonth,
  balance:"opening"
}
post(data,'/day-report')
})




//postsdata
async   function post(data,baseUrl){

  const res= await fetch(baseUrl,
    {
      method:"POST",
    headers: {
"Content-Type": 'application/json'
    },
    body: JSON.stringify({
      pp:data}),

  }

    
    ).then(response => {
      if (!response.ok) {                                  // ***
      }  else {
        console.log('sent');
      }                                                  // ***
      // ...use `response.json`, `response.text`, etc. here
    })
 ;
  //  location.reload()

  }


