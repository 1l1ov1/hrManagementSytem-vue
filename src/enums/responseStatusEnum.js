const ResponseStatusEnum = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,

    getStatusText(response) {
        switch (response.status) {
            case 200:
                return '请求成功';
            case 400:
                return '请求错误';
            case 401:
                return '未授权';
            case 403:
                return '禁止访问';
            case 404:
                return '未找到资源';
            case 500:
                return '服务器内部错误';
            case 503:
                return '服务不可用';
            default:
                return `未知错误 ${response.data}`;
        }
    },

    getCodeText(res) {
        switch (res.code) {
            case 200:
                return '请求成功';
            case 400:
                return '请求错误';
            case 401:
                return '未授权';
            case 403:
                return '禁止访问';
            case 404:
                return '未找到资源';
            case 500:
                return `服务器内部错误`;
            case 503:
                return '服务不可用';
            default:
                return `未知错误 ${res.msg}`
        }
    }
}

export default ResponseStatusEnum;