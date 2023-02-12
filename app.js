if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


const express=require('express')
const mongoose=require('mongoose')

const bodyParser = require('body-parser');
const bcrypt=require('bcrypt')
var cors = require('cors')
const flash=require('express-flash')
const session=require('express-session')

var app = express();
 const path= require('path');



 



app.set('view-engine','ejs')
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({extended:false}))
mongoose.connect('mongodb://tarunpahade:test123@ac-ad8joto-shard-00-00.byx71hn.mongodb.net:27017,ac-ad8joto-shard-00-01.byx71hn.mongodb.net:27017,ac-ad8joto-shard-00-02.byx71hn.mongodb.net:27017/?ssl=true&replicaSet=atlas-wy4ihy-shard-0&authSource=admin&retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log('connected');
});
mongoose.set("strictQuery", false);

const usersinfo=[]

app.use(flash())


;
//socket io

const port = process.env.PORT || 8080;

//socket io
const server=app.listen(port)

const io = require("socket.io")(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chatmessage', data=>{
   
  io.emit('message',data)
})

});

//connect
const db=mongoose.connection
db.on("error",()=>{console.log('error');})
db.once('open',()=>{console.log('opened');})
//schema for bill
const billschema=new mongoose.Schema({
  name:String,
  table:String,
  date:String,
  year:String,
minutes:String,
week:String,
month:String,
time:String,
hours:String,
number:Number,
  orderedFood:[{
      id:String,
      items:Number,
      price:Number
  }],
  status:String
  })


//to add data in test restraunt 
  var bill = mongoose.model('orderedFood',billschema,'billS')
const orders=new mongoose.Schema({
  name:String,
  table:String,
  date:String,
time:String,
status:String,
  orderedFood:[{
      id:String,
      items:Number,
      price:Number
  }]
  })
var order = mongoose.model('orderedKot',orders,'kot')


const register=new mongoose.Schema({
  username:String,
  password:String,
email:String, 
phone:String,
restraunt:String,
position:String,
status:String
  })
  var registeredUser = mongoose.model('orderUser',register,'users')

app.get('/login',(req,res)=>{
  res.sendFile(__dirname+'/public/registerLogin/login.html')


})
app.get('/register',(req,res)=>{
  res.sendFile(__dirname+'/public/registerLogin/register.html')
  
})
app.post('/register',async (req,res)=>{
  const ff =req.body;
console.log(ff);

try {
if (ff.password===ff.confirmpassword) {
  
console.log(ff);

  const hashedpassword=await bcrypt.hash(ff.password,10)
const data= new registeredUser({
  
  username:ff.username,
  email:ff.email,
  phone:ff.phone,
  password:ff.password,
  restraunt:ff.restraunt,
  position:ff.position
})

data.save(function (err, book) {
  if (err) return console.error('fucked up code'+err);
else{
  console.log(book+'saved to database');
}
  
});
res.redirect('/login')
}else{
  res.send('Password are not matching')
}
} catch (error) {
res.redirect('/register')
console.log('err');  
}
})

app.post('/login',async(req,res)=>{
  
  try {
    const ff=req.body
const username=ff.username
const password=ff.password

  console.log(ff);
const user= await  registeredUser.findOne({username:username})
console.log(user+'this is user ');
if (user==null) {
  res.redirect('registerLogin/notfound.html')
console.log('redirect null');
}
if (password===user.password){
 
  


  registeredUser.findByIdAndUpdate(user._id, { $set: { status: 'online' }}, { new: true }, function (err, article) {
    if (err) return handleError(err);
    console.log('hii');
    usersinfo.push(user)
    console.log(usersinfo);
    res.redirect('/dashboard')  
  });
  
  
//console.log('this is user info'+usersinfo);
}
else{
  res.redirect('registerLogin/notfound.html')
console.log('else');
}


  } catch (error) {
    res.status(400).send='invali email or password'
  }
})



app.get('/dashboard',(req,res)=>{
   if(usersinfo.length===0){
    res.redirect('/login')
   }else{
    res.sendFile(__dirname+'/public/dashboard/test2.html')

   }
})

//send data to kot
app.get('/info',(req,res)=>{
  order.find({},(err,user)=>{
    if(err){
      console.log(err);
    }
    res.send(user);
  })
});

//sends data to dashboard
app.get('/bill',(req,res)=>{
  console.log(usersinfo);
//   if(usersinfo.length===0){
//    console.log('haha');
  
//     }else if(usersinfo.length>0){


// console.log(usersinfo[0].username+'username');


// if(usersinfo[0].username==='admin'){
console.log('haha');
  bill.find({},(err,user)=>{
   
 if(err){
      console.log(err);
    }
    res.send(user);
  })
// }

// }

});

app.get('/',(req,res)=>{
  res.redirect('/login')
})
//sends bill data
app.post('/',(req,res)=>{
  console.log('posting');
  const { pp } =req.body;
  console.log(pp);

  const name=pp.name
const table=pp.table  
const orderedItems=pp.orders[0]

const year=pp.year
const week=pp.week
const todayDate=pp.date
const number=pp.number
const status=pp.status
const hours=pp.hours
const month=pp.month


function run(){

    const data=new bill({
      name:name,
    month:month,
      table:table,
      date:todayDate,
hours:hours,
  year:year,
number:number,
  kot:pp.kot,

      orderedFood:orderedItems,
      status:status
  })

   data.save(function (err, book) {
    if (err) { console.error('fucked up code'+err);}
else{console.log('succesfully upated');}
    
  });


}
run()

})

