//定义store
import { defineStore } from "pinia";
import {ref} from 'vue'

/**
 * 定义一个store
 * 第一个参数：store的名字
 * 第二个参数：函数
 * 返回值：一个函数
 */
export const useTokenStore = defineStore('token',()=>{
    //定义一个响应式变量
    const token = ref('');
    //定义一个函数，修改token
    const setToken = (newToken)=>{
        token.value = newToken;
    }
    //定义移除token的函数
    const removeToken = ()=>{
        token.value = '';
    }
    //返回
    return {
        token,
        setToken,
        removeToken
    }
},{
    persist:true//开启持久化存储
})
