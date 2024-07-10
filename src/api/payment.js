import { postRequest } from "./api";

export async function createPost(amount) {
    try {
        const response = await postRequest('api/create-order/', amount, {}, true);
        return { status: true, message: "Post created", data: response};
    } catch (error) {
        return { status: false, message: error.message };
    }
}