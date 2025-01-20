import request from '@/utils/request'

/**
 * 查询所有的部门
 * @returns 返回所有的部门信息
 */
export const getDepartments = () => {
    return request.get('/department/getDepartments')
}
/**
 * 添加部门
 * @param {object} department 要添加的部门信息
 * @returns 是否创建成功的结果
 */
export const createDepartment = (department) => {
    return request.post('/department/create', department)
}
/**
 * 
 * @returns 所有启用的部门
 */
export const getDepartmentsWithEnable= () => {
    return request.get('/department/getDepartmentsWithEnabled')
}

/**
 * 分页查询部门
 * @param {object} pageDTO 分页查询对象 
 * @returns  分页查询结果
 */
export const pageQueryDepartment = (pageDTO) => {
    return request.post('/department/pageQuery', pageDTO)
}