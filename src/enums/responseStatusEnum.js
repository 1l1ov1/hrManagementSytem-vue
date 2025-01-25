// 定义状态码及其对应的描述信息
const STATUS_CODE_MESSAGES = {
    200: '请求成功',
    201: '创建成功',
    204: '无内容',
    400: '请求错误',
    401: '未授权',
    403: '禁止访问',
    404: '未找到资源',
    405: '方法不被允许',
    408: '请求超时',
    409: '冲突',
    412: '先决条件失败',
    422: '无法处理的实体',
    500: '服务器内部错误',
    501: '未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP 版本不受支持',
    601: '参数为空',
    602: '结果不存在',
    603: '用户未找到',
    604: '账户已锁定',
    605: '对象已存在',
    606: '删除失败'
};

// 使用模块模式隐藏 getStatusOrCodeText 方法
const ResponseStatusEnum = (() => {
    const getStatusOrCodeText = (obj, key) => {
        // 检查 obj 是否为有效的对象
        if (!obj || typeof obj !== 'object') {
            return '未知错误';
        }
        // 从 obj 中获取指定 key 的值
        const code = obj[key];
        // 根据 code 从 STATUS_CODE_MESSAGES 中获取对应的描述信息
        return STATUS_CODE_MESSAGES[code] || `未知错误 ${code !== undefined ? code : ''}`;
    };

    return {
        SUCCESS: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        REQUEST_TIMEOUT: 408,
        CONFLICT: 409,
        PRECONDITION_FAILED: 412,
        UNPROCESSABLE_ENTITY: 422,
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
        HTTP_VERSION_NOT_SUPPORTED: 505,
        ARGUMENT_NULL: 601,
        RESULT_IS_NOT_EXIST: 602,
        USER_NOT_FOUND: 603,
        ACCOUNT_LOCKED: 604,
        OBJECT_IS_EXIST: 605,
        DELETE_IS_FAIL: 606,

        getStatusText(response) {
            return getStatusOrCodeText(response, 'status');
        },

        getCodeText(res) {
            return getStatusOrCodeText(res, 'code');
        }
    };
})();

// 冻结对象，防止意外修改
Object.freeze(ResponseStatusEnum);
Object.freeze(STATUS_CODE_MESSAGES);
// 导出对象
export default ResponseStatusEnum;