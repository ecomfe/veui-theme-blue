import Vue from 'vue';
import Router from 'vue-router';
import routes from './cases';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: {
                name: 'Home',
                render(h) {
                    return h('article', [
                        h('h1', 'Welcome to VEUI!'),
                        h('p', '← Select a demo from the nav bar to get started.')
                    ]);
                }
            }
        },
        ...routes
    ]
});

router.beforeEach((to, from, next) => {
    let name = to.name === 'home' ? '' : to.name;
    document.title = `Veui${name} - demo`;
    next();
});
  
export default router;
