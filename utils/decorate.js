import * as KOA from 'koa'
import  KoaRouter from 'koa-router'
import * as glob from 'glob'
import path from 'path'

const router = new KoaRouter()

// 类装饰器定义
export const authority = (middlewares)=>{
    return function(target,property){
        // 定义到原型链上进行传值
        target.prototype.middlewares = middlewares;
    }
}

const createMethod =router=>method =>(path,options)=>{
    return (target,property)=>{
        //由于属性装饰器先执行  所有丢到异步里边 让类的装饰器先执行
        process.nextTick(()=>{
            let middlewares =[]

            if(target?.middlewares){
                middlewares.push(...target?.middlewares)
            }
            
            if(options?.middlewares){
                middlewares.push(...options?.middlewares)
            }

            middlewares.push(target[property])
            // 路由注册 返回一个装饰器
            router[method](path,...middlewares)
        })
    }
}

// const get=path=>{
//     return (target,property)=>{
//         router[method](path,target[property])
//     }
// }



export const get = createMethod(router)('get')
export const post = createMethod(router)('post')

export const load=(folder)=>{
    const externName=".{js,ts}"
    glob.sync(path.join(folder,`./*${externName}`)).forEach(item=>{
        console.log("----",item);
        require(item)
    })

    return router;
}