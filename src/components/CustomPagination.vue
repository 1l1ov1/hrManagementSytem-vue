<script setup>
import {ref, watch} from 'vue'
const total = ref(0);
const pageSize = ref(20);
const pageNum = ref(1);
const sizes = ref([2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
const pageDTO = ref({
    isAsc: true,
    pageNum,
    pageSize,
    sortBy: null
})

const props = defineProps({
    options: {
        type: Object,
        required: true
    },
})
// 监听result变化
watch(()=> props.options, (newOptions, oldOptions) => {
    total.value = newOptions.total || 0;
    pageNum.value = newOptions.pageNum || 1;
    pageSize.value = newOptions.pageSize || 20;
    sizes.value = newOptions.sizes || sizes.value;
},  { deep: true })
const emit = defineEmits(['change'])
watch([pageNum, pageSize], ([newPageNum, newPageSize]) => {
    pageDTO.value.pageNum = newPageNum;
    pageDTO.value.pageSize = newPageSize;
    emit('change', pageDTO.value);
});

</script>

<template>
    <el-pagination class="pagination" background :total="total" :page-sizes="sizes"
        v-model:current-page="pageNum" v-model:page-size="pageSize" layout="sizes, prev, pager, next, total, jumper" />
</template>

<style lang='less' scoped>
.pagination {
    margin-top: 20px;
}
</style>
