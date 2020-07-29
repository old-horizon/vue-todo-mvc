import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Todo from '../views/Todo.vue'
import {FilterCondition} from "@/domain/filterCondition";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Default',
        component: Todo,
        props: {filterCondition: FilterCondition.All}
    },
    {
        path: '/all',
        name: 'All',
        component: Todo,
        props: {filterCondition: FilterCondition.All}
    },
    {
        path: '/active',
        name: 'Active',
        component: Todo,
        props: {filterCondition: FilterCondition.Active}
    },
    {
        path: '/completed',
        name: 'Completed',
        component: Todo,
        props: {filterCondition: FilterCondition.Completed}
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router
