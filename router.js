const Router = require('koa-router')
const router = new Router()
const service = require('./service/service').Service;
const jwtKoa = require('koa-jwt');
const jwt = require('./jwt/jwtUtil').jwt;
const jwtUtil = require('./jwt/jwtUtil').jwtUtil;
const redisUtil = require('./redis/redis').redisUtil;
const redis = require('./redis/redis').redis;

let payload = jwtUtil.config;

let checkHeader = async (ctx, next,token)=>{
    let payload = jwtUtil.decode(token);
        console.log('id', payload.id)
        let tokenFromRedis =await redisUtil.get(payload.id);
        console.log('tokenFromRedis:'+tokenFromRedis)
        console.log(token == tokenFromRedis)
        return token == tokenFromRedis
}

let auth = async (ctx, next)=>{
    let requestPath = ctx.path;
    let token = ctx.header.authorization
    console.log("header:" + token)
    if(requestPath == '/checkLogin'){
       let flag =  checkHeader(ctx, next, token)
        if(!flag){
            ctx.body={
                status:403,
                msg:'受保护资源'
            }
        } else {
            await next();
        }
    } else if (requestPath == '/getData') {
       let flag =  checkHeader(ctx, next, token)
        if(!flag){
            ctx.body={
                status:403,
                msg:'受保护资源'
            }
        } else {
            await next();
        }
    } else {
        await next();
    } 
}
router.use(auth)

router.get('/a', async ctx=>{
    let size = ctx.query.size
    let p = ctx.query.p
    let i = (p-1)*size
    let total = (p)*size
    let totalPage = 10;
    let a =[] 
    if(p <= totalPage){
        for(i ; i < total; i++ ){
            await a.push(
                {
                    "name":i,
                    "title":(2000+i)
            })
        }
    } else {
        
    }
     
    let data={}
    data.status = 200;
    data.msg="测试结果";
    data.items = a;
    data.currentPage = parseInt(p);
    data.totalPage=totalPage;
    console.log(data)
    ctx.body = data
}).get('/b', async (ctx, next)=>{
    let a = ['这是张三的手机','打个大大的','反反复复','哥哥哥哥','呃呃呃','隐隐约约','uuuuu','啊啊啊']
    let random =  Math.floor(Math.random()*9)
    console.log(random)
    let user = await User.findById(1).then((user)=>{
        console.log(JSON.stringify(user))
        console.log(user.name);
        a.push(user.name)
    });
    ctx.body={
        status:200,
        msg:'test',
        data: a[random]
    }
}).get('/getSwiperImage', async(ctx, next)=>{
    let url1 = 'http://s.amazeui.org/media/i/demos/bing-2.jpg';
    let url2 = 'http://s.amazeui.org/media/i/demos/bing-3.jpg';
    let url3 = 'http://s.amazeui.org/media/i/demos/bing-4.jpg';

    let arr =[]
    arr.push(url1);
    arr.push(url2);
    arr.push(url3);

    ctx.body={
        status:200,
        msg:'轮播图片地址',
        data:arr
    }
}).post('/login', async(ctx) =>{
    console.log(ctx.request.body)
    let loginData = ctx.request.body;
    let username = loginData.username;
    let password = loginData.password;
    let user = await service.getEntityByName(username);
    if(user != null) {
        if(user.password == password){
            flag = true
        } else {
            rflag = false;
        }
    } else {
            flag = false;
    }
    if(flag){
        payload.payload.id = user.id
        console.log(payload.payload)
        let token = await jwtUtil.encode(payload.payload, '123');
        let userId = user.id;
        try {
           await redisUtil.setExpire(userId, token,jwtUtil.exp)
        } catch (error) {
            // assert.isNotOk(error,'Promise error');
            // done();
        }
        ctx.body={
            status:200,
            msg:'登录成功',
            token:token
        }
    } else {
        ctx.body={
            status:500,
            msg:'用户名或密码不正确'
        }
    }
})
.get('/checkLogin', async(ctx, next)=>{
    ctx.body={
        status:200,
        msg:'已登陆'
    }
}).post('/sendData',async(ctx, next)=>{
    let person = ctx.request.body
    console.log(person)
    if(!person.name&& !person.age && !person.comment){
        ctx.throw(500,'请输入信息')
    }
    await service.save(person);
    ctx.body={
        status:200,
        msg:'保存成功',
        data:person
    }
}).get('/getData', service.findAllPerson)
.get('/saveData', async ctx=>{
    let name = ctx.query.name;
    let age = ctx.query.age;
    let comment = ctx.query.comment;
    if(!name && !age && !comment){
        ctx.throw(500,'请输入信息')
    }

    let person = {
        name:name,
        age:age,
        comment:comment
    }
    await service.save(person)
    ctx.body={
        status:200,
        msg:'保存成功',
        data:person
    }
}).get('/getJwt', async(ctx, next)=>{
    let t = await jwt.sign({ foo: 'bar' }, '123');
    ctx.body={
        status:200,
        msg:'保存成功',
        data:t
    }
})

exports.router = router