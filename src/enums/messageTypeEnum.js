const MessageTypeEnum = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info'
};

Object.freeze(MessageTypeEnum); // 冻结对象，防止被修改

export default MessageTypeEnum;