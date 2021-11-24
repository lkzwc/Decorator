import {resolve} from 'path'
import {load} from '../utils/decorate.js'
import KOA from 'koa'


const app = new KOA()


// app.use(async (ctx)=>{
//     ctx.body = "Hello KOA"
// })

// app.use(
//     bodify({
//         multipart: true,
//         strict: false
//     })
// )
const router = load(resolve(__dirname,'./router'))
console.log("router",router);
app.use(router.routes())

app.listen(3999,()=>{
    console.log("server is start of 3999...");
})