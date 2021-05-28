const JWTStrategy=require('passport-jwt').Strategy
const ExtractJWT=require('passport-jwt').ExtractJwt
const User=require('../models/Users')
const secretOrKey=process.env.SECRET_KEY
const opts={}
opts.jwtFromRequest=ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey=secretOrKey

const passport=(passport)=>{
      passport.use(
          new JWTStrategy(opts,async(jwt_payload,done)=>{
             // console.log(jwt_payload)
             try{
             const user=  await User.findById(jwt_payload.id)
                    if(user)
                       return done(null,user)
                      
                    return done(null,false)
               }
               catch(e){console.log(e)}

          })
          )
}

module.exports=passport