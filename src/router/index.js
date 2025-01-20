import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        'path': '/login',
        component: () => import("@/views/Login/LoginIndex.vue"),
    },
    {
      'path': '/',
      component: () => import("@/views/Index/index.vue"),
      children: [
        {
          'path': 'Employee',
          component: () => import("@/views/Employee/EmployeeIndex.vue"),
        },
        {
          'path': 'Department',
          component: () => import("@/views/Department/DepartmentIndex.vue"),
        },
        {
          'path': 'Role',
          component: () => import("@/views/Role/RoleIndex.vue"),
        },
        {
          'path': 'Permission',
          component: () => import("@/views/Permission/PermissionIndex.vue"),
        }
      ]
    }
//   {
//     path: "/",
//     component: () => import("@/views/index.vue"),
//   }
];


export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 前置路由
router.beforeEach((to, from, next) => {
  next();
})