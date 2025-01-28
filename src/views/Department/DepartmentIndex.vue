<script setup>
import { ref, onMounted, watch } from 'vue';
import SearchInfoComponent from '../../components/SearchInfoComponent.vue';
import AddOrEditDepartment from './components/AddOrEditDepartment.vue';
import { pageQueryDepartment, deleteDepartments } from '@/api/department'
import CustomPagination from '../../components/CustomPagination.vue';
import {showMessage} from '@/utils/showMessage'
import MessageTypeEnum from '@/enums/messageTypeEnum'
const departmentList = ref([]);
const AddOrEditDepartmentRef = ref();
const searchFields = ref([]);

/**
 * 判断是添加还是修改，打开对话框
 * @param {number} departmentId 有值就是修改 无值就是添加
 */
const openDepartmentDialog = (departmentId, mode) => {
    AddOrEditDepartmentRef.value.openDialog(departmentId, mode);
}
const selectedItemIds = ref([]);
/**
 * 删除部门
 * @param {Number | Array<Number> } departmentIds 部门的id
 */
const deleteDepartmentOne = (departmentIds) => {
    ElMessageBox.confirm(
    '确认要删除这条记录吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      handleDeleteDepartment(departmentIds);      
    })
    .catch(() => {
      
    })
}

const deleteDepartmentMul = () => {
    const selectedLen = selectedItemIds.value.length;
    if (selectedLen === 0) {
        showMessage("请选择要删除的部门", MessageTypeEnum.WARNING)
        return;
    }
    ElMessageBox.confirm(
    `确认要删除这${selectedLen}条记录吗？`,
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      handleDeleteDepartment(selectedItemIds.value);
    })
    .catch(() => {
      
    })
}

const handleDeleteDepartment = async (departmentIds) => {
    let res
    if (departmentIds instanceof Object) {
        // 说明点击的是最上面的删除按钮
        // 那么就要将selectedItemIds中的所有id
        if (selectedItemIds.value.length === 0) {
            showMessage("请选择要删除的部门", MessageTypeEnum.WARNING)
            return;
        }
        // 将数组转为字符串
        departmentIds = departmentIds.join(',')
        res = await deleteDepartments(departmentIds);
    } else {
        // 说明点击的是列表格里面的按钮
         res = await deleteDepartments(departmentIds);
    }
    if (res.code === 200) {
        showMessage("删除成功", MessageTypeEnum.SUCCESS)
        getDepartmentsList();
    } else {
        showMessage("删除失败", MessageTypeEnum.ERROR)
    }
}
/**
 * 修改部门
 */
const editDepartment = () => {
    // 先查看selectedItem的长度
    if (selectedItemIds.value.length === 0) {
        showMessage("请选择要修改的部门", MessageTypeEnum.WARNING)
        return;
    }
    // 如果说长度大于1，那么也要提示
    if (selectedItemIds.value.length > 1) {
        showMessage("只能选择一个部门进行修改", MessageTypeEnum.WARNING)
        return;
    }

    // 否则就去修改
    openDepartmentDialog(selectedItemIds.value[0], "edit");
}

const detailDepartment = (departmentId) => {
    if (departmentId === null) {
        // 说明是勾选
        if (selectedItemIds.value.length === 0) {
            showMessage("请选择要查看的部门", MessageTypeEnum.WARNING)
            return;
        } else if (selectedItemIds.value.length > 1) {
            showMessage("只能选择一个部门进行查看", MessageTypeEnum.WARNING)
            return;
        }
        openDepartmentDialog(selectedItemIds.value[0], "view");
    } else {
        openDepartmentDialog(departmentId, "view");
    }
}
const loading = ref(false);
const pageDTO = ref({
    isAsc: true,
    pageNum: 1,
    pageSize: 20,
    sortBy: null
})
const options = ref({
    total: 0,
    pageNum: 0,
    pageSize: 0
})
// 得到部门列表
const getDepartmentsList = async () => {
    // 开始加载
    loading.value = true;
    const res = await pageQueryDepartment(pageDTO.value);
    // 结束加载
    loading.value = false;
    // 设置分页
    departmentList.value = res.data.records;
    // 分页的配置
    options.value.total = res.data.total;
    options.value.pageNum = res.data.current;
    options.value.pageSize = res.data.size;
}
// 分页改变
const handlePaginationChange = (obj) => {
    pageDTO.value.pageNum = obj.pageNum;
    pageDTO.value.pageSize = obj.pageSize;
    getDepartmentsList();
}
/**
 * 处理排序
 * @param {object} 包含着行 属性 以及排序规则 
 */
