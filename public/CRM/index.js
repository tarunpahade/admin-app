document.querySelector('.menu-btn').addEventListener('click',()=>{

  const side=document.querySelector('.haha')
  
  
  
  
  side.classList.toggle('side')
  side.classList.toggle('menu-sidebar')
  side.classList.add('open')
  
  // }
  })
  


const baseUrl='/bill'

async function getinfo() {
  const res = await fetch(baseUrl,
    {
      method:'GET',
      }

    )
  

    const data=await res.json()

 
   console.log(data);

    return data
    }

const form=document.querySelector('#form').addEventListener('click',(e)=>{
 e.preventDefault()
    console.log('form submitted');

    getinfo().then((x)=>{
      console.log(x);
      const number= []

x.map((c)=>{
  if(c.number === void 0){
    console.log('undefined');
   
  }else if(c.number === null){
console.log('null');  
  
  }
  
  else{
    number.push('+91'+c.number)
    
  
  }
})
           
      const map = number.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

      const filteredNumbers=[...map.keys()];
    console.log(filteredNumbers);
    
      // number.forEach(e =>{
           var message= document.querySelector('#inp').value
       console.log(message)
           const data={
            'number':filteredNumbers,
            'msg':message,
           }
            const url= '/discount'
            post(data,url)
        // })
        
        })



})

document.querySelector('#whatsapp').addEventListener('click',(e)=>{
  console.log('lol');
  e.preventDefault()
  console.log('form submitted');

  getinfo().then((x)=>{
    console.log(x);
    const number= []

x.map((c)=>{
if(c.number === void 0){
  console.log('undefined');
 
}else if(c.number === null){
console.log('null');  

}

else{
  number.push('whatsapp:+91'+c.number)
  

}
})
         
    const map = number.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

    const filteredNumbers=[...map.keys()];
  console.log(filteredNumbers);
  
    // number.forEach(e =>{
         var message= document.querySelector('#inp').value
     console.log(message)
         const data={
          'number':filteredNumbers,
          'msg':message,
         }
          const url= '/whatsapp'
          post(data,url)
      // })
      
      })


})

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
    //  location.reload()
  console.log('posted');
    }