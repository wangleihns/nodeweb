const Koa = require('koa2');
const cors = require('koa2-cors')
const server = require('koa-static');
const koaBody = require('koa-body');
const router = require('./router').router;
const jwtKoa = require('koa-jwt');
const app = new Koa();
app.use(koaBody())
app.use(cors())
app.use(server(__dirname+'/public'))
app
.use(router.routes())
.use(router.allowedMethods())

app.listen(9000, ()=>{
    console.log('应用服务器启动成功')
});