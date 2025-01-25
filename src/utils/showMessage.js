import { ElMessage } from "element-plus";
import MessageTypeEnum from "../enums/messageTypeEnum";


let lastMessageTime = 0;
const MESSAGE_DELAY = 1000; // 1秒内不重复显示消息
/**
 * 
 * @param {string} message 
 * @param {MessageTypeEnum} type 
 */
function showMessage(message, type) {
     // 确保 type 是 MessageTypeEnum 中的有效值
     if (!Object.values(MessageTypeEnum).includes(type)) {
        throw new Error('type 参数必须是 MessageTypeEnum 中的有效值');
    }
    const now = Date.now();
    if (now - lastMessageTime > MESSAGE_DELAY) {
    ElMessage({
        message: message,
        type: type
    });
    lastMessageTime = now;
    }

}

export { showMessage }