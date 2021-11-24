import {resolve} from 'path'
import {load} from '../utils/decorate.js'
import KOA from 'koa'
const app = new KOA()


app.use(async (ctx,next)=>{
    ctx.body = "Hello KOA"
})


const router = load(resolve(__dirname,'./router'))
app.use(router)

app.listen(3999,()=>{
    console.log("server is start of 3999...");
})