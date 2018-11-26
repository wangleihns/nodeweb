const Router = require('koa-router')
const router = new Router()
const service = require('./service/service').Service;

let auth = async (ctx, next)=>{
    console.log(ctx.request.url)
    let requestPath = ctx.path;
    if(requestPath == '/checkLogin'){
        let param = Number(ctx.query.token);
        if(param != 123){
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
}).post('/login', service.getEntityByName)
.get('/checkLogin', async(ctx, next)=>{
    ctx.body={
        status:200,
        msg:'已登陆'
    }
}).post('/sendData',async(ctx, next)=>{
    let person = ctx.request.body
    console.log(person)
    if(!person.name&& !person.age && !person.comment){
        ctx.body={
            status:500,
            msg:'没有传值',
        }
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
        ctx.body={
            status:500,
            msg:'没有传值',
        }
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
})

exports.router = router