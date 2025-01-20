<script setup>
import { ref } from 'vue'
import { Login } from '@/api/user'
import ResponseStatusEnum from '@/enums/ResponseStatusEnum'
import { userStoreInstance } from '@/stores'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Footer from '@/components/Footer.vue'
const router = useRouter()
const form = ref({
    account: '',
    password: ''
})
const formRef = ref(null)

const rules = ref({
    account: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
    ]
})
const debounce = (fn, wait) => {
    let timer = null;
    return function () {
        let _this = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(_this, arguments);
        }, wait);
    };
}



const login = debounce(async () => {
    // 提交前先进行校验
    await formRef.value.validate();
    const res = await Login(form.value);
    if (res.code === ResponseStatusEnum.SUCCESS) {
        // 如果说是成功，保存用户到userStore中
        userStoreInstance.setUser(res.data)
        //然后跳转
        ElMessage({
            message: '登录成功',
            type: 'success'
        })
        router.push('/')
    } else {
        // 失败就清空登录信息
        form.value = {}
    }
}, 300);



</script>

<template>
    <div class='login-container'>
        <div class='login-box'>
            <div class="bg bg-left"></div>
            <div class='form'>
                <div class='login-title'>人事管理系统登录</div>
                <el-form :model='form' :rules="rules" ref="formRef" label-width="auto" style="max-width: 600px">
                    <el-form-item prop="account" label="账号：">
                        <el-input v-model='form.account' maxlength="12" minlength="5" require placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item prop="password" label='密码：'>
                        <el-input type="password" maxlength="12" minlength="6" show-password v-model='form.password'
                            require placeholder="请输入密码" />
                    </el-form-item>
                </el-form>
                <el-button class='btn' @click="login" type='primary'>登录</el-button>
            </div>
            <div class="bg bg-right"></div>
        </div>
        <Footer/>
    </div>

</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #6e45e2, #88d3ce);
    /* 炫酷的渐变背景 */
}

.login-box {
    width: 30%;
    min-width: 390px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
}

.bg {
    width: 200px;
    height: 200px;
    border-radius: 50%;

}

.bg-left {
    background-color: #603cbc;
    position: absolute;
    top: -50%;
    left: -50%;
    transform: translateX(80%);
}

.bg-right {
    position: absolute;
    top: 50%;
    right: -50%;
    transform: translateX(-80%);
    background-color: #88d3ce;
}

.form {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.btn {
    width: 100%;
}

</style>