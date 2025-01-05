//导入路由模块
import { createRouter,createWebHistory } from "vue-router";

//导入组件
import Home from "@/views/Home.vue";
import LoginPage from "@/views/LoginPage.vue";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            components:{
                default:Home
            }
        },
        {
            path:"/login",
            components:{
                default:LoginPage
            }
        }
    ]
    
})
export default router;