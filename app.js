const Koa = require('koa2');
const Router = require('koa-router')
const cors = require('koa2-cors')

const server = require('koa-static');
const koaBody = require('koa-body');
const User = require('./config/config').User;

const app = new Koa();
app.use(koaBody())
app.use(cors())
app.use(server(__dirname+'/public'))
const router = new Router()

let auth = async (ctx, next)=>{
    console.log(ctx.url)
    await next()
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
}).post('/login', async(ctx, next)=>{
    console.log(ctx.request.body)
    let loginData = ctx.request.body;
    let username = loginData.username;
    let password = loginData.password;
    if(username == password){
        ctx.body={
            status:200,
            msg:'登录成功'
        }
    } else {
        ctx.body={
            status:500,
            msg:'用户名或密码不正确'
        }
    }

    
})


app
.use(router.routes())
.use(router.allowedMethods())

app.listen(9000, ()=>{
    console.log('应用服务器启动成功')
});