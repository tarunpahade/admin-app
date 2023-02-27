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