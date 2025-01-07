//定义store
import { defineStore } from "pinia";
import {ref} from 'vue'

/**
 * 定义一个store
 * 第一个参数：store的名字
 * 第二个参数：函数
 * 返回值：一个函数
 */
export const useIdStore = defineStore('id',()=>{
    //定义一个响应式变量
    const id = ref('');
    //定义一个函数，修改token
    const setId = (newId)=>{
        id.value = newId;
    }
    //定义移除token的函数
    const removeId = ()=>{
        id.value = '';
    }
    //返回
    return {
        id,
        setId,
        removeId
    }
},{
    persist:true//开启持久化存储
})
