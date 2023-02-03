const localStratergy=require('passport-local').Strategy
const bcrypt =require('bcrypt')


 function initilize(passport,getUserByEmail,getUserById){
const authenticateUser=async (username,password,done)=>{
const user =getUserByEmail(username)
if(user ==null){
    return (null,false ,{messege:'incorrect password or username'})
}
try {
    if (await bcrypt.compare(password,user.password)){

    }else{
        return done(null, false, {messege:'incorrect password or username'})
    }
} catch (error) {
    return done(error)
}
}

    passport.use(new localStratergy({usernameField: 'username'},authenticateUser))

passport.serializeUser((user,done)=>{done(null, user.id)
   return done(null,getUserById(user.id))
})

passport.deserializeUser((id,done)=>{
    
})

}

module.exports = initilize