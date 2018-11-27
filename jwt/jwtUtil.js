const jwtKoa = require('koa-jwt');
const jwt = require('jsonwebtoken');
let exp = 2*60*60*1000;
let jwtUtil = {
    secret:'wabglei',
    
    encode:( 
        payload,
        options)=>{            
        return jwt.sign(payload, jwtUtil.secret, {algorithm:'HS256'})
    },
   
    config:{
        payload:{
            id:-1,
            iat:new Date().getTime(),
            exp: new Date().getTime() + exp,
        },
    },
    verify:(token, secret)=>{
        try{
            jwt.verify(token, secret)
        } catch(e){
            console.log('e' + e)
        }
    },
    decode:(token)=>{
        jwtUtil.verify(token, jwtUtil.secret)
        return jwt.decode(token)
    },
    
}
exports.jwtUtil = jwtUtil;
exports.jwt = jwt