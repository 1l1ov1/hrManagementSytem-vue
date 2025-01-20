<script setup>
import {ref} from 'vue';

const menuTrigger = ref('hover')
const switchValue = ref(true)
</script>

<template>
    <el-container class="container">
        <el-aside width="200px">
            <div class="logo"></div>
            <el-menu :collapse="false" :menu-trigger="menuTrigger" :router="true" background-color="#545c64">
                <el-menu-item index="1">
                    <template #title>
                        <el-icon>
                        </el-icon>
                        <span>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</span>
                    </template>
                </el-menu-item>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                        </el-icon>
                        <span>员工管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Employee">员工信息</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <svg t="1736567052629" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1595" width="32" height="32">
                                <path
                                    d="M960 704h-63.616v-167.392a32 32 0 0 0-32-32H544V416h160a32 32 0 0 0 32-32V96a32 32 0 0 0-32-32H320a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h160v88.608H161.984a32 32 0 0 0-32 31.968L129.792 704H64a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32H193.792l0.16-135.392H480V704h-64a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32h-64v-135.392h288.384V704H768a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32v-192a32 32 0 0 0-32-32zM352 128h320v224H352V128zM224 896H96v-128h128v128z m352 0h-128v-128h128v128z m352 0h-128v-128h128v128z"
                                    p-id="1596"></path>
                            </svg>
                        </el-icon>
                        <span>组织管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Department">组织信息</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                        </el-icon>
                        <span>考勤管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1">考勤信息</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="5">
                    <template #title>
                        <el-icon>
                        </el-icon>
                        <span>工资管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1">工资信息</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="6">
                    <template #title>
                        <el-icon>
                        </el-icon>
                        <span>角色管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Role">角色信息</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
                <el-sub-menu index="7">
                    <template #title>
                        <el-icon>
                        </el-icon>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Permission">权限信息</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-menu class="header-menu" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">Processing Center</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>Workspace</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="3" disabled>Info</el-menu-item>
                    <el-menu-item index="4">Orders</el-menu-item>
                </el-menu>
                <el-switch class="theme-switch" v-model="switchValue"/>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
}

.logo {
    font-size: 2rem;
    color: #fff;
}


:deep(.el-header) {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:deep(.el-switch) {
    background-color: #545c64;
    height: 100%;
    border-bottom: 1px solid var(--el-menu-border-color);
}

:deep(.el-aside) {
    height: 100%;
    background-color: #545c64;
    color: #fff
}

.header-menu {
    width: 90vw;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    color: #fff;
}

:deep(.el-menu-item.is-active) {
    color: #facd4b;
}

.theme-switch {
    padding-right: 40px;
}

</style>
