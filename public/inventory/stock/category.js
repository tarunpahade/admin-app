//navbar
document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')
  
  
  
  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  
  // }
  })


async function getinfo() {
    const baseUrl='/categories'
   //raw materials
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


function add(){
  location.href='/inventory/stock/add.html'
}