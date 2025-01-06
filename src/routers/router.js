//导入路由模块
import { createRouter,createWebHistory } from "vue-router";

//导入组件
import Home from "@/views/Home.vue";
import LoginPage from "@/views/LoginPage.vue";
import SystemResource from "@/views/home/SystemResource.vue";
import Driver from "@/views/home/Driver.vue";
import Blog from "@/views/home/Blog.vue";
import AI from "@/views/home/AI.vue";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            redirect:"/systemResource",
            components:{
                default:Home
            },
            children:[
                {path:"/driver",components:{default:Driver}},
                {path:"/blog",components:{default:Blog}},
                {path:"/ai",components:{default:AI}},
                {path:"/systemResource",components:{default:SystemResource}}
            ]

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