const handleSortChange  = ({ row, prop, order }) => {
    pageDTO.value.sortBy = prop;
    pageDTO.value.isAsc = order === 'ascending';
    getDepartmentsList();
}

/**
 * 处理勾选框
 * @param {Array} selectedList 被选中的行数组
 */
const handleSelectionChange = (selectedList) => {
    // 映射为 id
    selectedItemIds.value = selectedList.map(item => item.id);
}
/**
 * 
 * @param {Object} param0 行 
 */
const tableRowClassName = ({row, rowIndex}) => {
    if (!row.isEnabled) {
        // 如果说是被禁用
        return 'warning-row';
    }

    if (row.isDeleted) {
        return 'delete-row';
    }
    return ''
}
onMounted(() => {
    getDepartmentsList();
})
</script>

<template>
    <SearchInfoComponent :fields="searchFields" />

    <el-row :span="12" class="btn-group">
        <el-button type="primary" @click="openDepartmentDialog(null, 'add')">添加</el-button>
        <el-button type="warning" @click="editDepartment">修改</el-button>
        <el-button type="danger" @click="deleteDepartmentMul">删除</el-button>
        <el-button type="info" @click="detailDepartment(null, 'view')">查看</el-button>
    </el-row>
    <el-table :data="departmentList" style="width: 100%" row-key="id" lazy
    v-loading="loading"
    element-loading-text="Loading..." sortable="custom"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
    :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="55" />
        <el-table-column label="序号" width="90" sortable="true" align="center">
            <template #default="scope">
                {{  scope.$index + 1 + (options.pageNum - 1) * options.pageSize }}
            </template>
        </el-table-column>
        <el-table-column prop="departName" label="部门名称" width="180" sortable="true" align="center"/>
        <el-table-column prop="createTime" label="创建时间" width="180" sortable="true" align="center">
            <template #default="scope">
                {{ scope.row.createTime.replace('T', ' ') }}
            </template>
        </el-table-column>
        <el-table-column prop="creatorName" label="创建者" width="100" sortable="true" align="center"/>
        <el-table-column prop="description" label="描述" width="500" align="center">
        </el-table-column>
        <el-table-column prop="parentDepartmentName" label="上级部门" width="180" align="center">
            <template #default="scope">
                {{ scope.row.parentDepartName || '无' }}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button link type="danger" size="large" @click="deleteDepartmentOne(scope.row.id)">
                    删除
                </el-button>
                <el-button link type="info" size="large" @click="detailDepartment(scope.row.id)">
                    查看
                </el-button>
                <el-button link type="primary" size="large" @click="openDepartmentDialog(scope.row.id, 'edit')">编辑</el-button>          
            </template>
        </el-table-column>
    </el-table>
    <CustomPagination @change="handlePaginationChange" :options="options" />
    <AddOrEditDepartment ref="AddOrEditDepartmentRef" @refreshData="getDepartmentsList" />
</template>

<style lang='less' scoped>
.btn-group {
    margin: 20px 0 20px 0;
}

.pagination {
    margin-top: 20px;
}

:deep(.el-table__row.warning-row) {
  background-color: rgb(252.5,245.7,235.5);
}
:deep(.el-table__row.delete-row) {
  background-color: rgb(254,240.3,240.3);
}
</style>
