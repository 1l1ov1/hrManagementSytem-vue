<script setup>
import { ref, watch } from 'vue'


/**
 * SearchInfoComponent.vue
 * 
 * 通用的搜索组件，支持多种类型的搜索字段。
 * 
 * @props {Array} fields - 搜索字段配置数组
 *   @property {string} name - 字段名称，用于绑定数据
 *   @property {string} type - 字段类型，可选值：'input', 'select', 'date'
 *   @property {string} placeholder - 输入框占位符
 *   @property {Array} options - 下拉选择框选项（仅在 type 为 'select' 时有效）
 *     @property {string} label - 选项显示文本
 *     @property {string} value - 选项值
 *   @property {number} span - 列的宽度（可选，默认为 5）
 */

const props = defineProps({
    fields: {
        type: Array,
        required: true
    }
})
// 定义搜索数据
const searchData = ref({})

// 监听搜索数据的变化
watch(searchData, (newVal) => {
    emit('search', newVal);
});

// 定义事件
const emit = defineEmits(['search']);

// 处理搜索事件
const handleSearch = () => {
    emit('search', searchData.value);
};

const handleClear = () => {
    searchData.value = {}
}

</script>

<template>
    <el-row :span="20" :gutter="20">
        <el-col v-for="(field, index) in fields" :key="index" :span="field.span || 5">
            <el-input v-if="field.type === 'input'" v-model="searchData[field.name]" :placeholder="field.placeholder" />
            <el-select v-else-if="field.type === 'select'" v-model="searchData[field.name]"
                :placeholder="field.placeholder">
                <el-option v-for="option in field.options" :key="option.value" :label="option.label"
                    :value="option.value" />
            </el-select>
            <el-date-picker v-else-if="field.type === 'date'" v-model="searchData[field.name]" type="date"
                :placeholder="field.placeholder" />
            <!-- 其他类型的搜索字段可以在这里添加 -->
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="handleClear">重置</el-button>
        </el-col>
    </el-row>
</template>

<style lang='less' scoped></style>
