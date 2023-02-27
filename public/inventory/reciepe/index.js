
//navbar
document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')
  
  
  
  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  
 
  })
  

async function getinfo() {
    const baseUrl='/send'
    const res = await fetch(baseUrl,
      {
        method:'GET',
        }
  
      )
    const baseUr2='/reciepe'

      const rawIngredients=await fetch(baseUr2,
        {
          method:'GET',
          }
    
        )
        const baseUr3='/categories'

        const categories=await fetch(baseUr3,
          {
            method:'GET',
            }
      
          )

          const category=await categories.json()

//existing reciepe data
        const arry=await rawIngredients.json()
      
    
const menuItem=[]


arry.map((a)=>{
menuItem.push(a.menuItem)

})
//removes duplicate nmae
const map = menuItem.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  console.log(map);
const foodid=[...map.keys()];

foodid.map((z)=>{
 
  const mapo=arry.filter((s)=> s.menuItem ===   z)
  
  const rawMaterial=[]
  const quantity=[]
  const unit=[]
const costPerUnit=[]
mapo.map((x)=>{

rawMaterial.push(x.rawMaterial)
quantity.push(x.quantity)
unit.push(x.unit)
console.log(x.rawMaterial);
const filter=category.filter((a)=>a.name===x.rawMaterial)

const num=filter[0].costPerUnit*x.quantity
console.log(num);

costPerUnit.push(Math.round(num))
})

console.log(costPerUnit.reduce((partialSum, a) => partialSum + a, 0));
const livecost=costPerUnit.reduce((partialSum, a) => partialSum + a, 0)
const td=document.createElement('td')
const td2=document.createElement('td')
const td3=document.createElement('td')
const td4=document.createElement('td')
const td5=document.createElement('td')

const ol=document.createElement('ul')
ol.classList.add('a')
const ol2=document.createElement('ul')
const ol3=document.createElement('ul')

td.innerText=z
td5.innerText=livecost

for (let x = 0; x < rawMaterial.length; x++) {
//for raw material  
const li=document.createElement('li')
li.innerText=rawMaterial[x]
ol.append(li)

//for quantity
const li2=document.createElement('li')
li2.innerText=quantity[x]
ol2.append(li2)

const li3=document.createElement('li')
li3.innerText=unit[x]
ol3.append(li3)


}


td2.append(ol)
td3.append(ol2)
td4.append(ol3)

const tbody=document.querySelector('tbody')
const tr=document.createElement('tr')
tr.append(td,td2,td3,td4,td5)
tbody.append(tr)



})




      


}
    
getinfo()


function generateRows(x){



  const tbody=document.getElementById('tbody')
  
  tbody.innerHTML=''
  
  x.map((y)=>{
  
  const tr=document.createElement('tr')
  
  const name=document.createElement('td')
  name.innerHTML=y.item
  name.addEventListener('click',()=>{
    const input=document.querySelector('#search')
    input.value=y.item
    localStorage.setItem('data', JSON.stringify(y.item))
    tbody.style.display='none'
    
  })
  
  tr.append(name)
  tr.style.display='none'
  tbody.append(tr)
  })
  
  }



function unhide(){
location.href='/inventory/reciepe/add.html'
}



  