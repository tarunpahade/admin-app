var socket=io('http://localhost:5000/user1');
var socket = io();
var user=1
var form = document.getElementById('form');
var input = document.getElementById('input');
const messege=document.getElementById('messages');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(input.value.length);
    if (input.value.length>0) {
        
      const data='user2 '+ input.value
        socket.emit('chatmessage',data );

        input.value = '';
     
    }
});
socket.on('message', data=>{
    Notification.requestPermission().then(perm =>{
        
        if(perm==='granted'){
            const notification = new Notification("Example Notification",{
                body:data,
                data:{hello :'world'},
                tag:'hii'
            })
            notification.addEventListener('error',e=>{
                alert('err')
            })
        } else{

        }
    })

    console.log('hii');
    console.log(data);
    const html=`<h1>  ${data}</h1>`
    messege.innerHTML +=html
})