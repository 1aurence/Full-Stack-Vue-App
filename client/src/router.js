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
import Posts from '@/components/posts/Posts'
import CreatePost from '@/components/posts/CreatePost'
import AllPosts from '@/components/posts/AllPosts'
import User from '@/components/user/User'
import Inbox from '@/components/dashboard/Inbox'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/homepage',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            props: true,
            children: [{
                    path: 'profile',
                    alias: '/dashboard',
                    name: 'Profile',
                    component: Profile
                },
                {
                    path: 'account-settings',
                    name: 'AccountSettings',
                    component: AccountSettings
                },
                {
                    path: 'inbox',
                    name: "Inbox",
                    component: Inbox
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
            path: '/',
            name: 'HandleAuth',
            component: HandleAuth,
            children: [{
                    path: '',
                    alias: '/login',
                    name: 'Login',
                    component: Login

                },
                {
                    path: '/signup',
                    name: 'Signup',
                    component: Signup

                }
            ]
        },
        {
            path: '/posts',
            name: 'Posts',
            component: Posts,
            children: [{
                    path: 'all-posts',
                    name: 'AllPosts',
                    component: AllPosts

                },
                {
                    path: 'create-post',
                    name: 'CreatePost',
                    component: CreatePost

                }

            ]
        },
        {
            path: '/user/:id',
            component: User
        },

    ],

})
router.beforeEach((to, from, next) => {
    if (to.path !== '/' || to.path !== '/homepage' || to.path !== '/login' || to.path !== '/signup') {
        next()
    } else {
        if (store.getters.getUser) {
            next()
        } else {
            next({
                path: '/'
            })
        }
        //TODO Handle non existent pages
    }
})


export default router