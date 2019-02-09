import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Dashboard from '@/components/dashboard/Dashboard'
import Profile from '@/components/dashboard/Profile'
import AccountSettings from '@/components/dashboard/AccountSettings'
import HandleAuth from '@/components/UserAuth/HandleAuth'
import Login from '@/components/UserAuth/Login'
import Signup from '@/components/UserAuth/Signup'
import store from './store/index';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            alias: '/homepage',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            props: true,
            children: [{
                    path: '/profile',
                    name: 'Profile',
                    component: Profile
                },
                {
                    path: '/account-settings',
                    name: 'AccountSettings',
                    component: AccountSettings
                }
            ],
            beforeEnter: (to, from, next) => {
                if (store.getters.getUser) {
                    next()
                } else {
                    next({
                        path: '/'
                    })
                }
            }


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


export default router