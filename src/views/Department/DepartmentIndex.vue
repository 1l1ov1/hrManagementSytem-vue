<script setup>
import { ref, onMounted } from 'vue';
import SearchInfoComponent from '../../components/SearchInfoComponent.vue';
import AddOrEditDepartment from './components/AddOrEditDepartment.vue';
import { pageQueryDepartment } from '@/api/department'
const departmentList = ref([]);
const AddOrEditDepartmentRef = ref();
const searchFields = ref([]);

/**
 * 判断是添加还是修改，打开对话框 TODO 待完善 可能还要传递一个要修改的对象或id
 * @param {boolean} flag true 添加，false 修改
 */
const openDepartmentDialog = (flag) => {
    AddOrEditDepartmentRef.value.openDialog(flag)
}
const deleteDepartment = () => {
}

const detailDepartment = () => {
}
const loading = ref(false);
const total = ref(0);
const pageSize = ref(20);
const pageNum = ref(1);
const pageDTO = ref({
    isAsc: true,
    pageNum,
    pageSize
})
const getDepartmentsList = async () => {
    // 开始加载
    loading.value = true;
    const res = await pageQueryDepartment(pageDTO.value);
    // 结束加载
    loading.value = false;
    // 设置分页
    departmentList.value = res.data.records;
    // 分页的配置
    total.value = res.data.total;
    pageNum.value = res.data.current;
    pageSize.value = res.data.size;
    console.log(total.value, pageNum.value, pageSize.value)
}

const handleCurrentChange = (value) => {
    pageDTO.value.pageNum = value;
    getDepartmentsList(pageDTO);
}

const handleSizeChange = (value) => {
    pageDTO.value.pageSize = value;
    getDepartmentsList(pageDTO);
}

onMounted(() => {
    getDepartmentsList();
})
</script>

<template>
    <SearchInfoComponent :fields="searchFields" />

    <el-row :span="12" class="btn-group">
        <el-button type="primary" @click="openDepartmentDialog(true)">添加</el-button>
        <el-button type="warning" @click="openDepartmentDialog(false)">修改</el-button>
        <el-button type="danger" @click="deleteDepartment">删除</el-button>
        <el-button type="info" @click="detailDepartment">查看</el-button>
    </el-row>
    <el-table :data="departmentList" style="width: 100%" row-key="id" lazy
    v-loading="loading"
    element-loading-text="Loading...">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" width="90" sortable="true" >
            <template #default="scope">
                {{ scope.$index + 1 }}
            </template>
        </el-table-column>
        <el-table-column prop="departName" label="部门名称" width="180" />
        <el-table-column prop="createTime" label="创建时间" width="180" sortable="true">
            <template #default="scope">
                {{ scope.row.createTime.replace('T', ' ') }}
            </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建者" width="180"/>
        <el-table-column label="操作">
            <template #default>
                <el-button link type="danger" size="large" @click="deleteDepartment">
                    删除
                </el-button>
                <el-button link type="primary" size="large" @click="editDepartment">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="pagination" background :total="total" 
        :page-sizes="[2,10,20,30,40,50,60,70,80,90,100]"
        :current-page="pageNum" :page-size="pageSize"
        layout="sizes, prev, pager, next, total, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"/>
    <AddOrEditDepartment ref="AddOrEditDepartmentRef" @refreshData="getDepartmentsList" />
</template>

<style lang='less' scoped>
.btn-group {
    margin: 20px 0 20px 0;
}

.pagination {
    margin-top: 20px;
}
</style>
