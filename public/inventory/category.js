async function getinfo() {
    const baseUrl='/categories'
    const res = await fetch(baseUrl,
      {
        method:'GET',
        }
  
      )
    
      const data=await res.json()
    data.map((x)=>{
        console.log(x.name);
        const category=x.name
        console.log(category);
const price=x.price
const quantity=x.quantity
const unit=x.unit


const td=document.createElement('td')
const td2=document.createElement('td')
const td3=document.createElement('td')
const td4=document.createElement('td')

td.innerText=category
td2.innerText=price
td3.innerText=quantity
td4.innerText=unit

const tbody=document.querySelector('tbody')
const tr=document.createElement('tr')
tr.append(td,td2,td3,td4)
tbody.append(tr)
    })
    }
getinfo()


function addCategory(){
const category=document.querySelector('#category')
const price=document.querySelector('#price')
const quantity=document.querySelector('#quantity')
var e = document.getElementById("unit");

var unit = e.options[e.selectedIndex].id;
unit.trim

const baseUrl='/category'
const data={
    name:category.value,
    price:price.value,
    quantity:quantity.value,
    unit:unit
    
}
console.log(data);
post(data,baseUrl)

category.value=''
price.value=''
quantity.value=''
unit.value=''
location.reload()
}





async function post(arrya,baseUrl){
  
    const res=await fetch(baseUrl,
      {
        method:"POST",
      headers: {
  "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        pp:arrya})
    }
  
      
      ).then(response => {
        if (!response.ok) {                                  // ***
          console.log( "HTTP error " + response.status);  // ***
        }                                                    // ***
        // ...use `response.json`, `response.text`, etc. here
      })
      .catch(error => {
        console.log(error);
      });
  location.reload()
    }