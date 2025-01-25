<script setup>
import { ref, onMounted } from 'vue'
import { getDepartmentsWithEnable, createDepartment, getDepartmentDetail, updateDepartment } from '@/api/department'
import { userStoreInstance} from '@/stores'
import ResponseStatusEnum from '@/enums/ResponseStatusEnum'
import {showMessage} from '@/utils/showMessage'
import MessageTypeEnum from '@/enums/messageTypeEnum'
const form = ref({
    id: '',
    departName: '',
    description: '',
    parentId: '',
    isEnabled: 1,
    isDeleted: 0,
    creatorId: userStoreInstance.getUser()?.id
})

const formRef = ref();

const rules = ref({
    departName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
    description: [{ required: true, message: '请输入部门描述', trigger: 'blur' }],
    isEnabled: [{ required: true, message: '请选择启用状态', trigger: 'blur' }],
    isDeleted: [{ required: true, message: '请选择删除状态', trigger: 'blur' }]
})
const emit = defineEmits(['refreshData'])
const options = ref([])
const getDepartmentListWithEnable = async () => {
    options.value = [];
    const res = await getDepartmentsWithEnable();
    res.data.unshift({id: -1, departName: '无'});
    options.value = res.data;
}

const dialogTableVisible = ref(false)
const title = ref('添加部门')
/**
 * 打开添加或修改的对话框
 * @param {number} departmentId 部门的id
 */
const openDialog = (departmentId) => {
    if (!departmentId) {
        title.value = '添加部门';
        dialogTableVisible.value = true;
    } else {
        title.value = '修改部门';
        dialogTableVisible.value = true;
        // 然后去获取要修改的部门信息
        getDepartmentDetail(departmentId).then(res => {
            // 如果说成功
            form.value = res.data;
            form.value.isEnabled = form.value.isEnabled ? 1 : 0;
            form.value.isDeleted = form.value.isDeleted ? 1 : 0;
        }).catch(err => {
        })
    }
}

const clickedBtn = (id) => {
    if (!id) {
        addDepartment();
    } else {
        editDepartment();
    }
}

const addDepartment = async () => {
    await formRef.value.validate()
    // 创建部门
    if (form.value.parentId === -1) {
        // 如果选择的是无 就设置为null
        form.value.parentId = null;
    }
    const res = await createDepartment(form.value)
    if (res.code === ResponseStatusEnum.SUCCESS) {
        // 如果说添加成功，就关闭对话框，并刷新页面
        dialogTableVisible.value = false;
        showMessage("添加成功", MessageTypeEnum.SUCCESS)
        // 通知父组件添加成功
        emit('refreshData');
    } else {
        showMessage("添加失败", MessageTypeEnum.ERROR)
    }
    // 然后清空表单
    resetForm()
}

const editDepartment = async () => {
    // 如果说是修改
    await formRef.value.validate()
    await updateDepartment(form.value).then(res => {
        if (res.code === ResponseStatusEnum.SUCCESS) {
            showMessage('修改成功', MessageTypeEnum.SUCCESS)
            emit('refreshData');
        } else {
            showMessage('修改失败', MessageTypeEnum.ERROR)
        }
    }).catch(err => {
    })
    dialogTableVisible.value = false;
    resetForm();

}

const resetForm = () => {
     // 然后清空表单
     form.value = {
        isEnabled: 1,
        isDeleted: 0,
        creatorId: userStoreInstance.getUser()?.id
    };
}

onMounted(() => {
    getDepartmentListWithEnable();
})
// 使用 defineExpose 暴露 openDialog 函数
defineExpose({ openDialog });

</script>

<template>

    <el-dialog v-model="dialogTableVisible" :title="title" width="500">
        <el-form :rules="rules" ref="formRef" :model="form" label-width="100px">
            <el-form-item prop="departName" label="部门名称：">
                <el-input v-model="form.departName" placeholder="请输入部门名称" />
            </el-form-item>
            <el-form-item prop="parentName" label="上级部门：">
                <el-select v-model="form.parentId" placeholder="请选择上级部门">
                    <el-option v-for="item in options" :label="item.departName" :key="item.id" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item prop="description" label="部门描述：">
                <el-input v-model="form.description" type="textarea"  maxlength="40"  show-word-limit
                    placeholder="请输入部门描述" />
            </el-form-item>
            <el-form-item prop="isEnabled" label="启用状态：">
                <el-select v-model="form.isEnabled" placeholder="请选择启用状态">
                    <el-option label="启用" :value="1">启用</el-option>
                    <el-option label="禁用" :value="0">禁用</el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="isDeleted" label="删除状态：">
                <el-select v-model="form.isDeleted" placeholder="请选择删除状态">
                    <el-option label="未删除" :value="0">未删除</el-option>
                    <el-option label="已删除" :value="1">已删除</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.creatorId" v-show="false"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="clickedBtn(form.id)">确定</el-button>
                <el-button @click="dialogTableVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style lang='less' scoped></style>
