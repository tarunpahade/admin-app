document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')

  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  

  })


const baseUrl1='/send'
const baseUrll='/bill'
var salebase=[]

const database=[]


getinfos().then(console.log('conn'))
async function getinfos() {
  const res = await fetch(baseUrl1,
    {
      method:'GET',
      }

    )
    const re = await fetch(baseUrll,
        {
          method:'GET',
          }
    
        )
      
    
        const datasale=await re.json()

    const data=await res.json()
 salebase.push(datasale)
generateRows(data,datasale);
document.querySelector('.total').innerHTML=data.length
console.log(data)
database.push(data)
//search
const input=  document.querySelector('#search')
input.addEventListener('keyup',(e)=>{
 console.log(input.value);
 
var td ,tr,txtValue,filter,tbody ;
tbody=document.getElementById('tbody')
tr=tbody.getElementsByTagName('tr')
filter = input.value.toUpperCase();
console.log(tr.length);
 for (i = 0; i < tr.length; i++) {
  td =  tr[i].getElementsByTagName("td")[0]
  console.log(td.textContent);
  txtValue = td.textContent || td.innerText;
  console.log(txtValue);
  if (txtValue.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
  } else {
      tr[i].style.display = "none";
  }
}

})

    }
    //on selecting a particular category
function chang(){
 
    const e=document.querySelector('#monthToDate')
 var value = e.innerHTML;
var text = e.options[e.selectedIndex].id;
if(text==='all'){
  
        const data=  database[0]
    generateRows(data);
    
    }
if(text==='saojiSpecial'){
    const data=  database[0].filter((y)=>y.category===text)
    console.log(data);
generateRows(data);

}
if(text==='special'){
 
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='starters'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='vegMainCorse'){
    const data=  database[0].filter((y)=>y.category===text)
generateRows(data);

}
if(text==='paneerMainCourse'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='kalamMsala'){
  
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='biryani'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='chinese'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='roti'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='dal'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='rice'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}
if(text==='deserts'){
    const data=  database[0].filter((y)=>y.category===text)
    generateRows(data);
}


}
    //to arrange data indescending order first we will put the data we got on day basis in a array and the map array according to sales


function generateRows(x){
    document.querySelector('.fooditems').innerHTML=x.length


const tbody=document.querySelector('tbody')
tbody.innerHTML=''
console.log(x);
x.map((y)=>{
console.log(y);

const tr=document.createElement('tr')

const name=document.createElement('td')
name.innerHTML=y.item

  

const status=document.createElement('td')
status.innerHTML="<a  class='active btn' >  active </a>"
if(y.status==='inactive'){
  status.innerHTML="<a class='inactive btn'> Re-activate </a>"
  status.addEventListener('click',()=>{
  
  const baseUrl='/reActivate'
    post(y,baseUrl)
    location.reload()
  })

}
const category=document.createElement('td')
category.innerHTML=y.category

const price=document.createElement('td')
price.innerHTML=y.price

const sales=document.createElement('td')
sales.innerHTML='112'
if( /\s/g.test(y.item)===true){
  var item=y.item.replace(/\s/g, '')    

                
}else{
  var item=y.item    

}
topProducts(item,sales)
const tdOfButtons=document.createElement('td')
const div=document.createElement('div')
div.setAttribute('class',"action-buttons d-flex justify-content-end")

const tick=document.createElement('a')
tick.setAttribute('class','btn save-btn')
tick.innerHTML=`
<svg class='save-btn' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"width="20px"
height="20px" viewBox="0 0 24 24" version="1.1" class="svg-main-icon"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
`
tick.addEventListener('click',(e)=>{

    price.contentEditable='false';
    
    console.log(price.innerText);
    console.log(y._id);
    const z={
        price:price.innerText,
        _id:y._id,
        name:name.innerHTML,
     
    }

    const baseUrl='/updatePrice'
    // here data might be the problem
       post(z,baseUrl)
location.reload()
})


const edit=document.createElement('a')
edit.setAttribute('class','btn btn-primary light me-2')
edit.innerHTML=`    <svg xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" width="20px"
height="20px" viewBox="0 0 24 24" version="1.1"
class="svg-main-icon">
<g stroke="none" stroke-width="1" fill="none"
    fill-rule="evenodd">
    <rect x="0" y="0" width="20" height="20"></rect>
    <path
        d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z"
        fill="#000000" fill-rule="nonzero"
        transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) ">
    </path>
    <rect fill="#000000" opacity="0.3" x="5" y="20" width="15"
        height="2" rx="1"></rect>
</g>
</svg>`
edit.addEventListener('click',(e)=>{

    price.contentEditable='true';
   name.contentEditable='true'
})


const deleteIcon=document.createElement('a')
deleteIcon.setAttribute('class','btn btn-danger light')
deleteIcon.innerHTML=`  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px"
height="20px" viewBox="0 0 24 24" version="1.1" class="svg-main-icon">
<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <rect x="0" y="0" width="24" height="24"></rect>
    <path
        d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z"
        fill="#000000" fill-rule="nonzero"></path>
    <path
        d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
        fill="#000000" opacity="0.3"></path>
</g>
</svg>`
deleteIcon.addEventListener('click',(e)=>{
console.log(y);
const baseUrll='/delfood'
del(y,baseUrll)
location.reload()

})


div.append(tick,edit,deleteIcon)
tdOfButtons.append(div)
tr.append(name,category,price,sales,status,tdOfButtons)

tbody.append(tr)
})

}


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
          console.log( "HTTP error " + response.status);  // ***
        }                                                    // ***
        // ...use `response.json`, `response.text`, etc. here
      })
      .catch(error => {
        console.log(error);
      });
  
    }

    async   function del(data,baseUrl){

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
              console.log( "HTTP error " + response.status);  // ***
            }                                                    // ***
            // ...use `response.json`, `response.text`, etc. here
          })
          .catch(error => {
            console.log(error);
          });
      
        }
   


    
          
        function topProducts(data,location){

               
            const both=[]
            const foodItems=[]
            const quantity=[]
            ///mapping data
       
            salebase[0].map((x)=>{
            
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
            
          const food=foodid.find((y)=>y===data)
          const index=foodid.findIndex((y)=>y===data)
          console.log(food,count[index]);
          if(count[index]===undefined){
        location.innerHTML=0  
            
          }else{
        location.innerHTML=count[index]  
          }
            
              }

        