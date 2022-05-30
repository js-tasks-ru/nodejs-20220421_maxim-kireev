const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
let resolves = []

router.get('/subscribe', async (ctx, next) => {

  await new Promise((resolve) => {
        resolves.push(resolve)
    }).then(res => ctx.body = res)
   
});

router.post('/publish', async (ctx, next) => {
    let message = ctx.request.body.message;
    if(!message) {
    ctx.throw(400, 'Empty message');
    }
    else
    resolves.forEach(res => res(ctx.request.body.message));
    resolves = [];
    ctx.body = 'done';
    
});

app.use(router.routes());

module.exports = app;
