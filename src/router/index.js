import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

import Formpage from '../components/Formpage.vue'
import ThankYou from '../components/ThankYou.vue'
import FormpageAlt from '../components/FormpageAlt.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Home,
        children: [
            {
                path: "/",
                name: "index",
                component: Formpage,
            },
               {
                path: "/form",
                name: "form",
                component: FormpageAlt,
            },
            {
                path: "/bedankt",
                name: "thank-you",
                component: ThankYou,
            },
        ]
    },
    {
        path: "/algemene-voorwaarden",
        name: "terms",
        
         component: () => import(/* webpackChunkName: "terms" */ '../views/Terms.vue')
    },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
