import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import HandleAuth from '@/components/UserAuth/HandleAuth'
import Login from '@/components/UserAuth/Login'
import Signup from '@/components/UserAuth/Signup'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/login',
            name: 'HandleAuth',
            component: HandleAuth,
            children: [{
                    path: '/login',
                    name: 'Login',
                    component: Login

                },
                {
                    path: '/signup',
                    name: 'Signup',
                    component: Signup

                }
            ]
        }
    ]
})