
import {get,post,authority} from '../../utils/decorate.js'

const users=[{name:"奋斗的",age:10}]


@authority([
    async function check(ctx,next){
        console.log("ctx",ctx);
        if(ctx.header?.name){
            await next()
        }else{
            ctx.response.message="鉴权无法通过"
            throw "鉴权无法通过"
        }
    }
])
export default class Info {
    @get('/users',{
        middlewares:[
            async function validate(ctx,next){
                const name = ctx?.request?.header?.name
                if(!name){
                    throw "请输入用户名"
                }
                await next()
            }
        ]
    })
    list(ctx){
        ctx.body={ok:1,data:users}
    }  
    
    @post('/add')
    addUser(ctx){
        users.push({name:"zwc",age:12})
        ctx.body={ok:1}
    }    
}