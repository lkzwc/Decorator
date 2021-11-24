import * as KOA from 'koa'
import  KoaRouter from 'koa-router'
import * as glob from 'glob'


const router = new KoaRouter()
const path =require('path')

const createMethod =router=>method =>path=>{
    return (target,property)=>{
        router[method](path,target[property])
    }
}

// const get=path=>{
//     return (target,property)=>{
//         router[method](path,target[property])
//     }
// }


const method= createMethod(router)

export const get = method('get')
export const post = method('post')


export const load=(folder)=>{
    const externName=".{js,ts}"
    glob.sync(path.join(folder,`./*${externName}`)).forEach(item=>{
        console.log("----",item);
        require(item)
    })

    return router;
}