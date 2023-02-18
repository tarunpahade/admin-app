console.log('hii');

async function getinfo() {
    const baseUrl='/send'
    const res = await fetch(baseUrl,
      {
        method:'GET',
        }
  
      )
    
      const data=await res.json()
      console.log(data);

generateRows(data)
const input=  document.querySelector('#search')
input.addEventListener('keyup',(e)=>{

 console.log(input.value);
 
var td ,tr,txtValue,filter,tbody ;
tbody=document.getElementById('tbody')
tbody.style.display='block'
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
getinfo()




function generateRows(x){

console.log(x);

const tbody=document.getElementById('tbody')

tbody.innerHTML=''
console.log(x);
x.map((y)=>{
console.log(y);

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

function append(event){
 
  event.preventDefault()
  document.querySelector('.name').innerHTML+=(`
  <div class="new-category">
  <input type="text" id="name" placeholder="name">

  <input type="text" id="quantity" placeholder="quantity">
  <select id="unit" class="form-control" name="unit">
                        <option id='kg'>kg</option>
                        <option id='gm'>gm</option>
                        <option id='liter'>liter</option>
                        <option id='ml'>ml</option>
                    </select>
  <button onclick="addingredient()">Submit</button>
</div>
  
  `)
  const input=document.querySelector('#search')
  input.value=JSON.parse(localStorage.getItem('data'))

}

function addingredient(){
  const category=document.querySelector('#name')

const quantity=document.querySelector('#quantity')

var e = document.getElementById("unit");

var unit = e.options[e.selectedIndex].id;
unit.trim

const search=document.querySelector('#search')

const baseUrl='/ingredients'
const data={
    rawMaterial:category.value,
    menuItem:search.value,

    quantity:quantity.value,
    unit:unit.value
    
}
console.log(data);
post(data,baseUrl)


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

  }


  