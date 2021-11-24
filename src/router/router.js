const users=[{name:"奋斗的",age:10}]


import {get,post} from '../../utils/decorate.js'
export default class Info {
    @get('/users')
    list(ctx){
        ctx.body={ok:1,data:users}
    }  
    
    @post('/users')
    addUser(ctx){
        users.push({name:"zwc",age:12})
        ctx.body={ok:1}
    }    
}