import { postRequest } from "./api";

export async function createChatRoom(clientId,freelancerId) {
    try {
        const postData ={"user_1_id": clientId,
	            "user_2_id": freelancerId}
        const response = await postRequest('api/create-chatroom/', postData, {}, true);
        return response
    } catch (error) {
        return { status: false, message: error.message };
    }
}