//deletes menu data
app.post('/delete',(req,res)=>{
console.log(req.body);
const { pp }=req.body
console.log(pp);
order.deleteOne({_id:pp._id}).then((err,book)=>{
  if(err){console.log(err+' this is a error');}else{console.log('deleted');}
  
})
})

//after the bill is printed
app.post('/update',(req,res)=>{
  db.collection('orderedFood')
  const { pp }=req.body
const id=pp._id
console.log(pp);
  order.updateOne(pp,{status: 'printed'},   function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : "+ docs);
    }

})
})

//updates status from kitchen
app.post('/updateFood',(req,res)=>{
  const { pp }=req.body
const id=pp._id
console.log(id);


order.findByIdAndUpdate(id,{status:'cooked'},   function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated User : ", docs.type);
  }

})
// { "acknowledged" :true, "matchedCount" : 1, "modifiedCount" : 1 }



})

//sends authentication file
app.get('/authentication',(req,res)=>{
  res.sendFile('authentication/index.html')
})


//sends settings file
app.get('/setting',(req,res)=>{
  res.sendFile('settings/index.html')
})
//support
app.get('/support',(req,res)=>{
  res.sendFile('support/index.html')
})

//get user data
app.get('/user',(req,res)=>{

  registeredUser.find({},(err,user)=>{
    if(err){
      console.log(err);
    }
    console.log(user);
    res.send(user);
  })
})


//mongoose schema
const foodlist=mongoose.Schema(
  {
    url:String,
    name:String,
  item:String,
  price:String,
  category:String,
  status:String
}
)

   // compile schema to model
   var food = mongoose.model( 'fooddata',foodlist, 'orderlist');

//sends data of menu
app.get('/send',(req,res)=>{
  food.find({},(err,user)=>{
    if(err){
      console.log(err);
    }
    res.send(user);
  })
})

//edit menu
app.post('/updatePrice',(req,res)=>{

  const { pp }=req.body
const id=pp._id
console.log(pp);
const price=pp.price
const name=pp.name
food.findByIdAndUpdate(id,{price:price,item:name},   function (err, docs) {
  if (err){
      console.log(err)
  }
  else{
      console.log("Updated User : ", docs.type);
  }
})
})
//delete item from menu
app.post('/delfood',(req,res)=>{
  const { pp }=req.body
  const id=pp._id;

  food.findByIdAndUpdate(id, { $set: { status: 'inactive' }}, { new: true }, function (err, article) {
    if (err) return handleError(err);
    res.send(article);
  });

})
app.post('/reActivate',(req,res)=>{
  const { pp }=req.body
  const id=pp._id;

  food.findByIdAndUpdate(id, { $set: { status: 'active' }}, { new: true }, function (err, article) {
    if (err) return handleError(err);
    res.send(article);
  });

})
  //adds new item
  app.post('/new',(req,res)=>{
    const { pp } =req.body;
    console.log(pp);
    const name=pp.name
 const price=pp.price
  const category=pp.category
  const url=pp.url
      const data=new food({
        item:name,
     category:category,
        price:price,
        url:url

    })
     data.save(function (err, book) {
      if (err) return console.error('fucked up code'+err);
    });
  ;
  })
//sending bulk msg
  //twilio
  const authToken = 'd3e2910aff173ee94bea532d24abab4a'; 

  const accountSid = 'ACbf2608b126a238d429463d915859023d'; 

const client = require('twilio')(accountSid, authToken); 
async function sendSMSTwilo(text,to) {
  Promise.all(
    to.map(number => {
  client.messages 
  .create({ 
     body: text,  
     messagingServiceSid: 'MG5b44a6c5d07e45371925e9b63ac0501d', 
     from:'+13396751233',     
     to: to
   }) 
  })
  )
  .then(message => console.log(message.sid+'messege sent successfully')).catch((err)=>console.log(err)) 

  }

  app.post('/discount',(req,res)=>{

  const { pp }=req.body
  
const number=pp.number
console.log(pp,number);
  sendSMSTwilo(pp.msg,number)
  })
  async function sendWhatsapp(text,to) {
    Promise.all(
      to.map(number => {
    client.messages 
    .create({ 
       body: text,  
       messagingServiceSid: 'MG5b44a6c5d07e45371925e9b63ac0501d', 
       from:'whatsapp:+14155238886',     
       to: number
     }) 
   }
    )
    )
    .then(message => console.log(message.sid+'messege sent successfully')).catch((err)=>console.log(err)) 
  
    }
app.get('/whatsapp',()=>{
  console.log('hii');
  const { pp }=req.body
  
  
    sendWhatsapp(pp.msg,'whatsapp:+918010669013')
 ;
})
app.get('/analytics',(req,res)=>{
  res.sendFile(__dirname + '/public/test2.html');
})

  //customers
  app.get('/customers',(req,res)=>{
    res.sendFile(__dirname+'/public/Customer/index.html')
  })
  app.get('/crm',(req,res)=>{
    res.sendFile(__dirname+'/public/CRM/index.html')
  })
 
  app.get('/user1', (req, res) => {
    res.sendFile(__dirname + '/public/test2.html');
  });
  app.get('/user2', (req, res) => {
    res.sendFile(__dirname + '/public/test2.html');
  });

  app.get('/logout',(req,res)=>{
    
    console.log(usersinfo);
  registeredUser.findByIdAndUpdate(usersinfo[0]._id, { $set: { status: 'offline' }}, { new: true }, function (err, article) {
    if (err) { console.log(err)}else{
console.log(article);
    
    console.log('hii');
    res.redirect('/login')  }
  });
  
  })
